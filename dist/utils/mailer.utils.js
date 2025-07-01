"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_utils_1 = __importDefault(require("@utils/logger.utils"));
dotenv_1.default.config();
class Mailer {
    constructor() {
        this.transporter = (0, nodemailer_1.createTransport)({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: process.env.MAIL_ENCRYPTION === 'ssl', // true for SSL, false for TLS
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        // Setup Handlebars templating engine
        this.transporter.use('compile', (0, nodemailer_express_handlebars_1.default)({
            viewEngine: {
                extname: '.hbs',
                partialsDir: path_1.default.resolve(process.cwd(), 'views/emails'),
                defaultLayout: false,
            },
            viewPath: path_1.default.resolve(process.cwd(), 'views/emails'),
            extName: '.hbs',
        }));
        this.verifyConnection();
    }
    verifyConnection() {
        this.transporter.verify((error, success) => {
            if (error) {
                console.error('Email server connection failed:', error);
            }
            else {
                (0, logger_utils_1.default)('✅ Email server connected successfully');
            }
        });
    }
    // support both HTML or HBS
    async send(to, subject, htmlOrTemplate, context = {}) {
        const isTemplate = htmlOrTemplate.endsWith('.hbs') || context;
        const mailOptions = {
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
            to,
            subject,
            ...(isTemplate
                ? {
                    template: htmlOrTemplate.replace('.hbs', ''), // filename without .hbs
                    context,
                }
                : {
                    html: htmlOrTemplate,
                }),
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            (0, logger_utils_1.default)('Email sent: %s', info.messageId);
            return info;
        }
        catch (error) {
            console.error('Failed to send email:', error);
            throw error;
        }
    }
}
exports.default = new Mailer();
