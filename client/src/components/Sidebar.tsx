import { NavLink, useNavigate } from 'react-router-dom';
import {
    LuHouse,
    LuMessagesSquare,
    LuStar,
    LuMonitor,
    LuBriefcase,
    LuLogOut,
    LuPencil,
    LuUser,
} from 'react-icons/lu';
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

const NAV_ITEMS = [
    { label: 'Início', path: '/comunidade', icon: LuHouse },
    { label: 'Mentoria', path: '/mentoria', icon: LuMessagesSquare },
    { label: 'Referências Femininas', path: '/inspiracoes', icon: LuStar },
    { label: 'Áreas de TI', path: '/areas', icon: LuMonitor },
    { label: 'Oportunidades', path: '/oportunidades', icon: LuBriefcase },
];

export default function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-details-primary/40 bg-white text-left lg:flex">
                <div className="flex flex-col items-center border-b border-details-primary/40 bg-bg-primary/30 px-5 py-3">
                    <img src={logo} alt="Logo" className="h-18 w-18 object-contain" />
                    <span className="text-center text-sm font-semibold leading-tight text-color-logo" style={{ fontFamily: 'var(--heading)' }}>
                        Garotas em Código
                    </span>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-4">
                    <ul className="flex flex-col gap-1">
                        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
                            <li key={path}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                            ? 'bg-bg-primary text-action-primary'
                                            : 'text-text-primary hover:bg-bg-primary/60 hover:text-color-logo'
                                        }`
                                    }
                                >
                                    <Icon className="shrink-0 text-base" />
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="border-t border-details-primary/40 px-4 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(`/perfil/${user?.id}`)}
                            aria-label="Ver meu perfil"
                            className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-lg p-1 text-left transition-colors hover:bg-bg-primary/60"
                        >
                            {user?.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-primary text-xs font-bold text-action-primary">
                                    {user?.name ? getInitials(user.name) : ''}
                                </div>
                            )}
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-semibold text-color-logo">{user?.name}</p>
                                <p className="truncate text-xs text-text-primary">@{user?.username}</p>
                            </div>
                        </button>
                        <button
                            onClick={() => navigate('/editar-perfil')}
                            aria-label="Editar perfil"
                            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-primary transition-colors hover:text-color-logo"
                        >
                            <LuPencil className="text-sm" />
                        </button>
                        <button
                            onClick={logout}
                            aria-label="Sair"
                            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-primary transition-colors hover:text-color-logo"
                        >
                            <LuLogOut className="text-sm" />
                        </button>
                    </div>
                </div>
            </aside>

            <nav className="fixed inset-x-0 bottom-0 z-20 flex h-16 items-center justify-around border-t border-details-primary/40 bg-white lg:hidden">
                {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        aria-label={label}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center px-3 py-2 transition-colors ${isActive ? 'text-action-primary' : 'text-text-primary'
                            }`
                        }
                    >
                        <Icon className="text-xl" />
                    </NavLink>
                ))}
                <NavLink
                    to={`/perfil/${user?.id}`}
                    aria-label="Perfil"
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center px-3 py-2 transition-colors ${isActive ? 'text-action-primary' : 'text-text-primary'
                        }`
                    }
                >
                    <LuUser className="text-xl" />
                </NavLink>
            </nav>
        </>
    );
}
