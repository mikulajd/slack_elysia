import db from '../db/prismaClient';
import { handlePrismaError } from '../services/prismaErrorHandler';

abstract class MessageController {

    static async sendMessage(userId: number, options: { conversationId: number, parentId?: number, messageContent: string, }) {
        try {
            const { conversationId, messageContent, parentId } = options;
            const conversation = await db.conversation.findFirst({ where: { conversationId: conversationId } })
            if (!conversation || (conversation.initiatorId != userId && conversation.recipientId != userId)) {
                return "You don't have access to this converation"
            }
            return await db.message.create({
                data: {
                    userId: userId,
                    conversationId: conversationId,
                    messageContent: messageContent,
                    parentId: parentId
                }
            })
        } catch (error) {
            return handlePrismaError(error);
        }
    }
    static async editMessage(userId: number, options: { messageId: number, messageContent: string }) {
        try {
            const { messageId, messageContent } = options;
            const message = await getMessageById(userId, messageId);
            if (!message) {
                return 'You dont have access to this message'
            }
            return await db.message.update({
                where: {
                    messageId: messageId
                },
                data: {
                    messageContent: messageContent
                }
            });
        } catch (error) {
            return handlePrismaError(error);
        }
    }
    static async deleteMessage(userId: number, options: { messageId: number, }) {
        try {
            const { messageId } = options;
            const message = await getMessageById(userId, messageId);
            if (!message) {
                return 'You dont have access to this message'
            }
            return await db.message.delete({
                where: {
                    messageId: messageId
                },

            });
        } catch (error) {
            return handlePrismaError(error);
        }
    }
    static async getReplies(userId: number, options: { messageId: number }) {
        try {
            const { messageId } = options;
            const message = await getMessageById(userId, messageId, { includeReplies: true, includeConversation: true });
            if (!message || (message.conversation.initiatorId != userId && message.conversation.recipientId != userId)) {
                return 'You dont have access to this message'
            }
            return message.replies;
        } catch (error) {
            return handlePrismaError(error);
        }
    }
    static async getReactions(userId: number, options: { messageId: number }) {
        try {
            const { messageId } = options;
            const message = await getMessageById(userId, messageId, { includeReactions: true, includeConversation: true });
            if (!message || (message.conversation.initiatorId != userId && message.conversation.recipientId != userId)) {
                return 'You dont have access to this message'
            }
            return message.reactions;
        } catch (error) {
            return handlePrismaError(error);
        }
    }
    static async getParent(userId: number, options: { messageId: number }) {
        try {
            const { messageId } = options;
            const message = await getMessageById(userId, messageId, { includeParent: true, includeConversation: true });
            if (!message || (message.conversation.initiatorId != userId && message.conversation.recipientId != userId)) {
                return 'You dont have access to this message'
            }
            return message.parent;
        } catch (error) {
            return handlePrismaError(error);
        }
    }
};

async function getMessageById(
    userId: number,
    messageId: number,
    options?: {
        includeReactions?: boolean,
        includeReplies?: boolean,
        includeParent?: boolean,
        includeConversation?: boolean
    }) {
    const message = await db.message.findFirst({
        where:
        {
            AND: [{ messageId: messageId },
            { userId: userId }
            ]
        },
        include: {
            reactions: options?.includeReactions ?? false,
            replies: options?.includeReplies ?? false,
            parent: options?.includeParent ?? false,
            conversation: options?.includeConversation ?? false
        }
    });
    return message;

}
export default MessageController;
