// src/mails/EmailVerificationMail.ts
import log from '@utils/logger.utils';
import Mailer from '@utils/mailer.utils';

export default class EmailVerificationMail {
    protected email: string;
    protected token: string;

    constructor(email: string, token: string) {
        this.email = email;
        this.token = token;
    }

    public async send(): Promise<void> {
        const subject = 'Verify Your Email';

        await Mailer.send(
            this.email,
            subject,
            'verify-email', // no need for `.hbs`
            { verification_link: `${process.env.FRONTEND_URL}/verify?token=${this.token}` }
        );

        // Success log
        log(`✅ Verification email sent successfully to ${this.email}`);
    }
}
