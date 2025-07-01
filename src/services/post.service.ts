import PostModel from "@models/post.model";
import Post from '@interfaces/post.interfaces';

class PostService {
    private post = PostModel;

    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = await this.post.create({ title, body });
            return post;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }

    public async index(): Promise<any> {
        try {
            const posts = await this.post.find();
            return posts;
        } catch (error) {
            throw new Error('Unable to create post');
        }
    }

    
}

export default PostService;


