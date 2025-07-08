import { Request, Response, Router } from 'express';
const router = Router();
export default router;

router.get('/', function (req, res) {
    res.redirect('/admin');
});
