import { Elysia, t } from 'elysia';
export const messageModels = new Elysia().model({
    'message.send': t.Object({
        conversationId: t.Numeric(),
        parentId: t.Optional(t.Numeric()),
        messageContent: t.String(),
    }),
    'message.edit': t.Object({
        messageId: t.Numeric(),
        messageContent: t.String(),
    })
})