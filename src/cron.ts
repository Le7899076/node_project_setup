import cron from 'node-cron';
import { Agenda } from 'agenda';
import 'dotenv/config';
import agenda from '@libs/agenda.libs';
import sendRegisterMailJob from '@jobs/send-register-mail.jobs';


export const initializeCronJobs = () => {
    // Every minute
    cron.schedule('* * * * *', () => {
        console.log('🕒 Running cron task every minute ' + new Date().toLocaleString());
        // Your logic here (e.g., sending reports, cleanup, etc.)
    });

    // Daily at 2 AM
    cron.schedule('0 2 * * *', () => {
        console.log('🌙 Running daily task at 2 AM');
    });

    console.log('✅ Cron jobs initialized');
};


export const initializeAgendaJobs = async () => {

    sendRegisterMailJob(agenda);

    await agenda.start();

    agenda.define('run every minute', async () => {
        console.log(`Every min cron job running... ${new Date().toLocaleString()}`);
    });

    // Schedule recurring jobs
    await agenda.every('1 minute', 'run every minute',
        { unique: { name: 'run every minute' } } as any,
        { timezone: 'Asia/Kolkata', skipImmediate: true }
    );

    console.log('✅ Agenda cron jobs initialized');
};
