import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion'; // <-- 1. Impor 'motion' dari framer-motion
import profileImage from '../../../assets/images/foto2.jpeg'; // Path gambar Anda
import './IntroSection.css';

const IntroSection = () => {
    const greeting = "Hello everyone,";
    const nameAndRole = "My name is Manaruljan, and I am a Frontend Developer & UI/UX Designer.";
    const backgroundStory = `
    I am a Computer Science graduate from Pakuan University. During my studies, 
    I participated in several campus organizations, including the Student Executive 
    Board (BEM) and student associations. These experiences provided me with 
    opportunities to develop crucial soft skills such as leadership, teamwork, 
    problem-solving, and public speaking.
  `;
    const professionalExperience = `
    In my professional experience, I worked as a freelancer at CV. Ayunda Putra Perkasa 
    from 2023 to 2024, where I designed and developed a book catalog website. 
    Additionally, from August to September 2023, I completed an internship program 
    at Radio Republik Indonesia (RRI) Bogor.
  `;

    const imageToParallaxRef = useRef(null);
    const parallaxFactor = 0.1; // Faktor parallax Anda

    const handleScrollEffect = useCallback((currentScrollY) => {
        const imageElement = imageToParallaxRef.current;
        if (!imageElement) return;
        // Logika parallax Anda yang sudah ada
        imageElement.style.transform = `scale(1) translateY(${currentScrollY * parallaxFactor}px)`;
    }, [parallaxFactor]);

    useEffect(() => {
        const imageElement = imageToParallaxRef.current;
        if (!imageElement) return;

        const lenis = window.lenisInstance;

        if (lenis) {
            const onLenisScroll = (e) => {
                handleScrollEffect(e.scroll);
            };
            lenis.on('scroll', onLenisScroll);
            if (typeof lenis.scroll === 'number') {
                handleScrollEffect(lenis.scroll);
            }
            return () => {
                if (typeof lenis.off === 'function') {
                    lenis.off('scroll', onLenisScroll);
                }
            };
        } else {
            const onWindowScroll = () => {
                handleScrollEffect(window.scrollY);
            };
            window.addEventListener('scroll', onWindowScroll);
            handleScrollEffect(window.scrollY);
            return () => {
                window.removeEventListener('scroll', onWindowScroll);
            };
        }
    }, [handleScrollEffect]);

    return (
        // 2. Ubah <section> menjadi <motion.section> dan tambahkan properti animasi
        <motion.section
            id="about-intro"
            className="intro-section"
            initial={{ opacity: 0, y: 70 }} // Awal: transparan, 70px di bawah
            whileInView={{ opacity: 1, y: 0 }} // Akhir: terlihat, posisi Y normal
            viewport={{ once: true, amount: 0.2 }} // Picu sekali saat 20% terlihat
            transition={{
                type: "spring",    // Tipe animasi pegas untuk efek memantul
                stiffness: 300,     // Kekakuan pegas
                damping: 15,        // Redaman (kontrol pantulan)
                duration: 0.5,      // Perkiraan durasi (spring lebih ke fisika)
            }}
        >
            <div className="intro-content">
                <p>{greeting}</p>
                <p><strong>{nameAndRole}</strong></p>
                <p>{backgroundStory}</p>
                <p>{professionalExperience}</p>
            </div>
            <div className="profile-image-container">
                <div className="profile-image-parallax-window">
                    <img
                        ref={imageToParallaxRef}
                        src={profileImage}
                        alt="Manaruljan - Frontend Developer & UI/UX Designer"
                        className="profile-image profile-image-parallax-content"
                    />
                </div>
            </div>
        </motion.section>
    );
};

export default IntroSection;