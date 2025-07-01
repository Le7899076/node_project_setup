import { Request, Response, NextFunction } from "express";
import PostService from "@services/post.service";
import HttpException from "@utils/exceptions/http.exception";
import PostResource from "@utils/resources/post.resource";
import Controller from "@controllers/controller";
import HttpResponse from "@utils/http.response";
import Post from '../../interfaces/post.interfaces';


class PostController extends Controller {
    private PostService: PostService;

    public constructor() {
        super();
        this.PostService = new PostService();
    }

    public create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { title, body } = req.body;
        const post = await this.PostService.create(title, body);

        return new HttpResponse(res).success(
            PostResource.transform(post),
            'Post created successfully'
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