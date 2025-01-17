import db from '../db/prismaClient';

const ReactionController = {

    async addReaction(userId: number, options: { reactionTypeId: number, messageId: number, }) {
        const { messageId, reactionTypeId } = options

        return await db.reaction.create({
            data: {
                userId: userId,
                reactionTypeId: reactionTypeId,
                messageId: messageId,
            }
        })
    },

    async editReaction(userId: number, options: { reactionId: number, reactionTypeId: number }) {
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
    },


    async deleteReaction(userId: number, options: { reactionId: number, }) {
        const { reactionId } = options;
        return await db.reaction.delete(
            {
                where: {
                    reactionId: reactionId,
                    userId: userId
                },
            });
    },

}
export default ReactionController;
