import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './AboutShort.css';

const AboutShort = () => {
    const navigate = useNavigate();

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

    const magnetRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMagnetActive, setIsMagnetActive] = useState(false);

    // Varian animasi kemunculan (tetap sama untuk section container)
    const containerVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 100,
                staggerChildren: 0.2,
                when: "beforeChildren",
            }
        }
    };

    // Varian untuk teks kiri (tetap sama)
    const textItemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    // Gabungan Varian untuk tombol (tetap sama)
    const buttonAnimationVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
        hover: {
            scale: 1.1,
            transition: { duration: 0.3 }
        }
    };

    // Logika efek magnet (tetap sama)
    const handleMouseMove = (e) => {
        if (!magnetRef.current) return;
        const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const cursorX = e.clientX;
        const cursorY = e.clientY;
        const offsetX = cursorX - centerX;
        const offsetY = cursorY - centerY;
        const magnetRadius = 100;
        const clampedOffsetX = Math.max(-magnetRadius, Math.min(magnetRadius, offsetX));
        const clampedOffsetY = Math.max(-magnetRadius, Math.min(magnetRadius, offsetY));
        const followStrength = 0.8;
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

    // Logika Parallax untuk teks kiri (tetap sama)
    const { scrollYProgress: sectionScrollYProgress } = useScroll({ // Ganti nama untuk menghindari konflik
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const textParallaxY = useTransform(sectionScrollYProgress, [0, 1], [-10, 70]);

    // === LOGIKA ROTASI TOMBOL SAAT SCROLL ===
    const { scrollY } = useScroll(); // Memantau scroll dari seluruh window
    const rotation = useTransform(scrollY, [0, 2000], [275, 620]); // Putar 720 derajat (2 putaran) dalam 2000px scroll
    // Anda bisa menyesuaikan [0, 2000] (rentang piksel scroll) dan [0, 720] (rentang derajat rotasi)
    // Jika ingin berputar sebaliknya saat scroll ke atas, ini akan terjadi secara otomatis karena useTransform memetakan nilai.
    // =======================================

    const handleButtonClick = () => {
        navigate('/about'); // Navigasi ke halaman AboutPage
    };

    return (
        <motion.section
            ref={sectionRef}
            className="about-short"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.div className="about-short-left" style={{ y: textParallaxY }}>
                <motion.p className="about-short-text" variants={textItemVariants}>
                    I Am a Fontend and UI/UX Designer Who Loves To Explore New Things
                </motion.p>
            </motion.div>
            <div className="about-short-right">
                <motion.div
                    className="about-button-outer-wrapper"
                    ref={magnetRef}
                    variants={containerVariants}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={handleMouseEnter}
                    animate={{ x: isMagnetActive ? mousePosition.x : 0, y: isMagnetActive ? mousePosition.y : 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 15 }}
                >
                    <motion.button
                        className="about-circular-button"
                        variants={buttonAnimationVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        whileHover="hover"
                        style={{ rotate: rotation }} // <-- Terapkan rotasi di sini
                        onClick={handleButtonClick}
                    >
                        <span className="about-circular-button-text">Klik</span>
                    </motion.button>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default AboutShort;