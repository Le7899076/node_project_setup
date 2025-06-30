import { Router } from 'express';
import PostController from '@controllers/post.controller';
import validateMiddleware from '@middleware/validation.middleware';
import validate from '@validators/post.validator';

const router = Router();
const postController = new PostController();

router.get('/posts', postController.index);
router.post('/posts', validateMiddleware(validate.create), postController.create);

export default router;
