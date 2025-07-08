import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@utils/validateEnv';
import startServers from './app';

// Validate environment variables
validateEnv();

// Define the ports for the servers
const ports = [
  Number(process.env.PORT) || 3001,
  // Number(process.env.PORT_2) || 3002,
  // Number(process.env.PORT_3) || 3003,
];

// Start servers on specified ports
startServers(ports).catch((err) => {
  console.error('❌ Error starting servers:', err);
  process.exit(1);
});

// Handle termination
process.on('SIGINT', () => {
  console.log('\n⛔ Servers interrupted (Ctrl+C)');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n⛔ Servers terminated');
  process.exit(1);
});

process.on('exit', (code) => {
  console.log(`👋 Exiting with code ${code}`);
});