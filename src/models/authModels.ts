import { Elysia, t } from "elysia";

export const authModels = new Elysia().model({
    'user.register': t.Object({
        firstName: t.String(),
        lastName: t.String(),
        email: t.String(),
        password: t.String(),

    }),
    'user.login': t.Object({
        email: t.String(),
        password: t.String()
    }),
    'user.changePassword': t.Object({
        email: t.String(),
        oldPassword: t.String(),
        newPassword: t.String(),
    })
})