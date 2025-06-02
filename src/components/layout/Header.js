import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const overlayVariants = {
        initial: { y: '100%' },
        animate: { y: 0, transition: { duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] } },
        exit: { y: '100%', transition: { duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] } },
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <Link to="/" className="logo">
                    <img src="/logo.png" alt="Manaruljan Portofolio Logo" className="logo-image" /></Link>
                <button className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation">
                    <motion.span className="bar" animate={{ rotate: isMenuOpen ? 45 : 0, translateY: isMenuOpen ? 8 : 0 }} />
                    <motion.span className="bar" animate={{ opacity: isMenuOpen ? 0 : 1 }} />
                    <motion.span className="bar" animate={{ rotate: isMenuOpen ? -45 : 0, translateY: isMenuOpen ? -8 : 0 }} />
                </button>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="overlay-menu"
                        variants={overlayVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <nav className="overlay-nav">
                            <ul className="overlay-list">
                                <li className="overlay-item"><Link to="/" className="overlay-link" onClick={toggleMenu}>Home</Link></li>
                                <li className="overlay-item"><Link to="/about" className="overlay-link" onClick={toggleMenu}>About Me</Link></li>
                                <li className="overlay-item"><Link to="/projects" className="overlay-link" onClick={toggleMenu}>Gallery</Link></li>
                                <li className="overlay-item"><Link to="/contact" className="overlay-link" onClick={toggleMenu}>Contacts</Link></li>
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;