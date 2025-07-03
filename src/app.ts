import express, { Application, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import errorMiddleware from '@middleware/error.middleware';
import apiRoutes from '@routes/api.routes';
import i18n from '@libs/i18n.libs';
import log from '@utils/logger.utils';
import { initializeDatabases } from '@database/init.database';
import { initializeCronJobs, initializeAgendaJobs } from './cron';
import path from 'path';
import { engine } from 'express-handlebars';
import webRoutes from '@routes/web.routes';
import responseMiddleware from '@middleware/response.middleware';
import { Server } from 'socket.io';
import http from 'http';
import { chatHandler } from '@handlers/chat.handlers';
import socketMiddleware from '@middleware/socket.middleware';

class App {
    public express: Application;
    public port: number;

    public server: http.Server;
    public io: Server;
    constructor(port: number) {
        this.express = express();

        this.server = http.createServer(this.express);

        this.io = new Server(this.server, {
            serveClient: true,
            cors: {
                origin: "*",
                credentials: true,
            },
            allowEIO3: true,
            pingTimeout: 7200000,
            pingInterval: 25000
        });

        this.port = port;

        this.initialize();
    }

    private initialize(): void {
        this.initializeSocket();
        this.initializeDatabases();
        this.initializeMiddleware();
        this.initializeLocalization();
        this.initializeRoutes();
        this.initializeCronJobs();
        this.configViewEngine();
    }

    private initializeMiddleware(): void {
        this.express.use(
            helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", 'https://cdn.tailwindcss.com', "'unsafe-inline'"],
                    styleSrc: ["'self'", "'unsafe-inline'", 'https://cdn.tailwindcss.com'],
                    connectSrc: [
                        "'self'",
                        "http://localhost:3001",
                        "ws://localhost:3001"
                    ],
                },
            })
        );

        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(compression());
        this.express.use(express.static(path.join(process.cwd(), 'public')));
        this.express.use(responseMiddleware);
        this.express.use(errorMiddleware);

    }

    private initializeSocket(): void {
        this.io.use(socketMiddleware)
            .on('connection', (socket) => {
                console.log(`🔌 Client connected: ${socket.id}`);

                socket.onAny((event, args) => {
                    console.log(`Event: ${event}`, args);
                    chatHandler(event, args, socket, this.io);
                });

                socket.on('disconnect', () => {
                    console.log(`🔌 Client disconnected: ${socket.id}`);
                });
            });
    }

    private initializeRoutes(): void {
        this.express.use('/', webRoutes);
        this.express.use('/api', apiRoutes);
    }

    // private initializeErrorHandling(): void {

    // }

    private initializeDatabases(): void {
        initializeDatabases();
    };

    private initializeLocalization(): void {
        this.express.use(i18n.middleware.handle(i18n.i18next));
    }

    private initializeCronJobs(): void {
        // initializeCronJobs();
        initializeAgendaJobs();
    }

    private configViewEngine() {
        this.express.engine('hbs', engine({
            extname: 'hbs',
            defaultLayout: 'main',
            layoutsDir: path.join(process.cwd(), 'views', 'layouts'),
            partialsDir: path.join(process.cwd(), 'views', 'partials'),
        }));
        this.express.set('view engine', 'hbs');
        this.express.set('views', path.join(process.cwd(), 'views'));
    }

    public listen(): void {
        this.server.listen(this.port, () => {
            log(`🚀 Socket.IO server is running on port ${this.port}`);
            log(`✅ App listening on the port ${this.port}`);
        });
    }
}

export default App;