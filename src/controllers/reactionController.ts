import db from '../db/prismaClient';
import { handlePrismaError } from '../services/prismaErrorHandler';

abstract class ReactionController {


    static async addReaction(userId: number, options: { reactionTypeId: number, messageId: number, }) {
        try {
            const { messageId, reactionTypeId } = options
            return await db.reaction.create({
                data: {
                    userId: userId,
                    reactionTypeId: reactionTypeId,
                    messageId: messageId,
                }
            })
        } catch (error) {
            return handlePrismaError(error);

        }
    }
    static async editReaction(userId: number, options: { reactionId: number, reactionTypeId: number }) {
        try {
            const { reactionId, reactionTypeId } = options;
            return await db.reaction.update(
                {
                    where: {
                        reactionId: reactionId,
                        userId: userId
                    },
                    data: {
                        reactionTypeId: reactionTypeId,
                    }
                })
        } catch (error) {
            return handlePrismaError(error);
        }
    }
    static async deleteReaction(userId: number, options: { reactionId: number, }) {
        try {
            const { reactionId } = options;
            return await db.reaction.delete(
                {
                    where: {
                        reactionId: reactionId,
                        userId: userId
                    },
                });
        } catch (error) {
            return handlePrismaError(error);
        }
    }



}

export default ReactionController;
