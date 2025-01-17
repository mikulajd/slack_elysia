import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

const users = [
    {
        userId: 1,
        firstName: 't',
        lastName: 't',
        email: 't.d@t.com',
        password: 'testtesttest'
    },
    {
        userId: 2,
        firstName: "Test",
        lastName: "Test",
        email: 'test@test.com',
        password: 'testtesttest'
    }
];
const conversations = [
    {
        initiatorId: 1,
        recipientId: 2,
        conversationName: "First convo"
    },
    {
        initiatorId: 2,
        recipientId: 1,

    }
];

const messages = [
    {
        userId: 1,
        conversationId: 1,
        messageContent: "test1"
    },
    {
        userId: 1,
        conversationId: 1,
        messageContent: "test test1"
    },
    {
        userId: 2,
        conversationId: 2,
        messageContent: "test test2"
    },
    {
        userId: 2,
        conversationId: 1,
        messageContent: "test test1"
    },
    {
        userId: 1,
        conversationId: 2,
        messageContent: "test test1"
    },
]

const reactionTypes = [
    {
        reactionValue: ":D"
    },
    {
        reactionValue: ":)"
    }
]
const reactions = [
    {
        reactionTypeId: 1,
        userId: 1,
        messageId: 1,
    },
    {
        reactionTypeId: 2,
        userId: 1,
        messageId: 2,
    },
    {
        reactionTypeId: 1,
        userId: 2,
        messageId: 1,
    },
]


const seed = async (users, conversations, messages, reactionTypes, reactions) => {
    console.log('Seeding db');

    try {
        await client.$transaction(async (prisma) => {
            for (let i = 0; i < users.length; i++) {
                await prisma.user.upsert(
                    {
                        where: { userId: users[i].userId },
                        update: users[i],
                        create: users[i]
                    }
                )
            }
            console.log('Added Users');

            await prisma.conversation.createMany({ data: conversations });
            console.log('Added convos');

            await prisma.message.createMany({ data: messages });
            console.log('Added messages');

            await prisma.reactionType.createMany({ data: reactionTypes })
            console.log('Added reaction types');

            await prisma.reaction.createMany({ data: reactions });
            console.log('Added reactions');
        });
    } catch (error) {
        console.error('Error: ', error);
    } finally {
        await client.$disconnect();
        console.log('Disconnected Prisma Client, exiting');
    }
}


seed(users, conversations, messages, reactionTypes, reactions).then(() => {
    console.log('Seeded successfully');
}).catch((error) => {
    console.error('Error: ', error);
}).finally(() => {
    client.$disconnect();
    console.log('Disconnected Prisma Client, exiting');
});