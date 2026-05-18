export interface IUser {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    image: string | null;
    description: string | null;
    role: 'STUDENT' | 'GUIDE';
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserCreate {
    name: string;
    username: string;
    email: string;
    password: string;
    image: string | null;
    description: string | null;
    role: 'STUDENT' | 'GUIDE';
    areas: string[];
}

export interface IUserCreateErros {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    areas?: string;
}