import nodemailer from 'nodemailer';
import config from '@config/mail.config';


export const transporter = nodemailer.createTransport({
    host: config.mailers.smtp.host,
    port: Number(config.mailers.smtp.port),
    secure: config.mailers.smtp.encryption === 'ssl', // true for SSL, false for TLS
    auth: {
        user: config.mailers.smtp.username,
        pass: config.mailers.smtp.password,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
