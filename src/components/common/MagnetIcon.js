// src/components/common/MagnetIcon.js
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
// Tidak perlu import IconComponent dari sini, karena itu prop
import './MagnetIcon.css'; // Pastikan CSS ini diimpor

// Mengganti imageUrl/textLabel dengan IconComponent
const MagnetIcon = ({ IconComponent, link, size = 32, color = 'currentColor' }) => { // Kembalikan IconComponent prop
    const iconRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMagnetActive, setIsMagnetActive] = useState(false);

    const handleMouseMove = (e) => {
        if (!iconRef.current) return;
        const { left, top, width, height } = iconRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const cursorX = e.clientX;
        const cursorY = e.clientY;

        const offsetX = cursorX - centerX;
        const offsetY = cursorY - centerY;

        const magnetRadius = 50;
        const clampedOffsetX = Math.max(-magnetRadius, Math.min(magnetRadius, offsetX));
        const clampedOffsetY = Math.max(-magnetRadius, Math.min(magnetRadius, offsetY));

        const followStrength = 0.3;

        setMousePosition({
            x: clampedOffsetX * followStrength,
            y: clampedOffsetY * followStrength,
        });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
        setIsMagnetActive(false);
    };

    const handleMouseEnter = () => {
        setIsMagnetActive(true);
    };

    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="magnet-icon-wrapper"
            ref={iconRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            animate={{ x: isMagnetActive ? mousePosition.x : 0, y: isMagnetActive ? mousePosition.y : 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
            {/* Render IconComponent langsung dari props */}
            <IconComponent size={size} color={color} className="social-icon" />
        </motion.a>
    );
};

export default MagnetIcon;