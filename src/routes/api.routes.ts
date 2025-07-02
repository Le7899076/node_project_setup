import { Router } from 'express';
import PostController from '@controllers/user/post.controller';
import validate from '@middleware/validation.middleware';
import postValidator from '@validators/post.validator';
import authValidator from '@validators/auth.validator';
import AuthController from '@controllers/user/auth.controller';
import multer from 'multer';

const router = Router();
const upload = multer();


router
    .get('/posts', PostController.index)
    .post('/posts', validate(postValidator.create), PostController.create);

router.post('/users/register', upload.none(), validate(authValidator.register), AuthController.register);
router.post('/users/send-otp', validate(authValidator.sendOtp), AuthController.sendOtp);

export default router;
