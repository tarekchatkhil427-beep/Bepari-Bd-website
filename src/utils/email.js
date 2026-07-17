import emailjs from '@emailjs/browser';
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_AUTOREPLY_TEMPLATE_ID,
  RECIPIENT_EMAIL,
} from './constants';

emailjs.init(EMAILJS_PUBLIC_KEY);

const sanitize = (str) => {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').trim();
};

export async function sendContactEmail(formData, source = 'contact_page') {
  const now = new Date();
  const dateStr = now.toLocaleDateString('bn-BD');
  const timeStr = now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });

  const safeName = sanitize(formData.name).slice(0, 100);
  const safePhone = sanitize(formData.phone).slice(0, 20);
  const safeDistrict = sanitize(formData.district).slice(0, 100);
  const safeBusinessType = sanitize(formData.businessType).slice(0, 50);
  const safeMessage = sanitize(formData.message).slice(0, 500) || 'কোনো বার্তা নেই';
  const safeEmail = sanitize(formData.email).slice(0, 100);
  const messagePreview = safeMessage.length > 100
    ? safeMessage.slice(0, 100) + '...'
    : safeMessage;

  const commonParams = {
    from_name: safeName,
    phone: safePhone,
    district: safeDistrict,
    business_type: safeBusinessType || 'নির্দিষ্ট নয়',
    message: safeMessage,
    source,
    date: dateStr,
    time: timeStr,
    message_preview: messagePreview,
  };

  try {
    const promises = [
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        ...commonParams,
        to_email: RECIPIENT_EMAIL,
        sender_email: safeEmail || 'প্রদান করেননি',
      }),
    ];

    if (safeEmail) {
      promises.push(
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTOREPLY_TEMPLATE_ID, {
          ...commonParams,
          to_name: safeName,
          to_email: safeEmail,
        })
      );
    }

    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 10000)
    );

    await Promise.race([Promise.all(promises), timeout]);
    return { success: true };
  } catch (error) {
    console.error('EmailJS send failed:', error);
    const msg = error === 'timeout'
      ? 'ইমেইল পাঠাতে সময় শেষ হয়েছে। আবার চেষ্টা করুন।'
      : 'ইমেইল পাঠানো সম্ভব হয়নি। আবার চেষ্টা করুন।';
    return { success: false, error: msg };
  }
}
