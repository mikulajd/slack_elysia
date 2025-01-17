import { Elysia, t } from 'elysia';
export const conversationModels = new Elysia().model({
    'conversation.create': t.Object({
        recipientId: t.Numeric(),
        conversationName: t.Optional(t.String()),
    }),
    'conversation.rename': t.Object({
        conversationName: t.String(),
    }),

}) 