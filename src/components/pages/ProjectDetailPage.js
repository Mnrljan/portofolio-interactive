// src/components/pages/ProjectDetailPage.js
import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectsData from '../../data/projectsData';
import ImageGallery from '../sections/projects/ImageGallery';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProjectDetailPage.css';

const ProjectDetailPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const pageRef = useRef(null);
    const headerRef = useRef(null);
    const mainImageRef = useRef(null);
    const descriptionRef = useRef(null);
    const metaRef = useRef(null);
    const screenshotsRef = useRef(null);

    const project = projectsData.find(p => p.id.toString() === projectId);

    useEffect(() => {
        if (!project) return;

        // Animasi masuk untuk seluruh halaman (ini hanya akan berjalan sekali saat load)
        gsap.fromTo(
            pageRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: 'power2.out' }
        );

        gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.3, // Sedikit delay setelah halaman muncul
                // Tidak ada ScrollTrigger di sini jika Anda ingin selalu terlihat setelah dimuat
                // ATAU jika ingin ScrollTrigger tapi hanya play sekali:
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: 'top 85%', // Pemicu saat masuk viewport
                    toggleActions: 'play none none none', // Hanya play sekali saat masuk
                    // markers: true,
                }
            }
          );

        // Array elemen yang akan dianimasikan on-scroll
        const elementsToAnimateOnScroll = [
            mainImageRef.current,
            descriptionRef.current,
            metaRef.current,
            // screenshotsRef.current,
        ].filter(Boolean); // Filter elemen yang mungkin null

        // Animasi setiap elemen on-scroll (fade in/out, slide in/out)
        elementsToAnimateOnScroll.forEach(el => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 50 }, // Mulai dari tersembunyi dan sedikit di bawah
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el, // Setiap elemen adalah triggernya sendiri
                        start: 'top 85%', // Mulai animasi saat elemen masuk 85% dari viewport
                        end: 'bottom 35%', // Akhiri trigger saat elemen keluar 15% dari viewport
                        toggleActions: 'play reverse play reverse', // <--- KUNCI: Animasi selalu aktif
                        // play: saat masuk dari atas (onEnter)
                        // reverse: saat keluar ke atas (onLeave)
                        // play: saat masuk dari bawah (onEnterBack)
                        // reverse: saat keluar ke bawah (onLeaveBack)
                        // markers: true, // Untuk debugging, hapus di produksi
                    },
                }
            );
        });

        // Cleanup function untuk ScrollTrigger
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, [projectId, project]); // Dependensi projectId dan project

    if (!project) {
        return (
            <div className="project-detail-page-error">
                <h1>Project Not Found</h1>
                <p>The project you are looking for does not exist.</p>
                <button onClick={() => navigate('/projects')} className="button primary">Back to Gallery</button>
            </div>
        );
    }

    return (
        <div className="project-detail-page" ref={pageRef}>

            <div className="project-detail__header" ref={headerRef}>
                <h1 className="project-detail__title">{project.title}</h1>
                <p className="project-detail__subtitle">{project.shortDescription}</p>
            </div>

            <div className="project-detail__main-image-wrapper">
                <img src={project.mainImage || project.thumbnail} alt={project.title} className="project-detail__main-image" ref={mainImageRef} />
            </div>

            <div className="project-detail__content-wrapper">
                <div className="project-detail__description" ref={descriptionRef}>
                    <p>{project.longDescription}</p>
                </div>

                <div className="project-detail__meta" ref={metaRef}>
                    <div className="project-detail__technologies">
                        <h3>Technologies Used:</h3>
                        <div className="tech-tags-container">
                            {project.technologies.map((tech, i) => (
                                <span key={i} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>

                    <div className="project-detail__actions">
                        {project.projectUrl && (
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="button primary">
                                Visit Live Site
                            </a>
                        )}
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="button secondary">
                                View Code
                            </a>
                        )}
                    </div>
                </div>

                {project.screenshots && project.screenshots.length > 0 && (
                    <div className="project-detail__screenshots-section" ref={screenshotsRef}>
                        <h3 className="screenshots-section-title">Project Walkthrough</h3>
                        <ImageGallery images={project.screenshots} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetailPage;