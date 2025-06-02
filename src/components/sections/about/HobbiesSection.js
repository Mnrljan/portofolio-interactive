// src/components/sections/home/HobbiesSection.js
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring} from 'framer-motion';
import './HobbiesSection.css';

const hobbiesData = [
    { name: "Guitar",  image: "/images/guitar.jpeg" },
    { name: "Workout",  image: "/images/workout.jpeg" },
    { name: "Coding",  image: "/images/coding.jpg" },
    { name: "Her", image: "/images/her.jpeg" },
    { name: "Game",  image: "/images/game.jpg" }
];

const mapRange = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

const HobbiesSection = () => {
    const containerRef = useRef(null);
    const trackOffsetX = useMotionValue(0);
    const springTrackX = useSpring(trackOffsetX, {
        stiffness: 120, damping: 10, mass: 0.9,
    });
    const CARD_PLUS_GAP_WIDTH = 505; // <--- SESUAIKAN NILAI INI! (Lebar kartu 480px + gap 25px)

    const handleMouseMove = (event) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const containerWidth = rect.width;
            const normalizedMouseX = (mouseX / containerWidth) * 2 - 1;

            // Pastikan perhitungannya mencakup semua kartu agar bisa discroll penuh
            const totalTrackWidth = hobbiesData.length * CARD_PLUS_GAP_WIDTH;
            const viewportWidth = rect.width;
            const maxScrollableWidth = Math.max(0, totalTrackWidth - viewportWidth); // Lebar yang bisa discroll

            let targetX = 0;
            const deadZone = 0.05;

            if (normalizedMouseX < -deadZone) {
                targetX = mapRange(normalizedMouseX, -1, -deadZone, maxScrollableWidth / 2, 0); // Ke kanan
            } else if (normalizedMouseX > deadZone) {
                targetX = mapRange(normalizedMouseX, deadZone, 1, 0, -maxScrollableWidth / 2); // Ke kiri
            }
            trackOffsetX.set(targetX);
        }
    };

    const handleMouseLeave = () => {
        trackOffsetX.set(0);
    };

    return (
        <motion.section
            id="hobbies-interactive"
            className="hobbies-section-interactive-wrapper"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
            <h2 className="hobbies-main-title-interactive">My Interests</h2>
            <div
                ref={containerRef}
                className="hobbies-interactive-area"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    className="hobbies-horizontal-track-mouse"
                    style={{ x: springTrackX }}
                    drag="x"
                    dragConstraints={containerRef}
                >
                    {hobbiesData.map((hobby, index) => (
                        <motion.div
                            className="hobby-card-mouse"
                            key={index}
                            whileHover={{ scale: 1.08, y: -5, boxShadow: "0px 12px 30px rgba(0,0,0,0.12)" }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            {/* Gambar latar belakang */}
                            <img src={hobby.image} alt={hobby.name} className="hobby-card-bg-image" />
                            {/* Overlay redup */}
                            <div className="hobby-card-overlay"></div>

                            {/* Konten (ikon & teks) di atas gambar */}
                            <div className="hobby-card-content">
                                <div className="hobby-card-icon-mouse">{hobby.icon}</div>
                                <h3 className="hobby-card-name-mouse">{hobby.name}</h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default HobbiesSection;