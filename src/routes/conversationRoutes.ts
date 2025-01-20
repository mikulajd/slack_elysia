import { Elysia, t } from "elysia";
import ConversationController from "../controllers/conversationController";
import { conversationModels } from "../models/conversationModels";
import { authMiddleware } from "../middleware/authMiddleware";

export const conversationRoutes = (app: Elysia) => app
    .use(conversationModels)
    .use(authMiddleware)
    .group('/conversations', (app) => app
        //Zoznam vsetkych konverzacii pouzivatela
        .get('/', ({ user: { userId } }) => ConversationController.getUserConversations(userId),
        )

        //Vytvorenie novej konverzacie
        .post('/create', ({ user: { userId }, body }) => ConversationController.createConversation(userId, body),
            {
                body: 'conversation.create'
            })

        //Praca s konkretnou konverzaciou
        .group('/:conversationId',
            {
                params: t.Object({
                    conversationId: t.Numeric()
                })
            },
            (app) => app

                //Udaje o konverzacii
                .get('', ({ user: { userId }, params }) => ConversationController.getConversation(userId, params))
                //Zmazanie konverzacie  
                .delete('/delete', ({ user: { userId }, params }) => ConversationController.deleteConversation(userId, params))

                //Premenovanie konverzacie
                .put('/rename', ({ user: { userId }, body, params }) => ConversationController.renameConversation(userId,
                    {
                        conversationId: params.conversationId,
                        conversationName: body.conversationName
                    }),
                    {
                        body: 'conversation.rename',
                    })

                //Zobrazenie sprav v konverzacii
                .get('/messages', ({ user: { userId }, params }) => ConversationController.getMessages(userId, params))

        )
    )