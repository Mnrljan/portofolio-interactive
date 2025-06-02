import React from 'react';
import HeroSection from '../../components/sections/home/HeroSection';
import AboutShort from '../../components/sections/home/AboutShort';
import ProjectHighlight from '../sections/home/ProjectHighlight';
import CallToActionHome from '../../components/sections/home/CallToActionHome';

const HomePage = () => {
    return (
        <div className="container">
            <HeroSection />
            <AboutShort />
            <ProjectHighlight />
            <CallToActionHome />
        </div>
    );
};

export default HomePage;