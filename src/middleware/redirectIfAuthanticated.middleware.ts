import { Request, Response, NextFunction } from 'express';
function redirectIfAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.session.user) {
        // Already logged in, redirect to dashboard
        return res.redirect('/admin');
    }
    next();
}

export default redirectIfAuthenticated;