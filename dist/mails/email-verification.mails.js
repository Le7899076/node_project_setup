"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/mails/EmailVerificationMail.ts
const logger_utils_1 = __importDefault(require("@utils/logger.utils"));
const mailer_utils_1 = __importDefault(require("@utils/mailer.utils"));
class EmailVerificationMail {
    constructor(email, token) {
        this.email = email;
        this.token = token;
    }
    async send() {
        const subject = 'Verify Your Email';
        await mailer_utils_1.default.send(this.email, subject, 'verify-email', // no need for `.hbs`
        { verification_link: `${process.env.FRONTEND_URL}/verify?token=${this.token}` });
        // Success log
        (0, logger_utils_1.default)(`✅ Verification email sent successfully to ${this.email}`);
    }
}
exports.default = EmailVerificationMail;
