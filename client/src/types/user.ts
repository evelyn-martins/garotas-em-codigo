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
    areas?: { area: { id: string; name: string; description: string | null } }[];
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

export interface IUserUpdate {
    name?: string;
    username?: string;
    email?: string;
    image?: File | null;
    description?: string | null;
}

export interface IUserProfile {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string | null;
    description: string | null;
    role: 'STUDENT' | 'GUIDE';
    areas?: { area: { id: string; name: string; description: string | null } }[];
}

export interface IGuide {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string | null;
    description: string | null;
    role: 'GUIDE';
    createdAt: Date;
    updatedAt: Date;
    areas: { area: { id: string; name: string; description: string | null } }[];
}

export interface IUserCreateErros {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    areas?: string;
}

export interface IUserUpdateErrors {
    name?: string;
    username?: string;
    email?: string;
}