"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("src/models/post.model"));
class PostService {
    constructor() {
        this.post = post_model_1.default;
    }
    async create(title, body) {
        try {
            const post = await this.post.create({ title, body });
            return post;
        }
        catch (error) {
            throw new Error('Unable to create post');
        }
    }
    async index() {
        try {
            const posts = await this.post.find();
            return posts;
        }
        catch (error) {
            throw new Error('Unable to create post');
        }
    }
}
exports.default = PostService;
