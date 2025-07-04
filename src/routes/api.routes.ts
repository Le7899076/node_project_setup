import { Router } from 'express';
import PostController from '@controllers/user/post.controller';
import validate from '@middleware/validation.middleware';
import postValidator from '@validators/post.validator';
import authValidator from '@validators/auth.validator';
import AuthController from '@controllers/user/auth.controller';
import multer from 'multer';
import { verifyOtp } from '@utils/sms.utils';

const router = Router();
const upload = multer();


router
    .get('/posts', PostController.index)
    .post('/posts', validate(postValidator.create), PostController.create);

router
    .post('/users/register', upload.none(), validate(authValidator.register), AuthController.register)
    .post('/users/send-otp', validate(authValidator.sendOtp), AuthController.sendOtp)
    .post('/users/verify-otp', AuthController.verifyOtp);

export default router;
