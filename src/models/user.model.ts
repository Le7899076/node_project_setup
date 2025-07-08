import { Schema, model } from 'mongoose';

import User from '@interfaces/user.interfaces';

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },

    },

);

UserSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'userId',
});


export default model<User>('User', UserSchema);