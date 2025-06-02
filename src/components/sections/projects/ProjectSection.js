// src/sections/projects/ProjectSection.js (digunakan di HomePage)
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- Impor useNavigate
import { gsap } from 'gsap';
// ImageGallery tidak lagi diimpor di sini karena hanya untuk halaman detail
import './ProjectSection.css';

const ProjectSection = ({ project, index }) => {
    const navigate = useNavigate(); // <--- Inisialisasi useNavigate

    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);
    const isEven = index % 2 === 0;

    useEffect(() => {
        // Animasi Muncul Saat Masuk Viewport (Fade & Slide)
        gsap.fromTo(
            [imageRef.current, contentRef.current],
            {
                opacity: 0,
                x: isEven ? -100 : 100,
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play reverse play reverse',
                },
            }
        );

        // Efek Parallax + Zoom pada Gambar
        gsap.to(imageRef.current, {
            yPercent: 10,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });

    }, [isEven]);

    const handleViewProjectDetails = () => { // <--- Fungsi baru untuk navigasi
        navigate(`/projects/${project.id}`); // Navigasi ke halaman detail proyek spesifik
    };

    return (
        <section className={`project-section ${isEven ? 'project-section--left-image' : 'project-section--right-image'}`} ref={sectionRef}>
            <div className="project-section__image-wrapper">
                <img src={project.mainImage || project.thumbnail} alt={project.title} className="project-section__image" ref={imageRef} />
            </div>
            <div className="project-section__content" ref={contentRef}>
                <h2 className="project-section__title">{project.title}</h2>
                <p className="project-section__description">{project.shortDescription}</p>

                {/* Bagian screenshots-preview dihapus dari sini, karena sudah di halaman detail */}
                {/* <div className="project-section__screenshots-preview">
          <h4 className="project-section__screenshots-title">Key Screens</h4>
          <ImageGallery images={project.screenshots} />
        </div> */}

                <div className="project-section__technologies">
                    {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                    ))}
                </div>
                <div className="project-section__actions">
                    {/* Tombol Visit Site/View Code bisa tetap ada jika ingin langsung ke live/repo */}
                    {project.projectUrl && (
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="button primary">
                            Visit Site
                        </a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="button secondary">
                            View Code
                        </a>
                    )}
                    {/* <--- Tambahkan tombol Lihat Detail Proyek di sini ---> */}
                    <button onClick={handleViewProjectDetails} className="button primary">
                        View Details
                    </button>
                    {/* <--- Akhir tombol Lihat Detail Proyek ---> */}
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;