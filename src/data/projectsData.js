// src/data/projectsData.js (Contoh)
const projectsData = [
    {
        id: '1',
        title: 'My First Portofolio Website',
        thumbnail: '/images/porto-v1-1.png',
        mainImage: '/images/porto-v1-1.png',
        shortDescription: 'A simple portofolio website.',
        longDescription: 'This is my first portofolio website, built using fundamental tools like HTML, CSS, and JavaScript. It Ffeatures a simple yet appealing design, ith strong focus on easy navigation and responsiveness. Its purpose is so instrudice myself to the digital world.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        projectUrl: 'http://manaruljan-portofolio.netlify.app',
        githubUrl: 'https://github.com/Mnrljan/Portofolio',
        // --- TAMBAH BAGIAN INI ---
        screenshots: [
            '/images/porto-v1-2.png',
            '/images/porto-v1-3.png',
        ]
    },
    {
        id: '2',
        title: 'Interactive Portfolio Website',
        thumbnail: '/images/porto-v2-1.png',
        mainImage: '/images/porto-v2-1.png',
        shortDescription: 'My personal portfolio showcasing various web development projects with smooth scrolling and animations.',
        longDescription: 'Developed to highlight my skills and projects, this portfolio site emphasizes clean design, smooth navigation using Lenis, and subtle animations powered by GSAP to create an engaging user experience. Implemented a modular component structure for easy scalability and maintenance. This is the website you are currently accessing. Enjoy the show!',
        technologies: ['React', 'SCSS', 'GSAP', 'Lenis'],
        // projectUrl: '',
        githubUrl: 'https://github.com/Mnrljan/Portofolio-interactive',
        // --- TAMBAH BAGIAN INI ---
        // screenshots: [
        //     '/images/project2-ss1.jpg', 
        //     '/images/project2-ss2.jpg', 
        //     '/images/project2-ss3.jpg' 
        // ]
        // -------------------------
    },

    {
        id: '3',
        title: 'Invitation Website',
        thumbnail: '/images/project2-thumbnail.jpg',
        mainImage: '/images/porto-v3-1.png',
        shortDescription: 'My personal portfolio showcasing various web development projects with smooth scrolling and animations.',
        longDescription: 'This is a sophisticated and highly customizable digital wedding invitation web application, designed to provide a modern, interactive, and eco-friendly alternative to traditional paper invitations. Developed with a mobile-first approach, it ensures a seamless and delightful experience for guests across all devices, from smartphones to desktops.',
        technologies: ['React', 'SCSS', 'GSAP', 'Lenis'],
        projectUrl: 'https://wedding-invitations-web.netlify.app/',
        githubUrl: 'https://github.com/Mnrljan/wedding-invitation-web',
        // --- TAMBAH BAGIAN INI ---
        screenshots: [
            '/images/porto-v3-2.png', // Screenshot Home
            '/images/porto-v3-3.png', // Screenshot About
            '/images/porto-v3-4.png'  // Screenshot Projects
        ]
        // -------------------------
    },
];

export default projectsData;