import bearer from "@elysiajs/bearer";
import jwt from "@elysiajs/jwt";
import Elysia, { error } from "elysia";

export const jwtConfig = jwt({
    name: "jwt",
    secret: process.env.JWT_SECRET!,
    exp: "1d"
})
export type TokenData = {
    userId: number;
    email: string;
};

export const authMiddleware = (app: Elysia) => app
    .use(bearer())
    .use(jwtConfig)
    .derive(async ({ jwt, bearer }) => {

        const user = await jwt.verify(bearer);
        if (!user) {
            return error(401, { message: 'Unauthorzied' })
        }
        return { user: user as TokenData };
    })
