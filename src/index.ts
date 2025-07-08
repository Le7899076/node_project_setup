import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@utils/validateEnv';
import startServers from './app';
import cluster from 'cluster';
import os from 'os';

// Validate environment variables
validateEnv();

// Define the ports for the servers
const ports = [
  Number(process.env.PORT) || 3001,
  // You can add more ports if needed
  // Number(process.env.PORT_2) || 3002,
  // Number(process.env.PORT_3) || 3003,
];

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  console.log(`🧠 Primary process ${process.pid} is running`);
  console.log(`🔁 Starting ${numCPUs} workers`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`💥 Worker ${worker.process.pid} exited. Restarting...`);
    cluster.fork();
  });
} else {
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
}
