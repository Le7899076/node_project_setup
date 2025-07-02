import dotenv from 'dotenv';

dotenv.config();

export default {
    'twilio': {
        'account_sid': process.env.TWILIO_ACCOUNT_SID!,
        'auth_token': process.env.TWILIO_AUTH_TOKEN!,
        'phone_number': process.env.TWILIO_PHONE_NUMBER!,
        'verify_sid' : process.env.TWILIO_VERIFY_SID,
        'available': process.env.TWILIO_AVAILABLE!,
    },

    'stripe': {
        'key': process.env.STRIPE_KEY!,
        'secret': process.env.STRIPE_SECRET!,
        'webhook_secret': process.env.STRIPE_WEBHOOK_SECRET!,
        'available': process.env.STRIPE_AVAILABLE!,
    },
};
