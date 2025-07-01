"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_service_1 = __importDefault(require("@services/post.service"));
const post_resource_1 = __importDefault(require("@utils/resources/post.resource"));
const controller_1 = __importDefault(require("@controllers/controller"));
const http_response_1 = __importDefault(require("@utils/http.response"));
class PostController extends controller_1.default {
    constructor() {
        super();
        this.create = async (req, res, next) => {
            const { title, body } = req.body;
            const post = await this.PostService.create(title, body);
            return new http_response_1.default(res).success(post_resource_1.default.transform(post), 'Post created successfully');
        };
        this.index = async (req, res, next) => {
            const posts = await this.PostService.index();
            return res.status(200).json({
                status: true,
                data: post_resource_1.default.collection(posts),
            });
        };
        this.PostService = new post_service_1.default();
    }
}
exports.default = new PostController();
