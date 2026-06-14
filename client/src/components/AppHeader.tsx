import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.svg';

function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();
}

export default function AppHeader() {
    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-details-primary/40 bg-white px-6 py-3">
            <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-18 w-18 object-contain" />
                <span className="font-semibold text-color-logo" style={{ fontFamily: 'var(--heading)' }}>
                    Garotas em Código
                </span>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-primary text-xs font-bold text-action-primary">
                    {user ? getInitials(user.name) : ''}
                </div>
                <button
                    onClick={logout}
                    className="cursor-pointer text-xs font-medium text-text-primary transition-colors hover:text-color-logo"
                >
                    Sair
                </button>
            </div>
        </nav>
    );
}
