// src/services/sms.service.ts
import client from '@libs/twilio.libs';

export const sendSms = async (phone: string, message: string): Promise<void> => {
    try {
        const res = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER!,
            to: phone,
        });

        console.log('✅ SMS sent:', res.sid);
    } catch (error) {
        console.error('❌ SMS failed:', error);
    }
};

export const sendOtp = async (phone: string) => {
    try {
        return await client.verify.v2.services(process.env.TWILIO_VERIFY_SID!)
            .verifications
            .create({ to: phone, channel: 'sms' });
        console.log('✅ OTP SMS sent:');
    } catch (error) {
        console.error('❌ OTP SMS failed:', error);
    }
};

export const verifyOtp = async (phone: string, code: string): Promise<boolean> => {
  try {
    const verification = await client.verify.v2.services(process.env.TWILIO_VERIFY_SID!)
      .verificationChecks
      .create({ to: phone, code });

    return verification.status === 'approved';
  } catch (error) {
    console.error('❌ OTP verification failed:', error);
    return false;
  }
};

