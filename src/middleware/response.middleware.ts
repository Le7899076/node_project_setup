
import { Request, NextFunction } from 'express';


function responseMiddleware(req: Request, res: any, next: NextFunction): void {
    res.success = (data: any, message: string = 'Success') => {
        res.json({ status: 'success', message, data });
    };

    res.error = (message: string, code: number = 500) => {
        res.status(code).json({ status: 'error', message });
    };

    next();
}

export default responseMiddleware;