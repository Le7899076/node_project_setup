import { Request, Response, Router } from 'express';
const router = Router();

router.get('/posts', (req: Request, res: Response) => {
    return res.render('index', { title: 'Home Page' });
});


export default router;
