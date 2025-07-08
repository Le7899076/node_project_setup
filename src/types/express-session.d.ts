import User from '@interfaces/user.interfaces';
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: User;
  }
}
