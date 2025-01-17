import db from '../db/prismaClient';

const ConversationController = {
    async getUserConversations(userId: number) {
        return await db.conversation.findMany({
            where: {
                OR: [
                    { initiatorId: userId },
                    { recipientId: userId }]
            }
        })
    },

    async getConversation(userId: number, options: { conversationId: number }) {
        const { conversationId } = options;
        const conversation = await getConversationById(userId, conversationId);
        if (!conversation) {
            return 'You dont have access to this conversation'
        }
        return conversation;
    },
    async createConversation(userId: number, options: { initiatorId: number, recipientId: number, conversationName?: string }) {
        const { initiatorId, recipientId, conversationName } = options;
        if (userId != initiatorId && userId != recipientId) {
            return "You can't create conversation between other people"
        }
        return await db.conversation.create({
            data: {
                initiatorId: initiatorId,
                recipientId: recipientId,
                conversationName: conversationName,
            }
        })

    },
    async renameConversation(userId: number, options: { conversationId: number, conversationName: string }) {
        const { conversationId, conversationName } = options;
        const conversation = await getConversationById(userId, conversationId);
        if (!conversation) {
            return 'You dont have access to this conversation'
        }
        return await db.conversation.update({
            where: {
                conversationId: conversationId
            },
            data: {
                conversationName: conversationName
            }
        });
    },


    async deleteConversation(userId: number, options: { conversationId: number }) {
        const { conversationId } = options;
        const conversation = await getConversationById(userId, conversationId);
        if (!conversation) {
            return 'You dont have access to this conversation'
        }
        return db.conversation.delete({ where: { conversationId: conversationId } });
    },



    async getMessages(userId: number, options: { conversationId: number }) {
        const { conversationId } = options;
        const conversation = await getConversationById(userId, conversationId, true);
        if (!conversation) {
            return 'You dont have access to this conversation'
        }
        return conversation.messages;
    },
};

async function getConversationById(userId: number, conversationId: number, includeMessages?: boolean) {
    const conversation = await db.conversation.findFirst({
        where:
        {
            AND: [{ conversationId: conversationId },
            {
                OR: [
                    { initiatorId: userId },
                    { recipientId: userId }]
            }]
        },
        include: {
            messages: includeMessages
                ? {
                    include: {
                        reactions: true
                    }
                }
                : false
        }
    });
    return conversation;

}
export default ConversationController;
