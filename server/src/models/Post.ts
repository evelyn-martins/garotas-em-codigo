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
    static async create(postData: IPostCreate) {
        return await prisma.post.create({
            data: {
                userId: postData.userId,
                content: postData.content,
            },
            include: {
                user: { select: { id: true, name: true, username: true, image: true } },
            },
        });
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
    static async findAllByUserId(userId: string, currentUserId: string) {
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) {
            throw new Error('Usuário não encontrado');
        }
        const rows = await prisma.post.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { id: true, name: true, username: true, image: true } },
                _count: { select: { likes: true } },
                likes: { where: { userId: currentUserId }, select: { userId: true } },
            },
        });
        return rows.map(({ likes, _count, ...post }) => ({
            ...post,
            likesCount: _count.likes,
            likedByMe: likes.length > 0,
        }));
    }
    static async countLikes(postId: string): Promise<number> {
        const likeCount = await prisma.like.count({
            where: { postId },
        });
        return likeCount;
    }

    static async findAll() {
        return await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { id: true, name: true, username: true, image: true } },
            },
        });
    }

    static async findAllPaginated(page: number, limit: number, userId: string) {
        const skip = (page - 1) * limit;
        const rows = await prisma.post.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { id: true, name: true, username: true, image: true } },
                _count: { select: { likes: true } },
                likes: { where: { userId }, select: { userId: true } },
            },
        });
        return rows.map(({ likes, _count, ...post }) => ({
            ...post,
            likesCount: _count.likes,
            likedByMe: likes.length > 0,
        }));
    }
}