import { Elysia, error, t } from 'elysia';
export const reactionModels = new Elysia().model({

    'reaction.add': t.Object({
        messageId: t.Numeric(),
        reactionTypeId: t.Numeric()
    }),
    'reaction.edit': t.Object({
        reactionTypeId: t.Numeric()
    })
})