import { generateToken } from '@utils/jwt.utils';
import UserResource from '@utils/resources/user.resource';
import { Request, Response, Router } from 'express';
const router = Router();
const multer = require('multer');
const upload = multer();
import bcrypt from 'bcrypt';
import User from '@models/user.model';
import redirectIfAuthenticated from '@middleware/redirectIfAuthenticated.middleware';
import isAuthenticated from '@middleware/isAuthenticated.middleware';


router.get('/', isAuthenticated, function (req, res) {
    res.render('admin/index', {
        title: "Home page"
    });
});

router.get('/about', isAuthenticated, function (req, res) {
    res.render('admin/about', {
        title: "About page",
        layout: 'layouts/full-width',
        user : JSON.stringify(req.session.user)
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

router.get('/logout', isAuthenticated, async function (req, res) {
    req.session.destroy((err) => {
        if (err) {
            req.flash('error', 'Logout operation failed');
            return res.redirect('/admin');
        } else {
            return res.redirect('/admin/login');
        }
    });
});



export default router;
