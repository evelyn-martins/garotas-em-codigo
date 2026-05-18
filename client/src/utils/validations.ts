import type { IUserCreateErros } from "../types/user";

export function ValidateUserCreate(name: string, username: string, email: string, password: string, confirmPassword: string, role: string, areas: number): IUserCreateErros {
    const errors: IUserCreateErros = {};

    if (!name.trim()) {
        errors.name = "O nome é obrigatório.";
    }
    if (!username.trim()) {
        errors.username = "O usuário é obrigatório.";
    } else if (username.trim().length < 3) {
        errors.username = "O nome de usuário deve ter pelo menos 3 caracteres.";
    }
    if (!email.trim()) {
        errors.email = "O email é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "O email é inválido.";
    }
    if (!password.trim()) {
        errors.password = "A senha é obrigatória.";
    } else if (password.trim().length < 6) {
        errors.password = "A senha deve ter pelo menos 6 caracteres.";
    }
    if (!confirmPassword.trim()) {
        errors.confirmPassword = "A confirmação de senha é obrigatória.";
    } else if (confirmPassword.trim() !== password.trim()) {
        errors.confirmPassword = "As senhas não são iguais.";
    }
    if (role === "guia" && areas === 0) {
        errors.areas = "Guias devem selecionar pelo menos uma área de interesse.";
    }

    return errors;
}

export function ValidateLogin(email: string, password: string): Partial<IUserCreateErros> {
    const errors: Partial<IUserCreateErros> = {};
    if (!email.trim()) {
        errors.email = "O email é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "O email é inválido.";
    }

    if (!password.trim()) {
        errors.password = "A senha é obrigatória.";
    } else if (password.trim().length < 6) {
        errors.password = "A senha deve ter pelo menos 6 caracteres.";
    }
    return errors;
}