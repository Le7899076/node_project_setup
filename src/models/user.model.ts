import { Schema, model } from 'mongoose';

import User from '@interfaces/user.interfaces';

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export default model<User>('User', UserSchema);