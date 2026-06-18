import { LuTag, LuPencil } from 'react-icons/lu';
import type { IUserProfile } from '../types/user';

function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();
}

interface ProfileHeaderProps {
    profile: IUserProfile;
    isOwnProfile: boolean;
    onEdit: () => void;
}

export default function ProfileHeader({ profile, isOwnProfile, onEdit }: ProfileHeaderProps) {
    return (
        <section className="rounded-2xl border border-details-primary/40 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-action-primary/15 ring-4 ring-action-primary/10">
                    {profile.image ? (
                        <img
                            src={profile.image}
                            alt={profile.name}
                            className="h-full w-full rounded-full object-cover"
                        />
                    ) : (
                        <span className="text-2xl font-bold text-action-primary">
                            {getInitials(profile.name)}
                        </span>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                            <h1 className="text-xl font-bold text-color-logo">{profile.name}</h1>
                            <p className="mt-0.5 text-sm text-text-primary">@{profile.username}</p>
                        </div>

                        {isOwnProfile && (
                            <button
                                onClick={onEdit}
                                className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-details-primary px-4 py-2 text-xs font-semibold text-text-primary transition-colors hover:border-action-primary hover:text-action-primary"
                            >
                                <LuPencil className="text-sm" />
                                Editar perfil
                            </button>
                        )}
                    </div>

                    {profile.description && (
                        <p className="mt-3 text-sm leading-relaxed text-text-primary wrap-break-word">
                            {profile.description}
                        </p>
                    )}

                    {profile.areas && profile.areas.length > 0 && (
                        <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:justify-start">
                            {profile.areas.map(({ area }) => (
                                <span
                                    key={area.id}
                                    className="flex items-center gap-1 rounded-full bg-bg-primary px-2.5 py-0.5 text-xs font-medium text-color-logo"
                                >
                                    <LuTag className="text-xs" />
                                    {area.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
