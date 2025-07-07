// src/app.ts
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import errorMiddleware from '@middleware/error.middleware';
import apiRoutes from '@routes/api.routes';
import i18n from '@libs/i18n.libs';
import log from '@utils/logger.utils';
import { initializeDatabases } from '@database/init.database';
import { initializeAgendaJobs } from './cron';
import path from 'path';
import { engine } from 'express-handlebars';
import webRoutes from '@routes/web.routes';
import responseMiddleware from '@middleware/response.middleware';
import { Server } from 'socket.io';
import http from 'http';
import { chatHandler } from '@handlers/chat.socket.handlers';
import socketMiddleware from '@middleware/socket.middleware';
import { fetchAllUsers, removeUser } from '@utils/socket.utils';

// App configuration
const port = Number(process.env.PORT) || 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  serveClient: true,
  cors: {
    origin: '*',
    credentials: true,
    allowedHeaders: ['x-token'],
  },
  connectionStateRecovery: {},
  allowEIO3: true,
  pingTimeout: 7200000,
  pingInterval: 25000,
});

// ------------------------
// Setup Sequence Functions
// ------------------------

const setupMiddleware = () => {
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://cdn.tailwindcss.com', "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.tailwindcss.com'],
        connectSrc: ["'self'", "http://localhost:3001", "ws://localhost:3001"],
      },
    })
  );

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
  app.use(express.static(path.join(process.cwd(), 'public')));
  app.use(responseMiddleware);
  app.use(errorMiddleware);
};

const setupViewEngine = () => {
  app.engine(
    'hbs',
    engine({
      extname: 'hbs',
      defaultLayout: 'main',
      layoutsDir: path.join(process.cwd(), 'views', 'layouts'),
      partialsDir: path.join(process.cwd(), 'views', 'partials'),
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', path.join(process.cwd(), 'views'));
};

const setupLocalization = () => {
  app.use(i18n.middleware.handle(i18n.i18next));
};

const setupRoutes = () => {
  app.use('/', webRoutes);
  app.use('/api', apiRoutes);
};

const setupSocket = () => {
  io.use(socketMiddleware).on('connection', (socket) => {
    const user = socket.data.user;
    const userId = user?.id;

    if (userId) {
      socket.join(`USER_${userId}`);
      console.log(`Socket ${socket.id} joined room USER_${userId}`);
    }

    console.log(`🔌 Client connected: ${socket.id} & userId=${userId}`);

    fetchAllUsers().then((result) =>
      console.log('active users:', result)
    );

    socket.onAny((event, args) => {
      chatHandler(event, args, socket, io);
    });

    socket.on('disconnect', () => {
      const userId = socket.handshake.query.userId as string;
      console.log(
        `🔌 Client disconnected: socketId=${socket.id} & userId=${userId}`
      );
      if (userId) {
        removeUser(userId);
        fetchAllUsers().then((result) =>
          console.log('active users:', result)
        );
      }
    });

    socket.on('error', (err) => {
      console.error('Socket error:', err);
    });
  });
};

// ------------------------
// Bootstrap the Application
// ------------------------

const bootstrap = async () => {
  setupSocket();
  initializeDatabases();
  setupMiddleware();
  setupLocalization();
  setupRoutes();
  initializeAgendaJobs(); // or initializeCronJobs();
  setupViewEngine();

  server.listen(port, () => {
    log(`🚀 Socket.IO server is running on port ${port}`);
    log(`✅ App listening on the port ${port}`);
  });
};

export default bootstrap;
