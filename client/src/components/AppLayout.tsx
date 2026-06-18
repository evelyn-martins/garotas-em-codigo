import { type ReactNode, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { UserService } from '../services/UserService';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { updateUser } = useAuth();

    useEffect(() => {
        UserService.getMyProfile()
            .then(user => updateUser(user))
            .catch(() => {});
    }, []);

    return (
        <div className="min-h-screen bg-bg-primary/30">
            <Sidebar />
            <div className="pb-16 lg:pb-0 lg:pl-60">
                {children}
            </div>
        </div>
    );
}
