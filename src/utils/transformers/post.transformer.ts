import Post from '@interfaces/post.interfaces';

 class PostResource {
    static transform(post: Post): Record<string, any> {
        const { _id, title, body } = post;

        return {
            id: _id,
            title: title,
            body: body,
        };
    }

    static collection(posts: Post[]): Record<string, any>[] {
        return posts.map(PostResource.transform);
    }
}


export default PostResource;

