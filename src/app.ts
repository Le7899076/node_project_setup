import express, { Application } from 'express';
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

class App {
    public express: Application;
    public port: number;

    constructor(port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabases();
        this.initializeMiddleware();
        this.initializeLocalization();
        this.initializeRoutes();
        this.initializeErrorHandling();
        this.initializeCronJobs();
        this.configViewEngine();

    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(compression());
        this.express.use(express.static(path.join(process.cwd(), 'public')));
    }

    private initializeRoutes(): void {
        this.express.use('/', webRoutes);
        this.express.use('/api', apiRoutes);
    }

    private initializeErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

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
        this.express.listen(this.port, () => {
            log(`✅ App listening on the port ${this.port}`);
        });
    }
}

export default App;