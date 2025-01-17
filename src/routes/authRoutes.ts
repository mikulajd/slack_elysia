import { Elysia, t } from "elysia";
import AuthController from "../controllers/authController";
import { authModels } from "../models/authModels";


export const authRoutes = new Elysia({
    prefix: '/api/v1/auth'
})
    .use(authModels)
    .post('/register', ({ body }) => AuthController.register(body),
        {
            body: 'user.register'
        })
    .post('/login', ({ body }) => AuthController.login(body),
        {
            body: 'user.login'
        })
    .get('/usersList', () => AuthController.getUsers())

