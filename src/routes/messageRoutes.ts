import { Elysia, t } from "elysia";
import MessageController from "../controllers/messageController";
import { messageModels } from "../models/messageModels";

export const messageRoutes = new Elysia({ prefix: '/messages' })
    .use(messageModels)
    //Poslanie spravy do konverzacie
    .post('/send', ({ body }) => MessageController.sendMessage(1, body),
        {
            body: 'message.send'
        })

    //Manipulacia konkretnej spravy
    .group('/:messageId',
        {
            params: t.Object({
                messageId: t.Numeric()
            })
        },
        (app) => app

            //Ziskanie odpovedi na spravu
            .get('/replies', ({ params }) => MessageController.getReplies(1, params),)

            //Reakcie na spravu. Neviem ci by to bolo lepsie tu alebo v reactionRoutes.ts. 
            //Kazdopadne reakcie su returnovane spolu so spravou cize teoreticky je to nepotrebne 
            .get('/reactions', ({ params }) => MessageController.getReactions(1, params),)

            //Ziskanie spravy na ktoru bolo odpovedane
            .get('/parent', ({ params }) => MessageController.getParent(1, params),)

            //Zmazanie spravy
            .delete('/delete', ({ params }) => MessageController.deleteMessage(1, params),)

            //Uprava spravy
            .put('/edit', ({ params, body }) => MessageController.editMessage(1, { ...params, ...body }),

                {
                    body: 'message.edit'
                })

    )
