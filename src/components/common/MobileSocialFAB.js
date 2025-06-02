// src/components/common/MobileSocialFAB.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes, FaInstagram, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import MagnetIcon from './MagnetIcon';
import './MobileSocialFAB.css';

const MobileSocialFAB = () => {
    const [isOpen, setIsOpen] = useState(false);

    const socialLinks = [
        { id: 'instagram', Icon: FaInstagram, link: 'https://www.instagram.com/akun_instagram_anda' },
        { id: 'whatsapp', Icon: FaWhatsapp, link: 'https://wa.me/nomor_telepon_anda' },
        { id: 'gmail', Icon: MdEmail, link: 'mailto:email_anda@gmail.com' },
        { id: 'linkedin', Icon: FaLinkedinIn, link: 'https://www.linkedin.com/in/profil_linkedin_anda' },
    ];

    const fabIconVariants = {
        open: { rotate: 45 },
        closed: { rotate: 0 },
    };

    const socialListVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                staggerChildren: 0.1,
                delayChildren: 0.1,
            }
        },
        closed: {
            opacity: 0,
            y: 50,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
                when: "afterChildren",
                duration: 0.2
            }
        },
    };

    const socialItemVariants = {
        open: { opacity: 1, y: 0, scale: 1 },
        closed: { opacity: 0, y: 20, scale: 0.8 },
    };

    return (
        <AnimatePresence>
            <div className="mobile-fab-wrapper">
                {isOpen && (
                    <motion.div
                        className="mobile-social-icons-list"
                        variants={socialListVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        {socialLinks.map((social) => (
                            <motion.div key={social.id} variants={socialItemVariants}>
                                <MagnetIcon
                                    IconComponent={social.Icon}
                                    link={social.link}
                                    size={28}
                                    color="var(--text-color-dark)" // <--- UBAH WARNA IKON SOSMED MENJADI GELAP
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                <motion.button
                    className="mobile-fab-button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle social links"
                    initial="closed"
                    animate="open"
                >
                    <motion.span variants={fabIconVariants} animate={isOpen ? "open" : "closed"}>
                        {/* === UBAH WARNA IKON FAB UTAMA MENJADI GELAP === */}
                        {isOpen ? <FaTimes size={32} color="var(--text-color-dark)" /> : <FaPlus size={32} color="var(--text-color-dark)" />}
                    </motion.span>
                </motion.button>
            </div>
        </AnimatePresence>
    );
};

export default MobileSocialFAB;