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
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;

            const [posts, total] = await Promise.all([
                postModel
                    .find({ userId: req.user._id })
                    .select('title body createdAt updatedAt')
                    .populate({
                        path: 'userId',
                        select: ['firstName', 'lastName', 'email', 'createdAt', 'updatedAt'],
                    })
                    .skip(skip)
                    .limit(limit)
                    .lean(), // optional: improve performance and remove mongoose document overhead

                postModel.countDocuments({ userId: req.user._id })
            ]);

            return res.status(200).json({
                status: true,
                data: posts,
                meta: {
                    total,
                    page,
                    last_page: Math.ceil(total / limit),
                    per_page: limit,
                }
            });
        } catch (error) {
            next(error);
        }

    }
}
export default new PostController();