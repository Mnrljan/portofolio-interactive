// src/components/sections/home/ProjectHighlight.js
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectFeatureItem from './ProjectFeatureItem'; // Import komponen item
import './ProjectHighlight.css';

// Data Proyek (diganti namanya dari dummyProjects)
const projectsData = [ // <-- Nama diganti
    {
        id: 1,
        image: '/images/porto-v1-1.png', // Path gambar Anda
        title: 'Portofolio Website',
    },
    {
        id: 2,
        image: '/images/porto-v2-1.png', // Path gambar Anda
        title: 'Interactive Portofolio Website',
    },
    {
        id: 3,
        image: '/images/porto-v3-1.png', // Path gambar Anda
        title: 'Invitation Website',
    },
];

const ProjectHighlight = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    const containerVariants = {
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

    const titleVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
    };

    return (
        <motion.section
            ref={sectionRef}
            className="project-highlight"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.h2
                className="project-title"
                variants={titleVariants}
            >
                FEATURED PROJECTS
            </motion.h2>

            <motion.div
                className="project-features-list"
                variants={{
                    visible: {
                        transition: { staggerChildren: 0.2, delayChildren: 0.5 }
                    }
                }}
            >
                {projectsData.map((project, index) => ( // <-- Menggunakan projectsData
                    <ProjectFeatureItem
                        key={project.id}
                        project={project}
                        index={index}
                    />
                ))}
            </motion.div>
        </motion.section>
    );
};

export default ProjectHighlight;