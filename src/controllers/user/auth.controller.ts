import Controller from "@controllers/controller";
import HttpResponse from "@utils/http.response";
import { Request, Response, NextFunction } from "express";
import agenda from "@libs/agenda.libs";
import { sendSms, sendOtp, verifyOtp } from "@utils/sms.utils";
import { generateSecureOtp } from "@helpers/otp.helper";
import { error } from "console";
import User from "@models/user.model";
import bcrypt from 'bcrypt';
class AuthController extends Controller {
    public register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        let request = req.body;
        const { firstName, lastName, email, password } = request;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.error("This email is already registered.", 200);
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 10),
        });


        // await agenda.now('send email verification mail', {
        //     email: email,
        //     token: 'token',
        // });

        return res.success(user, 'Registered successfully');
    };

    public sendOtp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const request = req.body;

        const { phone_number } = request;

        // const otp = generateSecureOtp(6);

        // sendSms(phone_number, `Your OTP is ${otp}`);

        sendOtp(phone_number);

        return new HttpResponse(res).success({
            // otp,
            phone_number,
        }, 'OTP sent successfully');
    };

    public verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const request = req.body;

        const { phone_number, otp } = request;

        let isVerified = await verifyOtp(phone_number, otp);

        if (!isVerified) {
            return new HttpResponse(res).error("Otp verification failed");
        }

        return new HttpResponse(res).success({
            // otp,
            phone_number,
        }, 'OTP verified successfully');
    };
}

export default new AuthController;