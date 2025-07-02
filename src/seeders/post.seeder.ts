import post from "@models/post.model";
import { connectMongo } from '@database/mongo.database';
import dotenv from "dotenv";

dotenv.config();


// seeders/userSeeder.js
(async () => {
    connectMongo();
    // Insert sample users
    await post.insertMany([
        { title: 'Post 1', body: 'This is the first post.' },
        { title: 'Post 2', body: 'This is the second post.' },
    ]);

    console.log('🌱 Post Seeded!');
    process.exit();
})();

