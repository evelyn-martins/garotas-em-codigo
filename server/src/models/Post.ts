import { prisma } from "../config/prisma";

export interface IPost {
    id: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPostCreate {
    userId: string;
    content: string;
}

export class Post {
    static async create(postData: IPostCreate): Promise<IPost> {
        const newPost = await prisma.post.create({
            data: {
                userId: postData.userId,
                content: postData.content,
            },
        });
        return newPost;
    }
    static async update(postId: string, content: string): Promise<IPost> {
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { content },
        });
        return updatedPost;
    }
    static async delete(postId: string): Promise<void> {
        await prisma.post.delete({
            where: { id: postId },
        });
    }
    static async findById(postId: string): Promise<IPost | null> {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });
        return post;
    }
    static async findAllByUserId(userId: string): Promise<IPost[]> {
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) {
            throw new Error('Usuário não encontrado');
        }
        const posts = await prisma.post.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        return posts;
    }
    static async countLikes(postId: string): Promise<number> {
        const likeCount = await prisma.like.count({
            where: { postId },
        });
        return likeCount;
    }
}