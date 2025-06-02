// src/components/pages/ProjectsPage.js
import React, { useRef, useEffect } from 'react';
import personalPhotosData from '../../data/personalPhotosData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Masonry from 'react-masonry-css';
import './ProjectsPage.css';

const ProjectsPage = () => {
    const pageRef = useRef(null);
    const galleryContainerRef = useRef(null);

    useEffect(() => {
        // Animasi masuk untuk judul dan subtitle halaman
        gsap.fromTo(
            '.projects-page__title, .projects-page__subtitle',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.2 }
        );

        if (galleryContainerRef.current) {
            gsap.fromTo(
                gsap.utils.toArray('.gallery-item'),
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: galleryContainerRef.current,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none none',
                        // markers: true,
                    },
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, []);

    // === MODIFIKASI BREAKPOINT COLS INI ===
    const breakpointColumnsObj = {
        default: 4, // Default: 4 kolom (lebar > 1100px)
        1100: 3,    // Di bawah 1100px: 3 kolom
        700: 2,     // Di bawah 700px: 2 kolom
        // 500: 1      // Hapus atau ubah ini. Jika Anda menghapusnya, akan tetap 2 kolom di bawah 700px
        // Untuk memastikan selalu 2 kolom di mobile:
        // Hapus breakpoint 500 dan biarkan default 2 kolom untuk lebar di bawah 700px
        // Atau:
        500: 2,     // Di bawah 500px, tetap 2 kolom (jika mau)
        400: 2,     // Bahkan di bawah 400px, tetap 2 kolom
        // Anda bisa menambahkan breakpoint lebih kecil jika Anda punya device yang lebih sempit
        // Contoh untuk 2 kolom di semua mobile:
        // default: 4,
        // 1100: 3,
        // 700: 2,
        // 300: 2 // Bahkan di 300px, tetap 2 kolom
    };
    // ======================================

    return (
        <div className="projects-page" ref={pageRef}>
            <h1 className="projects-page__title">My Personal Gallery</h1>
            <p className="projects-page__subtitle">A glimpse into my life, hobbies, and moments beyond code.</p>

            <div className="photo-gallery-wrapper" ref={galleryContainerRef}>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {personalPhotosData.map((photo, index) => (
                        <div key={index} className="gallery-item">
                            <img src={photo.src} alt={photo.alt} className="gallery-item__img" />
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    );
};

export default ProjectsPage;