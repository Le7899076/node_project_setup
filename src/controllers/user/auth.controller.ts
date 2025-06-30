import Controller from "@controllers/controller";
import HttpException from "@utils/exceptions/http.exception";
import HttpResponse from "@utils/http.response";
import { Request, Response, NextFunction } from "express";

class AuthController extends Controller {
    public register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const request = { ...req.body };

            return new HttpResponse(res).success(request, 'User registered successfully');
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default new AuthController;