// src/components/pages/AboutPage.js
import React from 'react';
import IntroSection from '../sections/about/IntroSection';
import './AboutPage.css'; 
import SkillsSection from '../sections/about/SkillsSection';
import ExperienceSection from '../sections/about/ExperienceSection';
import HobbiesSection from '../sections/about/HobbiesSection';
import CallToActionHome from '../sections/home/CallToActionHome';
// import './AboutPage.css'; // Jika Anda membuat CSS khusus untuk halaman ini

const AboutPage = () => {
    return (
        <div className="page-container about-page">
            <IntroSection />
            <SkillsSection />
            <ExperienceSection />
            <HobbiesSection />
            <CallToActionHome />
        </div>
    );
};

export default AboutPage;