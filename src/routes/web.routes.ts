import { Request, Response, Router } from 'express';
const router = Router();

router.get('/posts', (req: Request, res: Response) => {
    return res.render('index', {
        title: 'Home Page',
        items: ['Laravel', 'Node.js', 'Express', 'Handlebars']
    });
});


export default router;
