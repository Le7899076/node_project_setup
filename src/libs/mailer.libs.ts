import nodemailer from 'nodemailer';
import config from '@config/mail.config';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import log from '@utils/logger.utils';

const transporter = nodemailer.createTransport({
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

transporter.use(
    'compile',
    hbs({
        viewEngine: {
            extname: '.hbs',
            partialsDir: path.resolve(process.cwd(), 'views/emails'),
            defaultLayout: false,
        },
        viewPath: path.resolve(process.cwd(), 'views/emails'),
        extName: '.hbs',
    })
);

transporter.verify((error, success) => {
    if (error) {
        console.error('Email server connection failed:', error);
    } else {
        log('✅ Email server connected successfully');
    }
});


export default transporter;
