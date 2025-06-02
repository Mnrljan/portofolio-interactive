// src/sections/projects/ImageGallery.js
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ImageGallery.css'; // CSS untuk Image Gallery

const ImageGallery = ({ images }) => {
    const galleryRef = useRef(null); // Ref untuk seluruh galeri container

    useEffect(() => {
        if (!images || images.length === 0) return;

        // Animasi muncul setiap item screenshot satu per satu
        gsap.fromTo(
            gsap.utils.toArray('.screenshot-item'), // Target setiap item screenshot
            { opacity: 0, y: 80, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.2, // Muncul satu per satu dengan delay
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: galleryRef.current, // Trigger adalah container galeri
                    start: 'top 80%', // Mulai animasi saat galeri masuk viewport
                    end: 'bottom 20%', // Akhiri trigger agar animasi selesai saat keluar
                    toggleActions: 'play none none none', // Hanya play sekali saat masuk
                    // markers: true, // Untuk debugging, hapus di production
                },
            }
        );
    }, [images]); // Dependensi images agar animasi re-run jika gambar berubah

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="image-gallery-container" ref={galleryRef}>
            {images.map((imgData, index) => {
                // Pastikan imgData adalah objek dengan properti src
                const src = typeof imgData === 'string' ? imgData : imgData.src;
                const alt = (typeof imgData === 'object' && imgData.alt) ? imgData.alt : `Project screenshot ${index + 1}`;
                const variantClass = (typeof imgData === 'object' && imgData.variant) ? `screenshot-item--${imgData.variant}` : '';

                return (
                    <div key={index} className={`screenshot-item ${variantClass}`}>
                        <img
                            src={src}
                            alt={alt}
                            className="screenshot-item__img"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default ImageGallery;