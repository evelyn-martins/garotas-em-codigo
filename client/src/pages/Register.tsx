import logo from "../assets/logo.svg";
import { LuAtSign, LuEye, LuEyeOff, LuGraduationCap, LuMail, LuUserRound } from "react-icons/lu";
import { TbHeartHandshake } from "react-icons/tb";
import Dropdown, { type DropdownOption } from "../components/Dropdown";
import { LuMessagesSquare } from "react-icons/lu";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaRegStar } from "react-icons/fa";
import type { IUserCreate, IUserCreateErros } from "../types/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {ValidateUserCreate} from "../utils/validations";
import { AuthService } from "../services/AuthService";
import { AreaService } from "../services/AreaService";
import type { IArea } from "../types/areas";
import { useAuth } from "../contexts/AuthContext";

interface FormData {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "STUDENT" | "GUIDE";
}

export default function Register() {
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [fieldErrors, setFieldErrors] = useState<IUserCreateErros>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [areasOptions, setAreasOptions] = useState<DropdownOption[]>([]);
    const [areasSelected, setAreasSelected] = useState<string[]>([]);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "STUDENT",
    });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setSubmitError(null);
        setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);
        setFieldErrors({});

        const validationErrors = ValidateUserCreate(formData.name, formData.username, formData.email, formData.password, formData.confirmPassword, formData.role, areasSelected.length);
        if (Object.keys(validationErrors).length > 0) {
            setFieldErrors(validationErrors);
            return;
        }

        setLoading(true);

        const submitData: IUserCreate = {
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            image: null,
            description: null,
            role: formData.role === "GUIDE" ? "GUIDE" : "STUDENT",
            areas: areasSelected,
        };

        try {
            const data = await AuthService.register(submitData);
            login(data.token, data.user);

        } catch (error) {
            if (error instanceof Error) {
                const message = error.message;
                const normalizedMessage = message.toLowerCase();

                if (normalizedMessage.includes("email")) {
                    setFieldErrors((prev) => ({ ...prev, email: message }));
                    setLoading(false);
                    return;
                }

                if (normalizedMessage.includes("username") || normalizedMessage.includes("usuário") || normalizedMessage.includes("usuario")) {
                    setFieldErrors((prev) => ({ ...prev, username: message }));
                    setLoading(false);
                    return;
                }

                if (normalizedMessage.includes("guias") || normalizedMessage.includes("guia")) {
                    setFieldErrors((prev) => ({ ...prev, areas: message }));
                    setLoading(false);
                    return;
                }

                setSubmitError(message);
                setLoading(false);
                return;
            }
            setSubmitError("Erro ao registrar usuário");
            setLoading(false);
            return;
        }

        setTimeout(() => {
            setLoading(false);
            navigate("/");
        }, 2000);
    };

    useEffect(() => {
        const getAllAreas = async () => {
            const areas = await AreaService.getAllAreas();
            setAreasOptions(areas.map((area: IArea) => ({ value: String(area.id), label: area.name })));
        };
        getAllAreas();
    }, []);

    const handleAreaChange = (value: string[]) => {
        setAreasSelected((prev) => (prev.includes(value[0]) ? prev.filter((v) => v !== value[0]) : [...prev, value[0]]));
    };

    const handleRoleChange = (newRole: "STUDENT" | "GUIDE") => {
        setFormData((prev) => ({ ...prev, role: newRole }));
    };

    return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-details-primary/70 bg-white shadow-2xl shadow-action-primary/20 lg:min-h-155 lg:flex-row">
                <aside className="flex w-full items-center bg-bg-primary/70 px-7 py-10 lg:w-[42%] lg:px-10">
                    <h2 className="sr-only">Tela de cadastro da plataforma Garotas em Codigo</h2>

                    <div className="mx-auto max-w-sm">
                        <div className="mb-9 flex items-center justify-center gap-2 lg:justify-start">
                            <img src={logo} alt="Logo" className="h-26 w-26" />
                            <p className="text-lg font-semibold text-color-logo">Garotas em Código</p>
                        </div>

                        <p className="max-w-xs text-center text-sm font-medium leading-6 text-text-primary lg:text-left">
                            Conecte-se, aprenda e cresça. A tecnologia é feita por todas nós.
                        </p>

                        <div className="mt-8 space-y-3">
                            <div className="flex items-center gap-4 rounded-lg border border-white/80 bg-white px-4 py-3 shadow-sm">
                                <div>
                                    <LuMessagesSquare className="mx-1 size-6 text-2xl text-action-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold leading-tight text-color-logo">Mentoria</p>
                                    <p className="text-xs font-medium text-text-primary">Conecte-se com guias</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-lg border border-white/80 bg-white px-4 py-3 shadow-sm">
                                <div>
                                    <HiOutlineLightBulb className="mx-1 size-6 text-2xl text-action-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold leading-tight text-color-logo">Oportunidades</p>
                                    <p className="text-xs font-medium text-text-primary">Cursos, eventos e bolsas</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 rounded-lg border border-white/80 bg-white px-4 py-3 shadow-sm">
                                <div>
                                    <FaRegStar className="mx-1 size-6 text-2xl text-action-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-semibold leading-tight text-color-logo">Referências</p>
                                    <p className="text-xs font-medium text-text-primary">Mulheres que inspiram na TI</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                <section className="flex-1 bg-white px-6 py-8 text-left lg:px-10">
                    <h1 className="text-2xl font-semibold text-color-logo">Criar conta</h1>
                    <p className="mt-1 text-sm font-medium text-text-primary">Preencha os dados abaixo para começar</p>

                    <p className="mt-6 text-sm font-semibold text-color-logo">Quero me cadastrar como:</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-2 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => handleRoleChange("STUDENT")}
                                className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition cursor-pointer ${formData.role === "STUDENT"
                                    ? "border-action-primary bg-bg-primary text-color-logo"
                                    : "border-details-primary text-text-primary hover:border-action-primary hover:text-color-logo"
                                    }`}
                            >
                                <LuGraduationCap className="mx-auto text-2xl text-action-primary" />
                                Aprendiz
                            </button>
                            <button
                                type="button"
                                onClick={() => handleRoleChange("GUIDE")}
                                className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition cursor-pointer ${formData.role === "GUIDE"
                                    ? "border-action-primary bg-bg-primary text-color-logo"
                                    : "border-details-primary text-text-primary hover:border-action-primary hover:text-color-logo"
                                    }`}
                            >
                                <TbHeartHandshake className="mx-auto -mt-1 text-2xl text-action-primary" />
                                Guia
                            </button>
                        </div>

                        <div className="my-6 h-px w-full bg-details-primary/70" />

                        <div className="grid gap-3.5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-color-logo">Nome completo</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Seu nome"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-details-primary bg-white px-3 py-2.5 pr-10 text-sm text-color-logo outline-none transition placeholder:text-text-primary/70 focus:border-action-primary focus:ring-4 focus:ring-action-primary/10"
                                    />
                                    <LuUserRound className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base text-text-primary" />
                                </div>
                                {fieldErrors.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="username" className="mb-1.5 block text-xs font-semibold text-color-logo">Usuário</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="@usuario"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-details-primary bg-white px-3 py-2.5 pr-10 text-sm text-color-logo outline-none transition placeholder:text-text-primary/70 focus:border-action-primary focus:ring-4 focus:ring-action-primary/10"
                                    />
                                    <LuAtSign className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base text-text-primary" />
                                </div>
                                {fieldErrors.username && <p className="mt-1 text-xs text-red-500">{fieldErrors.username}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-color-logo">E-mail</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="seu@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-details-primary bg-white px-3 py-2.5 pr-10 text-sm text-color-logo outline-none transition placeholder:text-text-primary/70 focus:border-action-primary focus:ring-4 focus:ring-action-primary/10"
                                    />
                                    <LuMail className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base text-text-primary" />
                                </div>
                                {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-color-logo">Senha</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        placeholder="Crie uma senha"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-details-primary bg-white px-3 py-2.5 pr-10 text-sm text-color-logo outline-none transition placeholder:text-text-primary/70 focus:border-action-primary focus:ring-4 focus:ring-action-primary/10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-base text-text-primary"
                                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                    >
                                        {showPassword ? <LuEyeOff /> : <LuEye />}
                                    </button>
                                </div>
                                {fieldErrors.password && <p className="mt-1 text-xs text-red-500">{fieldErrors.password}</p>}
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="confirmPassword" className="mb-1.5 block text-xs font-semibold text-color-logo">Confirmar senha</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Repita sua senha"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-details-primary bg-white px-3 py-2.5 pr-10 text-sm text-color-logo outline-none transition placeholder:text-text-primary/70 focus:border-action-primary focus:ring-4 focus:ring-action-primary/10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-base text-text-primary"
                                        aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}
                                    >
                                        {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
                                    </button>
                                </div>
                                {fieldErrors.confirmPassword && <p className="mt-1 text-xs text-red-500">{fieldErrors.confirmPassword}</p>}
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="areas" className="mb-1.5 block text-xs font-semibold text-color-logo">Áreas de interesse</label>
                                <Dropdown
                                    options={areasOptions}
                                    values={areasSelected}
                                    onChange={handleAreaChange}
                                    placeholder="Selecione uma área..."
                                    disabled={areasOptions.length === 0 || areasSelected.length >= 5}
                                />
                                {fieldErrors.areas && <p className="mt-1 text-xs text-red-500">{fieldErrors.areas}</p>}
                            </div>
                        </div>

                        {submitError && (
                            <div className="mt-4">
                                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                                    {submitError}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 w-full cursor-pointer rounded-lg bg-action-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-action-primary/20 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? "Criando conta..." : "Criar conta"}
                        </button>
                    </form>

                    <div className="mt-4 flex justify-center">
                        <button className="text-sm text-text-primary">
                            Já tem uma conta? <a href="/auth/login" className="font-semibold text-color-logo hover:text-action-primary">Entrar</a>
                        </button>
                    </div>
                </section>
            </div >
        </div>
    );
}
