// src/components/sections/about/SkillsSection.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import './SkillsSection.css';

const skillsData = {
    "Programming Languages": ["Dart", "CSS", "JavaScript", "PHP"],
    "Frameworks & Libraries": ["React", "Laravel", "Flutter"],
    "Databases": ["MySql"],
    "Design Tools": ["Figma", "Webflow"],
    "Design Expertise": ["UI/UX Principles", "Wireframing", "Prototyping"],
    "Soft Skills": ["Leadership", "Teamwork", "Communication", "Problem Solving"]
};

// Varian animasi untuk kontainer daftar skill (ul) - TETAP SAMA
const listContainerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1, height: 'auto',
        transition: {
            height: { type: 'spring', stiffness: 300, damping: 30, duration: 0.3 },
            opacity: { duration: 0.3, delay: 0.1 },
            staggerChildren: 0.07, delayChildren: 0.15,
        },
    },
    exit: {
        opacity: 0, height: 0,
        transition: {
            height: { type: 'spring', stiffness: 400, damping: 35, duration: 0.3 },
            opacity: { duration: 0.15 },
            staggerChildren: 0.04, staggerDirection: -1,
        },
    },
};

// Varian animasi untuk setiap item skill (li) - TETAP SAMA
const listItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 20 } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
};

// VARIAN BARU: Animasi untuk setiap blok kategori
const categoryBlockVariants = {
    outOfView: { // Keadaan saat di luar viewport
        opacity: 0,
        scale: 0.75, // Mulai dari skala sedikit lebih kecil
        y: 50,       // Mulai dari posisi sedikit lebih bawah
    },
    inView: (index) => ({  // Keadaan saat berada di dalam viewport, menerima index untuk delay
        opacity: 1,
        scale: 1,    // Kembali ke skala normal
        y: 0,        // Kembali ke posisi Y normal
        transition: {
            type: "spring",
            stiffness: 150, // Sesuaikan untuk feel yang pas
            damping: 20,
            delay: index * 0.1, // Jeda staggered berdasarkan urutan kategori
        }
    })
    // Animasi keluar akan otomatis kembali ke state 'outOfView' karena viewport={{ once: false }}
};

const SkillsSection = () => {
    const [openCategoryIndex, setOpenCategoryIndex] = useState(null);

    const toggleCategory = (index) => {
        setOpenCategoryIndex(openCategoryIndex === index ? null : index);
    };

    return (
        <motion.section
            id="skills-expanding"
            className="skills-section-expanding-layout"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }} // Section utama muncul sekali
            transition={{ type: "spring", stiffness: 80, damping: 15, duration: 0.5 }}
        >
            <h2 className="skills-main-title-expanding">My Expertise</h2>
            <div className="categories-container">
                {Object.entries(skillsData).map(([category, skillList], index) => {
                    const isOpen = openCategoryIndex === index;
                    return (
                        <motion.div
                            key={category}
                            className="category-item"
                            layout // Untuk animasi buka-tutup akordeon (tinggi)
                            transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }} // Transisi untuk layout

                            // TAMBAHAN: Animasi masuk/keluar viewport untuk setiap blok kategori
                            custom={index} // Kirim index ke variants untuk delay staggered
                            variants={categoryBlockVariants}
                            initial="outOfView"
                            whileInView="inView"
                            viewport={{
                                once: false, // PENTING: agar animasi bisa berjalan setiap kali masuk/keluar viewport
                                amount: 0.2   // Trigger saat 20% blok kategori terlihat (sesuaikan)
                            }}
                        >
                            <motion.header
                                className="category-header"
                                onClick={() => toggleCategory(index)}
                                initial={false}
                                animate={{ backgroundColor: isOpen ? "var(--accent-color)" : "var(--secondary-color)" }}
                                transition={{ duration: 0.2 }}
                                whileHover={{ scale: 1.02, backgroundColor: "var(--accent-color)" }}
                            >
                                {category}
                                <motion.div
                                    className="category-icon"
                                    animate={{ rotate: isOpen ? 0 : -90 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FaChevronDown />
                                </motion.div>
                            </motion.header>
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.ul
                                        className="skill-list-expanding"
                                        key="content"
                                        variants={listContainerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        style={{ overflow: 'hidden' }}
                                    >
                                        {skillList.map((skill) => (
                                            <motion.li
                                                key={skill}
                                                className="skill-list-item-expanding"
                                                variants={listItemVariants}
                                            >
                                                {skill}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
};

export default SkillsSection;