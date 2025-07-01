import Controller from "@controllers/controller";
import HttpException from "@utils/exceptions/http.exception";
import HttpResponse from "@utils/http.response";
import { Request, Response, NextFunction } from "express";
import EmailVerificationMail from "@mails/email-verification.mails";
class AuthController extends Controller {
    public register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const request = req.body;
        return new HttpResponse(res).success(request, 'User registered successfully');
    };
}

export default new AuthController;