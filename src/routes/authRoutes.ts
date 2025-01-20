import { Elysia } from "elysia";
import AuthController from "../controllers/authController";
import { authModels } from "../models/authModels";

export const authRoutes = (app: Elysia) => app
    .use(authModels)
    .group('/api/v1/auth', (app) => app
        .post('/register', async ({ body }) => await AuthController.register(body),
            {
                body: 'user.register'
            })
        .post('/login', ({ body }) => AuthController.login(body),
            {
                body: 'user.login'
            })
        .get('/usersList', () => AuthController.getUsers(),
            {

            }

        )

    )