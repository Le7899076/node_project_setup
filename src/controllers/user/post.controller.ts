import { Request, Response, NextFunction } from "express";
import PostService from "@services/post.service";
import PostResource from "@utils/resources/post.resource";
import Controller from "@controllers/controller";
import HttpResponse from "@utils/http.response";


class PostController extends Controller {
    private PostService: PostService;

    public constructor() {
        super();
        this.PostService = new PostService();
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { title, body } = req.body;
        const post = await this.PostService.create(title, body);

        return res.success(
            PostResource.transform(post),
            req.t('message.post.created'),
        );
    };

    public index = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const posts = await this.PostService.index();

        return res.status(200).json({
            status: true,
            data: PostResource.collection(posts),
        });
    };
}

export default new PostController();