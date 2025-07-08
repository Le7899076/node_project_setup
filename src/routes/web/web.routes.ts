import { Request, Response, Router } from 'express';
import { func } from 'joi';
const router = Router();
export default router;

router.get('/', function (req, res) {
    res.redirect('/admin');
});
