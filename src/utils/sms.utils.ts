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
