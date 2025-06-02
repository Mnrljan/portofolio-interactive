import React, { useEffect, useRef } from 'react';
import './ContactPage.css'; // File CSS baru untuk styling halaman kontak
import { gsap } from 'gsap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';

const ContactPageV2 = () => {
    const pageRef = useRef(null);
    const titleRef = useRef(null);
    const introTextRef = useRef(null);
    const infoSectionRef = useRef(null);
    const formSectionRef = useRef(null);

    useEffect(() => {
        // Animasi muncul untuk judul dan intro text
        gsap.fromTo(
            [titleRef.current, introTextRef.current],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 0.2 }
        );

        // Animasi untuk Contact Info & Social Links
        gsap.fromTo(
            infoSectionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.5,
                scrollTrigger: {
                    trigger: infoSectionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play reverse play reverse',
                },
            }
        );

        // Animasi untuk Contact Form
        if (formSectionRef.current) {
            gsap.fromTo(
                formSectionRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    delay: 0.7,
                    scrollTrigger: {
                        trigger: formSectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play reverse play reverse',
                    },
                }
            );
        }
    }, []);

    return (
        <div className="contact-page-v2" ref={pageRef}>
            <h1 className="contact-page-v2__title" ref={titleRef}>Let's Connect</h1>
            <p className="contact-page-v2__intro-text" ref={introTextRef}>
                I'm always excited to discuss new projects, creative ideas, or opportunities to be part of your visions.
                Reach out and let's make something amazing together!
            </p>

            <section className="contact-page-v2__info-section" ref={infoSectionRef}>
                <div className="contact-page-v2__contact-card">
                    <FontAwesomeIcon icon={faEnvelope} className="contact-page-v2__icon" />
                    <h3 className="contact-page-v2__card-title">Email Me</h3>
                    <a href="mailto:manarujan@gmail.com" className="contact-page-v2__link">manarujan@gmail.com</a>
                </div>

                <div className="contact-page-v2__contact-card">
                    <FontAwesomeIcon icon={faPhoneAlt} className="contact-page-v2__icon" />
                    <h3 className="contact-page-v2__card-title">Call Me</h3>
                    <span className="contact-page-v2__text">+62 857-7942-6862</span>
                </div>

                <div className="contact-page-v2__contact-card">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-page-v2__icon" />
                    <h3 className="contact-page-v2__card-title">My Location</h3>
                    <span className="contact-page-v2__text">Bogor, Indonesia</span>
                </div>
            </section>

            <section className="contact-page-v2__social-section">
                <h2 className="contact-page-v2__social-title">Find Me On Social Media</h2>
                <div className="contact-page-v2__social-links">
                    <a href="https://www.linkedin.com/in/manarul-jan-16a96b2a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="contact-page-v2__social-link">
                        <FontAwesomeIcon icon={faLinkedin} className="contact-page-v2__social-icon" />
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://github.com/Mnrljan" target="_blank" rel="noopener noreferrer" className="contact-page-v2__social-link">
                        <FontAwesomeIcon icon={faGithub} className="contact-page-v2__social-icon" />
                        <span>GitHub</span>
                    </a>
                    <a href="https://www.instagram.com/mnrl_jn?igsh=MWxhcjFsajFrcHkzYg==" target="_blank" rel="noopener noreferrer" className="contact-page-v2__social-link">
                        <FontAwesomeIcon icon={faInstagram} className="contact-page-v2__social-icon" />
                        <span>Instagram</span>
                    </a>
                    {/* Tambahkan link sosial lainnya jika ada */}
                </div>
            </section>
        </div>
    );
};

export default ContactPageV2;