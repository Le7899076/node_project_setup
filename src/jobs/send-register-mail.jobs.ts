import EmailVerificationMail from '@mails/email-verification.mails';
import Agenda, { Job } from 'agenda';


export default function (agenda : Agenda) {
    agenda.define('send register mail', async (job : Job) => {
        const { email, token } = job.attrs.data;

        await new EmailVerificationMail(email, token).send();

        console.log(`📧 Sending registration email to ${email}`);
    });
}