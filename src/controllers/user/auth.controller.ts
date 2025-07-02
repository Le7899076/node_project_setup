import Controller from "@controllers/controller";
import HttpResponse from "@utils/http.response";
import { Request, Response, NextFunction } from "express";
import agenda from "@libs/agenda.libs";
import { sendSms } from "@utils/sms.utils";
import { generateSecureOtp } from "src/helpers/otp.helper";
class AuthController extends Controller {
    public register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const request = req.body;

        await agenda.now('send email verification mail', {
            email: request.email,
            token: 'token',
        });

        return new HttpResponse(res).success(request, 'User registered successfully');
    };

    public sendOtp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const request = req.body;

        const { phone_number } = request;

        const otp = generateSecureOtp(6);

        sendSms(phone_number, `Your OTP is ${otp}`);

        return new HttpResponse(res).success(request, 'OTP sent successfully');
    };
}

export default new AuthController;