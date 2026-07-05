'use client';
import React from 'react';
import { THEME_COLORS } from '../hooks/useWeb3'; // Importamos la constante de colores

interface PortalButtonProps {
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

const PortalButton: React.FC<PortalButtonProps> = ({ children, onClick, disabled, className = '' }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`
            w-full py-4 px-6 text-2xl font-black rounded-xl uppercase transition-all duration-200
            shadow-[0_8px_0_0_rgba(0,0,0,0.5)] active:shadow-none active:translate-y-2
            hover:shadow-[0_12px_0_0_rgba(0,0,0,0.7)]
            ${disabled
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed shadow-[0_4px_0_0_rgba(0,0,0,0.3)]'
                : `bg-${THEME_COLORS.PORTAL_GREEN} text-white hover:bg-lime-300 border-3 border-yellow-300`
            }
            ${className}
        `}
    >
        {children}
    </button>
);

export default PortalButton;