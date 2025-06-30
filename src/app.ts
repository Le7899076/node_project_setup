import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import errorMiddleware from '@middleware/error.middleware';
import apiRoutes from '@routes/api.routes';
import webRoutes from '@routes/web.routes';
import log from '@utils/logger.utils';
import { initializeDatabases } from '@database/init.database';

class App {
    public express: Application;
    public port: number;

    constructor(port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabases();
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(compression());
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

    public listen(): void {
        this.express.listen(this.port, () => {
            log(`✅ App listening on the port ${this.port}`);
        });
    }
}

export default App;