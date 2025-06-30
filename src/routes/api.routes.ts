import { Router } from 'express';
import PostController from '@controllers/user/post.controller';
import validateMiddleware from '@middleware/validation.middleware';
import validate from '@validators/post.validator';
import AuthController from '@controllers/user/auth.controller';

const router = Router();

router.get('/posts', PostController.index);
router.post('/posts', validateMiddleware(validate.create), PostController.create);
router.post('/users/register', AuthController.register);

export default router;
