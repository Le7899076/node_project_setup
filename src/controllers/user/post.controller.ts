import { Request, Response, NextFunction } from "express";
import PostService from "@services/post.service";
import PostResource from "@utils/resources/post.resource";
import Controller from "@controllers/controller";
import HttpResponse from "@utils/http.response";
import userModel from "@models/user.model";
import postModel from "@models/post.model";


class PostController extends Controller {
    private PostService: PostService;

    public constructor() {
        super();
        this.PostService = new PostService();
    }

    public create = async (req: any, res: Response, next: NextFunction): Promise<any> => {
        const { title, body } = req.body;
        const post = await this.PostService.create(title, body, req.user._id);

        return res.success(
            PostResource.transform(post),
            req.t('message.post.created'),
        );
    };

    public index = async (req: any, res: Response, next: NextFunction): Promise<any> => {
        console.log(req.user);
        // const posts = await this.PostService.index();

        const posts = await postModel.find({ userId: req.user._id })
            .select('title body createdAt updatedAt')
            .populate({
                path: 'userId',
                select: ['firstName', 'lastName', 'email', 'createdAt', 'updatedAt'],
                populate: {
                    path: 'posts',
                    select: ['title', 'body', 'createdAt', 'updatedAt'],
                },
            });

        return res.status(200).json({
            status: true,
            // data: PostResource.collection(posts),
            data: posts
        });
    };
}

export default new PostController();