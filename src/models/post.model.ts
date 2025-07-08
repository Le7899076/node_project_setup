import mongoose, { Schema, model } from 'mongoose';

import Post from '@interfaces/post.interfaces';

const PostSchema = new Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);


export default model<Post>('Post', PostSchema);