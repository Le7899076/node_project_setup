import { Request, Response, Router } from 'express';
const router = Router();

router.get('', function (req, res) {
    res.render('index', {
        title: "Home page"
    });
});

router.get('/about', function (req, res) {
    res.render('about', {
        title: "About page",
    });
});

export default router;
