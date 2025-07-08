import { Request, Response, Router } from 'express';
const router = Router();

router.get('/register', (req: Request, res: Response) => {
    return res.render('auth/register', { title: 'Home Page' });
});


export default router;
