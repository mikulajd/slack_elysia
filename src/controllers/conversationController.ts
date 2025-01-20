import db from '../db/prismaClient';
import { handlePrismaError } from '../services/prismaErrorHandler';

abstract class ConversationController {
    static async getUserConversations(userId: number) {
        try {
            return await db.conversation.findMany({
                where: {
                    OR: [
                        { initiatorId: userId },
                        { recipientId: userId }]
                }
            })
        } catch (error) {
            return handlePrismaError(error);
        }
    } static async getConversation(userId: number, options: { conversationId: number }) {
        try {
            const { conversationId } = options;
            const conversation = await getConversationById(userId, conversationId);
            if (!conversation) {
                return 'You dont have access to this conversation'
            }
            return conversation;
        } catch (error) {
            return handlePrismaError(error);
        }
    } static async createConversation(userId: number, options: { recipientId: number, conversationName?: string }) {
        try {
            const { recipientId, conversationName } = options;

            return await db.conversation.create({
                data: {
                    initiatorId: userId,
                    recipientId: recipientId,
                    conversationName: conversationName,
                }
            })
        } catch (error) {
            return handlePrismaError(error);
        }

    } static async renameConversation(userId: number, options: { conversationId: number, conversationName: string }) {
        try {
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
        } catch (error) {
            return handlePrismaError(error);
        }
    } static async deleteConversation(userId: number, options: { conversationId: number }) {
        try {
            const { conversationId } = options;
            const conversation = await getConversationById(userId, conversationId);
            if (!conversation) {
                return 'You dont have access to this conversation'
            }
            return db.conversation.delete({ where: { conversationId: conversationId } });
        } catch (error) {
            return handlePrismaError(error);
        }
    } static async getMessages(userId: number, options: { conversationId: number }) {
        try {
            const { conversationId } = options;
            const conversation = await getConversationById(userId, conversationId, true);
            if (!conversation) {
                return 'You dont have access to this conversation'
            }
            return conversation.messages;
        } catch (error) {
            return handlePrismaError(error);
        }
    }
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
