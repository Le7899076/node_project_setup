import { Request, Response, NextFunction } from "express";
import PostService from "@services/post.service";
import HttpException from "@utils/exceptions/http.exception";
import PostResource from "@utils/resources/post.resource";
import Controller from "@controllers/controller";


class PostController extends Controller {

    private PostService = new PostService();

    public create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const { title, body } = req.body;
            const post = await this.PostService.create(title, body);

            res.status(201).json({ post });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    public index = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            const posts = await this.PostService.index();

            return res.status(200).json({
                status: true,
                data: PostResource.collection(posts),
            });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default PostController;