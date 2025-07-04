
import { Request, NextFunction } from 'express';


function responseMiddleware(req: Request, res: any, next: NextFunction): void {
    res.success = (data: any, message: string = 'Success') => {
        res.json({ status: true, message, data });
    };

    res.error = (message: string, code: number = 500) => {
        res.status(code).json({ status: false, message });
    };

    next();
}

export default responseMiddleware;