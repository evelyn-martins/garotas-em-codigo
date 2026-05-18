import logo from '../assets/logo.svg';

export default function Header() {

    return (
        <header className="sticky top-0 z-30 w-full border-b border-details-primary/60 bg-white/85 backdrop-blur-md">
            <div className="mx-auto flex h-24 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <a href="#" className="group flex items-center">
                    <img src={logo} alt="Logo Garotas em Codigo" className="h-23 object-contain" />
                    <div className="text-left">
                        <h1 className="text-lg font-semibold leading-tight text-color-logo sm:text-xl">Garotas em Código</h1>
                    </div>
                </a>

                <nav className="hidden md:block" aria-label="Navegacao principal">
                    <ul className="flex items-center gap-8 px-1">
                        <li>
                            <a href="#" className="block px-1 py-3 text-sm font-semibold text-action-primary">Inicio</a>
                        </li>
                        <li>
                            <a href="#" className="block px-1 py-3 text-sm font-semibold text-color-logo transition-colors hover:text-action-primary">Sobre nos</a>
                        </li>
                        <li>
                            <a href="#" className="block px-1 py-3 text-sm font-semibold text-color-logo transition-colors hover:text-action-primary">Contato</a>
                        </li>
                    </ul>
                </nav>

                <div className="flex items-center gap-2">
                    <a href="/auth/login" className="hidden rounded-full border border-details-primary px-5 py-2 text-sm font-semibold text-color-logo transition-colors hover:bg-bg-primary/60 sm:block cursor-pointer">Entrar</a>
                    <a href="/auth" className="rounded-full bg-action-primary px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-action-primary/45 transition-transform duration-300 hover:-translate-y-0.5 hover:brightness-105 sm:px-7 cursor-pointer">Cadastro</a>
                    <button className="inline-flex rounded-full border border-details-primary px-3 py-2 text-sm font-semibold text-color-logo md:hidden" aria-label="Abrir menu">Menu</button>
                </div>
            </div>
        </header>
    );
}