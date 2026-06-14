import { useState } from "react";
import { LuEye, LuEyeOff, LuMail } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LuMessagesSquare } from "react-icons/lu";
import logo from "../assets/logo.svg";
import type { IUserCreateErros } from "../types/user";
import { ValidateLogin } from "../utils/validations";
import { AuthService } from "../services/AuthService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function Login() {
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [fieldErrors, setFieldErrors] = useState<Partial<IUserCreateErros>>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setSubmitError(null);
        setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFieldErrors({});
        setSubmitError(null);

        const validationErrors = ValidateLogin(formData.email, formData.password);
        if (Object.keys(validationErrors).length > 0) {
            setFieldErrors(validationErrors);
            return;
        }
        setLoading(true);
        try {
            const data = await AuthService.login(formData.email, formData.password);
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

                if (normalizedMessage.includes("senha") || normalizedMessage.includes("password")) {
                    setFieldErrors((prev) => ({ ...prev, password: message }));
                    setLoading(false);
                    return;
                }
                setSubmitError(message);
                setLoading(false);
                return;
            }
            setSubmitError("Erro ao fazer login. Por favor, tente novamente.");
            setLoading(false);
            return;
        }
        setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-details-primary/70 bg-white shadow-2xl shadow-action-primary/20 lg:min-h-155 lg:flex-row">
                <aside className="flex w-full items-center bg-bg-primary/70 px-7 py-10 lg:w-[42%] lg:px-10">
                    <h2 className="sr-only">Tela de login da plataforma Garotas em Codigo</h2>

                    <div className="mx-auto max-w-sm">
                        <div className="mb-9 flex items-center justify-center gap-2 lg:justify-start">
                            <img src={logo} alt="Logo" className="h-26 w-26" />
                            <p className="text-lg font-semibold text-color-logo">Garotas em Codigo</p>
                        </div>

                        <p className="max-w-xs text-center text-sm font-medium leading-6 text-text-primary lg:text-left">
                            Entre para continuar aprendendo, trocando experiências e construindo sua trajetoria na tecnologia.
                        </p>

                        <div className="mt-8 space-y-3">
                            <div className="flex items-center gap-4 rounded-lg border border-white/80 bg-white px-4 py-3 shadow-sm">
                                <LuMessagesSquare className="mx-1 size-6 text-2xl text-action-primary" />
                                <div className="text-left">
                                    <p className="text-sm font-semibold leading-tight text-color-logo">Mentoria</p>
                                    <p className="text-xs font-medium text-text-primary">Conecte-se com guias</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-lg border border-white/80 bg-white px-4 py-3 shadow-sm">
                                <HiOutlineLightBulb className="mx-1 size-6 text-2xl text-action-primary" />
                                <div className="text-left">
                                    <p className="text-sm font-semibold leading-tight text-color-logo">Oportunidades</p>
                                    <p className="text-xs font-medium text-text-primary">Cursos, eventos e bolsas</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 rounded-lg border border-white/80 bg-white px-4 py-3 shadow-sm">
                                <FaRegStar className="mx-1 size-6 text-2xl text-action-primary" />
                                <div className="text-left">
                                    <p className="text-sm font-semibold leading-tight text-color-logo">Referencias</p>
                                    <p className="text-xs font-medium text-text-primary">Mulheres que inspiram na TI</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                <section className="flex flex-1 items-center bg-white px-6 py-8 text-left lg:px-10">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold text-color-logo">Entrar</h1>
                        <p className="mt-1 text-sm font-medium text-text-primary">Acesse sua conta para continuar</p>

                        <form onSubmit={handleSubmit} className="mt-8">
                            <div className="grid gap-4">
                                <div>
                                    <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-color-logo">
                                        E-mail
                                    </label>
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

                                <div>
                                    <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-color-logo">
                                        Senha
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            placeholder="Digite sua senha"
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
                                className="mt-6 w-full cursor-pointer rounded-lg bg-action-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-action-primary/20 transition hover:brightness-95"
                            >
                                {loading ? "Entrando..." : "Entrar"}
                            </button>
                        </form>

                        <div className="mt-4 flex justify-center">
                            <button className="text-sm text-text-primary">
                                Ainda nao tem uma conta?{" "}
                                <a href="/auth" className="font-semibold text-color-logo hover:text-action-primary cursor-pointer">Criar conta</a>
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
