// src/helpers/otp.ts
import crypto from 'crypto';

export const generateSecureOtp = (length: number = 6): string => {
  return crypto.randomInt(0, 10 ** length).toString().padStart(length, '0');
};
