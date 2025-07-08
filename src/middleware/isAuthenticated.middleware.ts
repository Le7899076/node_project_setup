// middleware/isAuthenticated.middleware.ts
import { Request, Response, NextFunction } from 'express';

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session.user) {
    return next();
  }

  req.flash('error', 'Please log in to access this page');
  return res.redirect('/admin/login');
}
