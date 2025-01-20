import { Elysia } from "elysia";
import AuthController from "../controllers/authController";
import { authModels } from "../models/authModels";
import { jwtConfig } from "../middleware/authMiddleware";
import { UserData } from "../services/authServices";
import { type } from "os";
import { ElysiaCustomStatusResponse } from "elysia/error";


export const authRoutes = (app: Elysia) => app
    .use(authModels)
    .use(jwtConfig)
    .group('/api/v1/auth', (app) => app
        .post('/register', async ({ jwt, body }) => {


            const userInfo = await AuthController.register(body);
            if (userInfo instanceof Error) {
                return userInfo;
            } else if (userInfo instanceof ElysiaCustomStatusResponse) {
                return userInfo;
            }
            const token = await jwt.sign(userInfo)
            return { token: token };

        },
            {
                body: 'user.register'
            },

        )

        .post('/login', async ({ jwt, body }) => {


            const userInfo = await AuthController.login(body);
            if (userInfo instanceof Error) {
                return userInfo;
            } else if (userInfo instanceof ElysiaCustomStatusResponse) {
                return userInfo;
            }
            const token = await jwt.sign(userInfo)
            return { token: token };

        },
            {
                body: 'user.login'
            })
        .get('/usersList', () => AuthController.getUsers(),
            {

            }

        )

    )