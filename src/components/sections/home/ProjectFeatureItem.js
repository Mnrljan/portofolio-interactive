// src/components/sections/home/ProjectFeatureItem.js
import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './ProjectHighlight.css';

const ProjectFeatureItem = ({ project, index }) => {
    const navigate = useNavigate();

    const itemRef = useRef(null);
    const isInView = useInView(itemRef, { once: true, amount: 0.3 });

    const itemContainerVariants = {
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

    const columnContentVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "end start"]
    });

    const textParallaxY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const imageParallaxY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
    // --- Opsi: Tambahkan transformasi untuk scale gambar jika ingin efek zoom halus
    // const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.1]); // Contoh: selalu zoom 10%
    // Atau bisa juga sedikit berubah scale saat scroll
    // const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.2, 1.1]);
    // ---------------------------------------------------------------------

    const isImageOnLeft = index % 2 === 0;

    const handleNavigateToDetails = () => {
        navigate(`/projects/${project.id}`);
    };

    return (
        <motion.div
            ref={itemRef}
            className={`project-feature-container ${isImageOnLeft ? 'image-left' : 'image-right'}`}
            variants={itemContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.div
                className="project-column project-description-column"
                style={{ y: textParallaxY }}
            >
                <motion.h3 className="project-card-title" variants={columnContentVariants}>{project.title}</motion.h3>
                <motion.p className="project-card-description" variants={columnContentVariants}>{project.description}</motion.p>
                <motion.div className="project-card-tech" variants={columnContentVariants}>
                    {project.tech && project.tech.map((tech, i) => (
                        <span key={i} className="tech-item">{tech}</span>
                    ))}
                </motion.div>
                <motion.a
                    as="button"
                    onClick={handleNavigateToDetails}
                    className="button primary"
                    variants={columnContentVariants}
                    whileHover={{
                        scale: 1.05, // Sedikit membesar
                        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                        backgroundColor: "var(--background-light)",
                        color: "var(--background-dark)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    Lihat Proyek
                </motion.a>
            </motion.div>

            <motion.div className="project-column project-image-column">
                <div className="project-image-frame">
                    <motion.img
                        src={project.mainImage || project.thumbnail || project.image}
                        alt={project.title}
                        className="project-feature-image"
                        variants={columnContentVariants}
                        style={{
                            y: imageParallaxY,
                            scale: 1.2 // <--- KUNCI: Tambahkan scale ini untuk selalu zoom in 10%
                        }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectFeatureItem;