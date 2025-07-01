import cron from 'node-cron';

export const  initializeCronJobs = () => {
  // Every minute
  cron.schedule('* * * * *', () => {
    console.log('🕒 Running cron task every minute');
    // Your logic here (e.g., sending reports, cleanup, etc.)
  });

  // Daily at 2 AM
  cron.schedule('0 2 * * *', () => {
    console.log('🌙 Running daily task at 2 AM');
  });

  console.log('✅ Cron jobs initialized');
};