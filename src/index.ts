import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@utils/validateEnv';
import bootstrap from './app';


validateEnv();

bootstrap();

// Handle termination
process.on('SIGINT', () => {
    console.log('\n⛔ Build interrupted (Ctrl+C)');
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('\n⛔ Build terminated');
    process.exit(1);
});

process.on('exit', code => {
    console.log(`👋 Exiting with code ${code}`);
});