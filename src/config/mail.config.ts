import dotenv from 'dotenv';

dotenv.config();

export default {
    'default': process.env.MAIL_MAILER!,
    'mailers': {
        'smtp': {
            'transport': 'smtp',
            'host': process.env.MAIL_HOST!,
            'port': Number(process.env.MAIL_PORT!),
            'encryption': process.env.MAIL_ENCRYPTION!,
            'username': process.env.MAIL_USERNAME!,
            'password': process.env.MAIL_PASSWORD!,
        }
    }
};
