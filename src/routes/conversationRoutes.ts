import { Elysia, t } from "elysia";
import ConversationController from "../controllers/conversationController";
import { conversationModels } from "../models/conversationModels";

export const conversationRoutes = new Elysia({ prefix: '/conversations' })
    .use(conversationModels)
    /*
    !!Routy su momentalne urobene tak, ze ocakavaju aj nejake userId pouzivatela ktory s nimi pracuje
    !!ale kedze som sa este nedostal na autentifikaciu/middleware tak som to tam zatial len natvrdo vlozil */

    //Zoznam vsetkych konverzacii pouzivatela
    .get('/', () => ConversationController.getUserConversations(1),)

    //Vytvorenie novej konverzacie
    .post('/create', ({ body }) => ConversationController.createConversation(1, body),
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
            .get('', ({ params }) => ConversationController.getConversation(1, params))
            //Zmazanie konverzacie  
            .delete('/delete', ({ params }) => ConversationController.deleteConversation(1, params))

            //Premenovanie konverzacie
            .put('/rename', ({ body, params }) => ConversationController.renameConversation(1,
                {
                    conversationId: params.conversationId,
                    conversationName: body.conversationName
                }),
                {
                    body: 'conversation.rename',
                })

            //Zobrazenie sprav v konverzacii
            .get('/messages', ({ params }) => ConversationController.getMessages(1, params))

    )


