import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import User from '@models/user.model'; // your mongoose model

// Extend Express Request to include custom fields
export interface AuthenticatedRequest extends Request {
  user?: any;
  token?: any;
}

const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: false,
        message: 'Authentication token missing',
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: false,
        message: 'Invalid token or user not found',
      });
      return;
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error: any) {
    console.error('[AUTH ERROR]', error.message);
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: false,
      message: 'Unauthorized access',
    });
  }
};

export default auth;
