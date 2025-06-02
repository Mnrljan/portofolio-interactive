// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './components/pages/HomePage';
// ProjectsPage akan diubah, jadi biarkan dulu impornya
import ProjectsPage from './components/pages/ProjectsPage'; // Ini akan jadi halaman Galeri Foto
import ContactPage from './components/pages/ContactPage';
import AboutPage from './components/pages/AboutPage';
import ProjectDetailPage from './components/pages/ProjectDetailPage'; // <--- Impor komponen baru
import MobileSocialFAB from './components/common/MobileSocialFAB';
import './App.css';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.defaults({
      scroller: window,
    });

    window.lenisInstance = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.lenisInstance;
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} /> {/* Ini akan jadi Galeri Foto */}
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} /> {/* <--- Rute Detail Proyek Baru */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
      <MobileSocialFAB />
    </Router>
  );
}

export default App;