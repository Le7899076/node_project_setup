import { Request, Response, NextFunction } from 'express';
import HttpException from '@utils/exceptions/http.exception';

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction): any {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    return res.status(status).send({
        status,
        message
    })
}

export default errorMiddleware;