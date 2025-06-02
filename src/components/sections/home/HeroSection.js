import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { delayChildren: 0.5, staggerChildren: 0.3 }
        }
    };

    const textVariants = {
        hidden: { y: '100%', opacity: 0, scale: 0.8 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 100,
                velocity: 0.5
            }
        }
    };

    return (
        <motion.div
            className="hero-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 className="hero-title" variants={textVariants}>
                MAKING YOUR IMAGINATION COME TRUE IS A VERY FUN THING
            </motion.h1>
        </motion.div>
    );
};

export default HeroSection;