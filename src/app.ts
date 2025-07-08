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
import { createAdapter } from '@socket.io/mongo-adapter';
import { MongoClient } from 'mongodb';
import databaseConfig from '@config/database.config';
const { instrument } = require("@socket.io/admin-ui");
const expressLayouts = require('express-ejs-layouts');
// Interface for server configuration
interface ServerConfig {
  port: number;
}

// Function to create and configure a single server instance
const createServer = (config: ServerConfig) => {
  const { port } = config;
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    serveClient: true,
    cors: {
      origin: ['http://localhost:3030'],
      credentials: true,
      allowedHeaders: ['x-token'],
    },
    connectionStateRecovery: {},
    allowEIO3: true,
    pingTimeout: 7200000,
    pingInterval: 25000,
  });

  instrument(io, {
    auth: false,
    mode: "development",
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
          connectSrc: ["'self'", `http://localhost:${port}`, `ws://localhost:${port}`],
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



  const setupLocalization = () => {
    app.use(i18n.middleware.handle(i18n.i18next));
  };

  const setupRoutes = () => {
    app.use('/', webRoutes);
    app.use('/api', apiRoutes);
  };

  const setupSocket = async () => {
    const { host, port, database } = databaseConfig.connections.mongo;
    const COLLECTION_NAME = "socket_io_adaptor_events";
    const MONGO_URL = `mongodb://${host}:${port}/?replicaSet=rs0`;
    const DB_NAME = database;

    const mongoClient = new MongoClient(MONGO_URL);

    await mongoClient.connect();

    const db = mongoClient.db(DB_NAME);

    // Create capped collection if not exists
    const collections = await db.listCollections({ name: COLLECTION_NAME }).toArray();
    if (collections.length === 0) {
      await db.createCollection(COLLECTION_NAME, {
        capped: true,
        size: 1e6,
      });
    }

    // Apply adapter
    io.adapter(createAdapter(db.collection(COLLECTION_NAME)));

    io.use(socketMiddleware).on('connection', (socket) => {
      const user = socket.data.user;
      const userId = user?.id;

      if (userId) {
        socket.join(`USER_${userId}`);
        console.log(`Socket ${socket.id} joined room USER_${userId} on port ${port}`);
      }

      console.log(`🔌 Client connected: ${socket.id} & userId=${userId} on port ${port}`);

      fetchAllUsers().then((result) =>
        console.log(`active users on port ${port}:`, result)
      );

      socket.onAny((event, args) => {
        chatHandler(event, args, socket, io);
      });

      socket.on('disconnect', () => {
        const userId = socket.handshake.query.userId as string;
        console.log(
          `🔌 Client disconnected: socketId=${socket.id} & userId=${userId} on port ${port}`
        );
        if (userId) {
          removeUser(userId);
          fetchAllUsers().then((result) =>
            console.log(`active users on port ${port}:`, result)
          );
        }
      });

      socket.on('error', (err) => {
        console.error(`Socket error on port ${port}:`, err);
      });
    });
  };

  const setupViewEngine = () => {
    // Handlebars
    // app.engine('hbs', engine({
    //   extname: '.hbs',
    //   defaultLayout: 'main',
    //   layoutsDir: path.join(process.cwd(), 'views/hbs/layouts'),
    //   partialsDir: path.join(process.cwd(), 'views/hbs/partials'),
    // }));

    // EJS
    app.use(expressLayouts);
    app.set('views', './views/ejs');
    app.set('layout', './layouts/full-width');
    app.set('view engine', 'ejs');


    // ❌ DO NOT set default view engine
  };

  // ------------------------
  // Bootstrap the Server
  // ------------------------

  const bootstrap = async () => {
    await setupSocket();
    initializeDatabases();
    setupMiddleware();
    setupLocalization();
    setupViewEngine();
    setupRoutes();
    initializeAgendaJobs();
    

    app.use((req, res, next): any => {
      const accept = req.headers['accept']?.includes('application/json');

      if (accept) {
        return res.json({
          status: false,
          message: "route not found"
        });
      }

      return res.status(404).send('<h1>Not found (HTML)</h1>');
    });




    server.listen(port, () => {
      log(`🚀 Socket.IO server is running on port ${port}`);
      log(`✅ App listening on the port ${port}`);
    });
  };

  return { bootstrap, app, server, io };
};

// Function to start multiple servers
const startServers = async (ports: number[]) => {
  const servers = ports.map((port) => {
    const serverConfig: ServerConfig = { port };
    const serverInstance = createServer(serverConfig);
    return serverInstance.bootstrap();
  });

  await Promise.all(servers);
};

export default startServers;