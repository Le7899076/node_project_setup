import Post from '@interfaces/post.interfaces';
import UserResource from './user.resource';

class PostResource {
    static transform(post: any): Record<string, any> {
        const { _id, title, body, userId } = post;

        return {
            id: _id,
            title: title,
            body: body,
            ...(typeof userId === 'object' && userId !== null && userId._id && {
                users: UserResource.transform(userId),
            }),
        };
    }

    static collection(posts: Post[]): Record<string, any>[] {
        return posts.map(PostResource.transform);
    }
}


export default PostResource;

