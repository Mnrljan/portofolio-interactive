// src/components/sections/about/ExperienceSection.js
import React, { useRef } from 'react'; // Tambahkan useRef
import { motion, useScroll, useTransform } from 'framer-motion'; // Tambahkan useScroll, useTransform
// ... (import ikon jika ada, import CSS) ...
import './ExperienceSection.css';


const experiencesData = [ /* ... data pengalaman Anda ... */
    {
        company: "CV. Ayunda Putra Perkasa",
        role: "Freelance Web Developer & Designer",
        period: "Desember 2023 - Maret 2024",
        description: "Merancang dan membangun sebuah web katalog buku yang menampilkan koleksi buku secara digital dengan sistem transaksi yang dilakukan di luar platform."
    },
    {
        company: "Radio Republik Indonesia (RRI) Bogor",
        role: "2D Animation Video Developer (Internship)",
        period: "Agustus 2023 - September 2023",
        description: "Bertanggung jawab dalam pengembangan video animasi 2D untuk company profile guna memfasilitasi promosi dan pengenalan lebih lanjut tentang RRI."
    }
];

// --- Sub-komponen TimelineItemContentCard (salin dari atas) ---
const TimelineItemContentCard = ({ experience }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });
    const yPos = useTransform(scrollYProgress, [0, 1], ["-25px", "25px"]);

    return (
        <motion.div
            ref={cardRef}
            className="timeline-item-content" // CSS class yang sudah ada
            style={{ y: yPos }}
        >
            <h3 className="experience-company">{experience.company}</h3>
            <p className="experience-role-period">
                <strong className="experience-role">{experience.role}</strong>
                <span className="experience-period">{experience.period}</span>
            </p>
            <p className="experience-description">{experience.description}</p>
        </motion.div>
    );
};
// --- Akhir Sub-komponen ---


// Varian animasi untuk garis linimasa (sama seperti sebelumnya)
const timelineBarVariants = { /* ... sama seperti sebelumnya ... */
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1], delay: 0.3 } }
};

// Varian animasi untuk setiap kartu item pengalaman (sama seperti sebelumnya)
const timelineItemCardVariants = { /* ... sama seperti sebelumnya ... */
    hidden: { opacity: 0, y: 40 },
    visible: (index) => ({ opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 14, delay: index * 0.25 + 0.6 } }),
};


const ExperienceSection = () => {
    return (
        <motion.section
            id="experience"
            className="experience-section"
            // ... (props animasi section tetap sama) ...
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, duration: 0.5 }}
        >
            <h2 className="experience-main-title">Professional Experience</h2>
            <div className="timeline-layout-container">
                <motion.div
                    className="timeline-bar"
                    variants={timelineBarVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    style={{ originY: 0 }}
                />
                <div className="timeline-items-wrapper">
                    {experiencesData.map((exp, index) => (
                        <motion.div // Ini adalah .timeline-item yang memiliki animasi masuk utama
                            key={index}
                            className="timeline-item"
                            custom={index}
                            variants={timelineItemCardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <div className="timeline-marker"></div>
                            {/* Gunakan sub-komponen di sini */}
                            <TimelineItemContentCard experience={exp} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default ExperienceSection;