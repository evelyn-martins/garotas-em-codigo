import { useState, useRef, useEffect } from "react";
import { LuChevronDown } from "react-icons/lu";

export interface DropdownOption {
    value: string;
    label: string;
}

interface DropdownProps {
    options: DropdownOption[];
    values: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
    variant?: "light" | "dark";
}

export default function Dropdown({
    options,
    values,
    onChange,
    placeholder = "Selecione uma opção",
    disabled = false,
    variant = "light",
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === values[0]);
    const selectedOptions = options.filter((opt) => values.includes(opt.value));
    const availableOptions = options.filter((opt) => !values.includes(opt.value));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
        onChange([optionValue]);
        setIsOpen(false);
    };

    const isDark = variant === "dark";

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition ${disabled
                    ? isDark
                        ? "cursor-not-allowed border-white/10 bg-white/5 text-white/35"
                        : "cursor-not-allowed border-details-primary/50 bg-gray-100 text-text-primary/50"
                    : isDark
                        ? "cursor-pointer border-white/20 bg-transparent text-white hover:border-action-primary"
                        : "cursor-pointer border-details-primary bg-white hover:border-action-primary"
                    } ${isOpen ? "border-action-primary" : isDark ? "border-white/20" : "border-details-primary"}`}
            >
                <span className={selectedOption ? isDark ? "font-medium text-white" : "font-medium text-color-logo" : isDark ? "text-white/45" : "text-text-primary"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <LuChevronDown
                    className={`${isDark ? "text-white/55" : "text-action-primary"} transition ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div className={`absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded-lg border shadow-lg ${isDark
                    ? "border-white/15 bg-[#2f2f2b] shadow-black/30"
                    : "border-details-primary/70 bg-white shadow-action-primary/10"
                    }`}>
                    <ul className="max-h-60 overflow-y-auto py-1">
                        {availableOptions.map((option) => (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full px-4 py-2 text-left text-sm font-medium transition ${isDark
                                        ? "text-white/85 hover:bg-bg-primary hover:text-color-logo"
                                        : "text-text-primary hover:bg-bg-primary/50"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                        {availableOptions.length === 0 && (
                            <li className={`px-4 py-3 text-sm ${isDark ? "text-white/55" : "text-text-primary/70"}`}>
                                Nenhuma opção disponível
                            </li>
                        )}
                    </ul>
                </div>
            )}

            {selectedOptions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange(values.filter(v => v !== option.value))}
                            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition hover:brightness-95 ${isDark
                                ? "border border-action-primary/40 bg-bg-primary text-color-logo"
                                : "bg-bg-primary text-color-logo"
                                }`}
                        >
                            {option.label} ×
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
