/**
 * Utility functions for triggering device haptic feedback (vibration)
 * Safely degrades on unsupported devices/browsers (like iOS Safari or Desktop)
 */

export const vibrate = (pattern) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Ignore errors if browser blocks vibration without user gesture
      console.warn("Haptics blocked or unsupported:", e);
    }
  }
};

export const lightTap = () => vibrate(10);
export const mediumTap = () => vibrate(20);
export const successTap = () => vibrate([10, 50, 10]);
export const errorTap = () => vibrate([50, 30, 50]);
