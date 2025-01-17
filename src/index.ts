import { Elysia } from 'elysia'
import { node } from '@elysiajs/node'
import { authRoutes } from './routes/authRoutes';
import { slackRoutes } from './routes/slackRoutes';
import { swagger } from '@elysiajs/swagger'

const app = new Elysia({ adapter: node() })
    .use(swagger())
    .use(authRoutes)
    .use(slackRoutes)
    .listen(3000, ({ port }) => {
        console.log(
            `Server is running at port ${port}`
        )
    });
