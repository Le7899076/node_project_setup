import { Router } from 'express';
import PostController from '@controllers/user/post.controller';
import validate from '@middleware/validation.middleware';
import postValidator from '@validators/post.validator';
import authValidator from '@validators/auth.validator';
import AuthController from '@controllers/user/auth.controller';
import multer from 'multer';
import { verifyOtp } from '@utils/sms.utils';
import auth from '@middleware/auth.middleware';
import User from '@models/sequelize/user.model';
import { Op } from 'sequelize';
import { model } from 'mongoose';
import Post from '@models/sequelize/post.model';

const router = Router();
const upload = multer();


router
    .get('/posts', auth, PostController.index)
    .post('/posts', auth, validate(postValidator.create), PostController.create);

router
    .post('/users/register', upload.none(), validate(authValidator.register), AuthController.register)
    .post('/users/login', upload.none(), validate(authValidator.login), AuthController.login)
    .post('/users/send-otp', validate(authValidator.sendOtp), AuthController.sendOtp)
    .post('/users/verify-otp', AuthController.verifyOtp);

router.post('/tests', async function (req: any, res: any, next: any) {
    let data = null;

    // data = await User.findAll({
    //     where: {
    //         id: 7
    //     }
    // });

    // data = await User.getAttributes();
    // data = await User.getTableName();

    const { page = 1, limit = 10, search = '' } = req.body;

    const offset = (Number(page) - 1) * Number(limit);

    data = await User.findAndCountAll(
        {
            where: {
                // Search on 'name' or 'email' as example fields
                firstName: {
                    [Op.iLike]: `%${search}%`, // PostgreSQL case-insensitive LIKE
                },

            },
            include: [
                {
                    model: Post,
                    as: 'posts', // Must match alias in `User.hasMany`
                },
            ],
            limit: Number(limit),
            offset,
            order: [['createdAt', 'DESC']],
        }
    );


    return res.json({
        status: true,
        message: 'Users fetched successfully.',
        data: data.rows,
        total: data.count,
        page: Number(page),
        pages: Math.ceil(data.count / Number(limit)),
    });

    // return res.json({
    //     status: true,
    //     message: 'test executed successfully.',
    //     data: data,
    // });
});

export default router;
