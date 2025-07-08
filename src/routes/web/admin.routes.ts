import { generateToken } from '@utils/jwt.utils';
import UserResource from '@utils/resources/user.resource';
import { Request, Response, Router } from 'express';
const router = Router();
const multer = require('multer');
const upload = multer();
import bcrypt from 'bcrypt';
import User from '@models/user.model';
import redirectIfAuthenticated from '@middleware/redirectIfAuthanticated.middleware';


router.get('/', function (req, res) {
    res.render('admin/index', {
        title: "Home page"
    });
});

router.get('/about', function (req, res) {
    res.render('admin/about', {
        title: "About page",
        layout: 'layouts/full-width'
    });
});


router.get('/login', redirectIfAuthenticated, function (req, res) {
    res.render('admin/login', {
        title: "Login page",
        layout: 'layouts/blank-layout',
        error: req.flash('error')[0],
    });
});

router.post('/login', redirectIfAuthenticated, upload.none(), async function (req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        req.flash('error', 'Invalid credentials');
        return res.redirect('/admin/login');
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
        req.flash('error', 'Invalid credentials');
        return res.redirect('/admin/login');
    }

    // Set session
    req.session.user = user;

    req.flash('success', 'Login successful');
    return res.redirect('/admin');
});


export default router;
