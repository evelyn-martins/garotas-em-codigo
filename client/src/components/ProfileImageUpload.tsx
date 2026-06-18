import { useRef } from 'react';
import { LuCamera } from 'react-icons/lu';

interface ProfileImageUploadProps {
    currentImage: string | null;
    name: string;
    preview: string | null;
    onImageChange: (file: File, previewUrl: string) => void;
}

function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();
}

export default function ProfileImageUpload({ currentImage, name, preview, onImageChange }: ProfileImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const displayImage = preview || currentImage;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        onImageChange(file, url);
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="group relative h-24 w-24 cursor-pointer overflow-hidden rounded-full"
                aria-label="Alterar foto de perfil"
            >
                {displayImage ? (
                    <img
                        src={displayImage}
                        alt={name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-bg-primary text-xl font-bold text-action-primary">
                        {name ? getInitials(name) : ''}
                    </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <LuCamera className="text-2xl text-white" />
                </div>
            </button>
            <p className="text-xs text-text-primary">Clique para alterar a foto</p>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
}
