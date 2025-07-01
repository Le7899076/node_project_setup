import Controller from "@controllers/controller";
import HttpResponse from "@utils/http.response";
import { Request, Response, NextFunction } from "express";
import agenda from "@libs/agenda.libs";

class AuthController extends Controller {
    public register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const request = req.body;

        await agenda.now('send register mail', {
            email: request.email,
            token: 'token',
        });
        
        return new HttpResponse(res).success(request, 'User registered successfully');
    };
}

export default new AuthController;