// types/express/index.d.ts
import 'express';

declare module 'express-serve-static-core' {
  interface Response {
    success: (data: any, message?: string) => void;
    error: (message: string, code?: number) => void;
  }
}
