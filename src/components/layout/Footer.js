import React from 'react';
import MagnetIcon from '../common/MagnetIcon';
import { FaInstagram, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import './Footer.css';

const Footer = () => {
    const socialLinks = [
        { id: 'instagram', Icon: FaInstagram, link: 'https://www.instagram.com/mnrl_jn?igsh=MWxhcjFsajFrcHkzYg==', },
        { id: 'whatsapp', Icon: FaWhatsapp, link: 'https://wa.me/+6285779426862', },
        { id: 'gmail', Icon: MdEmail, link: 'mailto:manaruljan@gmail.com', },
        { id: 'linkedin', Icon: FaLinkedinIn, link: 'https://www.linkedin.com/in/manarul-jan-16a96b2a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <p className="footer-copyright">&copy; {new Date().getFullYear()} Manaruljan</p> {/* Tambahkan kelas */}
                <div className="social-links"> {/* Bungkus ikon dalam div */}
                    {socialLinks.map((social) => (
                        <MagnetIcon
                            key={social.id}
                            IconComponent={social.Icon}
                            link={social.link}
                            size={32}
                            color="var(--text-color-light)"
                        />
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;