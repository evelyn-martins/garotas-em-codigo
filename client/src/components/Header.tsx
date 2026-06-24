import { useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';
import logo from '../assets/logo.svg';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 w-full border-b border-details-primary/60 bg-white/85 backdrop-blur-md">
            <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <a href="/" className="flex items-center">
                    <img src={logo} alt="Logo Garotas em Codigo" className="h-16 object-contain sm:h-20" />
                    <span className="hidden text-lg font-semibold text-color-logo sm:block">Garotas em Código</span>
                </a>

                <nav className="hidden md:block" aria-label="Navegação principal">
                    <ul className="flex items-center gap-8 px-1">
                        <li>
                            <a href="/" className="block px-1 py-3 text-sm font-semibold text-action-primary">Início</a>
                        </li>
                        <li>
                            <a href="/sobre" className="block px-1 py-3 text-sm font-semibold text-color-logo transition-colors hover:text-action-primary">Sobre nós</a>
                        </li>
                        <li>
                            <a href="/contato" className="block px-1 py-3 text-sm font-semibold text-color-logo transition-colors hover:text-action-primary">Contato</a>
                        </li>
                    </ul>
                </nav>

                <div className="flex items-center gap-2">
                    <a href="/auth/login" className="hidden rounded-full border border-details-primary px-5 py-2 text-sm font-semibold text-color-logo transition-colors hover:bg-bg-primary/60 sm:block">Entrar</a>
                    <a href="/auth" className="rounded-full bg-action-primary px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-action-primary/45 transition-all hover:-translate-y-0.5 hover:brightness-105 sm:px-7">Cadastro</a>
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-details-primary text-color-logo transition-colors hover:bg-bg-primary md:hidden"
                        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                    >
                        {menuOpen ? <LuX className="text-base" /> : <LuMenu className="text-base" />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="border-t border-details-primary/40 bg-white/95 backdrop-blur-md md:hidden">
                    <div className="mx-auto max-w-6xl px-4 py-3">
                        <nav aria-label="Menu mobile">
                            <ul className="flex flex-col">
                                <li>
                                    <a
                                        href="/"
                                        onClick={() => setMenuOpen(false)}
                                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-action-primary transition-colors hover:bg-bg-primary"
                                    >
                                        Início
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/sobre"
                                        onClick={() => setMenuOpen(false)}
                                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-color-logo transition-colors hover:bg-bg-primary"
                                    >
                                        Sobre nós
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        onClick={() => setMenuOpen(false)}
                                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-color-logo transition-colors hover:bg-bg-primary"
                                    >
                                        Contato
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <div className="mt-2 border-t border-details-primary/40 pt-3 pb-1">
                            <a
                                href="/auth/login"
                                className="block rounded-xl px-4 py-3 text-sm font-semibold text-color-logo transition-colors hover:bg-bg-primary"
                            >
                                Entrar
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
