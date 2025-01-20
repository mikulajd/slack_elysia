import { Elysia, t } from "elysia";
import ReactionController from "../controllers/reactionController";
import { reactionModels } from "../models/reactionModels";
import { authMiddleware } from "../middleware/authMiddleware";

export const reactionRoutes = (app: Elysia) => app
    .use(reactionModels)
    .use(authMiddleware)
    .group('/reactions', (app) => app
        //Pridanie reakcie na spravu
        .post('/add', ({ body }) => ReactionController.addReaction(1, body),
            {
                body: 'reaction.add'
            })

        //Manipulacia s konkretnou reakciou
        .group('/:reactionId',
            {
                params: t.Object({
                    reactionId: t.Numeric()
                })
            },
            (app) => app

                //Zmazanie reakcie
                .delete('/delete', ({ params }) => ReactionController.deleteReaction(1, params),)

                //Uprava reakcie
                .put('/edit', ({ params, body }) => ReactionController.deleteReaction(1, { ...params, ...body }),
                    {
                        body: 'reaction.edit'
                    })
        )



    )