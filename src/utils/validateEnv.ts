import { cleanEnv, str, port } from "envalid";

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ["development", "production", "test"],
            default: "development",
        }),
        MONGO_URL: str(),
        PORT: port({ default: 3000 }),
    });
}

export default validateEnv;