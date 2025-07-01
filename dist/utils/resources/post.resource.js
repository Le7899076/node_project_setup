"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostResource {
    static transform(post) {
        const { _id, title, body } = post;
        return {
            id: _id,
            title: title,
            body: body,
        };
    }
    static collection(posts) {
        return posts.map(PostResource.transform);
    }
}
exports.default = PostResource;
