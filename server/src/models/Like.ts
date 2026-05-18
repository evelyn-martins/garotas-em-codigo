import { prisma } from '../config/prisma';

export interface ILike {
    userId: string;
    postId: string;
}

export class Like {
    static async create(likeData: ILike): Promise<void> {
        await prisma.like.create({
            data: {
                userId: likeData.userId,
                postId: likeData.postId,
            },
        });
    }
    static async exists(likeData: ILike): Promise<boolean> {
        const like = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId: likeData.userId,
                    postId: likeData.postId,
                },
            },
        });
        return !!like;
    }
    static async delete(likeData: ILike): Promise<void> {
        await prisma.like.delete({
            where: {
                userId_postId: {
                    userId: likeData.userId,
                    postId: likeData.postId,
                },
            },
        });
    }
}