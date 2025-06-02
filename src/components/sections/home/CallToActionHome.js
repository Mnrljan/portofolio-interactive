import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './CallToActionHome.css';

const CallToActionHome = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.5 });

    const buttonRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMagnetActive, setIsMagnetActive] = useState(false);

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const cursorX = e.clientX;
        const cursorY = e.clientY;
        const offsetX = cursorX - centerX;
        const offsetY = cursorY - centerY;
        const magnetRadius = 80;
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

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const textParallaxY = useTransform(scrollYProgress, [0, 1], [-110, 100]);

    const sectionVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 100,
                staggerChildren: 0.1,
                when: "beforeChildren",
            }
        }
    };

    const itemVariants = { // Varian untuk teks
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    const buttonHoverVariants = { // Varian untuk efek hover
        hover: {
            scale: 1.1,
            transition: { duration: 0.3 }
        }
    };

    // === VARIAN BARU GABUNGAN UNTUK TOMBOL ===
    const ctaButtonAnimationVariants = {
        hidden: itemVariants.hidden, // Mengambil state hidden dari itemVariants
        visible: itemVariants.visible, // Mengambil state visible dari itemVariants
        hover: buttonHoverVariants.hover // Mengambil state hover dari buttonHoverVariants
    };
    // =======================================

    const { scrollY } = useScroll();
    const rotation = useTransform(scrollY, [0, 2000], [0, 720]);

    const handleButtonClick = () => {
        navigate('/contact'); // Navigasi ke halaman AboutPage
    };

    return (
        <motion.section
            ref={sectionRef}
            className="cta-home"
            variants={sectionVariants} // Untuk kemunculan section keseluruhan
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className="cta-content">
                <motion.h2
                    className="cta-title"
                    variants={itemVariants} // Item ini adalah direct child yang di-stagger
                    style={{ y: textParallaxY }}
                >
                    LET'S CREATE YOUR IMAGINATION
                </motion.h2>

                {/* Outer wrapper untuk parallax (jika ada) dan item variants */}
                <motion.div
                    className="cta-button-outer-wrapper"
                    variants={itemVariants} // <-- Item ini adalah direct child yang di-stagger
                // style={{ y: buttonParallaxY }} // Jika ingin outer wrapper punya parallax
                >
                    <motion.div
                        className="cta-button-magnet-wrapper"
                        ref={buttonRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={handleMouseEnter}
                    // Ini adalah ANIMASI MAGNET. Ini harus selalu ada.
                    // animate={{ x: isMagnetActive ? mousePosition.x : 0, y: isMagnetActive ? mousePosition.y : 0 }}
                    // transition={{ type: "spring", stiffness: 120, damping: 15 }} // Transisi untuk magnet

                    // === Perbaikan di sini: Satukan semua animasi ke dalam satu animate prop pada motion.button ===
                    // Kita akan memindahkan magnet animation ke motion.button
                    // Biarkan wrapper ini sederhana dan hanya untuk grouping/positioning
                    >
                        <motion.button
                            className="cta-main-button"
                            variants={ctaButtonAnimationVariants} // Varian untuk hover (dan hidden/visible)
                            whileHover="hover" // Untuk memicu state hover
                            style={{ rotate: rotation }} // Untuk rotasi scroll
                            // Hapus ref, onMouseMove, onMouseLeave, onMouseEnter dari sini
                            // Animate prop akan mengurus semua
                            animate={
                                isInView // Jika section sudah visible (berarti siap animasi masuk)
                                    ? {
                                        // Properti dari state 'visible' (dari ctaButtonAnimationVariants.visible)
                                        opacity: 1,
                                        // Properti dari efek magnet (berdasarkan isMagnetActive)
                                        x: isMagnetActive ? mousePosition.x : 0,
                                        y: isMagnetActive ? mousePosition.y : 0,
                                    }
                                    : ctaButtonAnimationVariants.hidden // Jika belum visible, tetap di state hidden
                            }
                            // Transisi untuk animate prop
                            transition={{
                                type: "spring",
                                stiffness: 120, // Kekakuan untuk magnet
                                damping: 15,    // Redaman untuk magnet
                                opacity: { duration: 0.5 }, // Transisi opacity untuk kemunculan awal
                                y: { type: "spring", stiffness: 100, damping: 15 } // Transisi y untuk kemunculan awal
                            }}
                            onClick={handleButtonClick}
                        >
                            <span className="cta-main-button-text">LET'S</span>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};
export default CallToActionHome;