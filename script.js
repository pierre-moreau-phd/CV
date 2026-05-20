// Version simplifiée du JavaScript - Sans conflits CSS

// Navigation mobile toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Menu mobile
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu mobile quand on clique sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navigation active simple
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let current = '';
        
        // Détecter la section actuelle en fonction du scroll
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Mettre à jour les liens actifs
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Animation simple des barres de compétences
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.transition = 'width 2s ease-in-out';
                        bar.style.width = width;
                    }, 100);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // Animation de la section expérience au scroll (mobile uniquement)
    function animateExperienceOnScroll() {
        // Vérifier si on est sur mobile
        if (window.innerWidth > 768) return;

        const timelineItems = document.querySelectorAll('.experience .timeline-item');
        if (timelineItems.length === 0) return;

        // Fallback si IntersectionObserver n'est pas dispo : on affiche tout
        if (typeof IntersectionObserver === 'undefined') {
            timelineItems.forEach(item => {
                const content = item.querySelector('.timeline-content');
                if (content) content.classList.add('animate-in');
            });
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const content = entry.target.querySelector('.timeline-content');
                if (content) content.classList.add('animate-in');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

        timelineItems.forEach(item => observer.observe(item));
    }

    // Initialisation AOS si disponible
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            offset: 50
        });
    }

    // Event listeners
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', () => {
        // Réinitialiser l'animation d'expérience si nécessaire
        const timelineContents = document.querySelectorAll('.experience .timeline-content');
        if (window.innerWidth <= 768) {
            // Sur mobile : s'assurer que l'animation peut se déclencher
            animateExperienceOnScroll();
        } else {
            // Sur desktop : enlever la classe animate-in et remettre l'état normal
            timelineContents.forEach(content => {
                content.classList.remove('animate-in');
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            });
        }
    });
    
    // Animation count-up pour les métriques
    function animateMetrics() {
        const targets = document.querySelectorAll('.metric-value [data-target], .metric-value[data-target]');
        if (!targets.length) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const counter = (el, end, duration = 1400) => {
            if (reduceMotion) {
                el.textContent = end.toLocaleString('fr-FR').replace(/\s/g, ' ');
                return;
            }
            const start = performance.now();
            const startVal = 0;
            const easeOut = (t) => 1 - Math.pow(1 - t, 3);
            const tick = (now) => {
                const elapsed = now - start;
                const t = Math.min(elapsed / duration, 1);
                const value = Math.floor(startVal + (end - startVal) * easeOut(t));
                el.textContent = value;
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const end = parseInt(el.dataset.target, 10);
                if (Number.isFinite(end)) counter(el, end);
                observer.unobserve(el);
            });
        }, { threshold: 0.5 });

        targets.forEach((el) => observer.observe(el));
    }

    // Réseau neuronal subtil en background du Hero
    function initNeuralNetwork() {
        const canvas = document.querySelector('.hero-canvas');
        if (!canvas) return;
        if (window.innerWidth < 768) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const ctx = canvas.getContext('2d');
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let particles = [];
        let width = 0;
        let height = 0;
        let rafId = null;
        let running = true;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Densité : ~1 particule pour 18000px²
            const target = Math.max(30, Math.min(70, Math.round((width * height) / 18000)));
            particles = Array.from({ length: target }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: 1.2 + Math.random() * 1.2,
            }));
        };

        const linkDist = 130;

        const tick = () => {
            ctx.clearRect(0, 0, width, height);

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x <= 0 || p.x >= width) p.vx *= -1;
                if (p.y <= 0 || p.y >= height) p.vy *= -1;
            }

            // Connexions
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < linkDist) {
                        const alpha = (1 - dist / linkDist) * 0.5;
                        ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            // Particules
            for (const p of particles) {
                ctx.fillStyle = 'rgba(34, 211, 238, 0.85)';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }

            if (running) rafId = requestAnimationFrame(tick);
        };

        resize();
        tick();

        window.addEventListener('resize', () => {
            cancelAnimationFrame(rafId);
            resize();
            tick();
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                running = false;
                cancelAnimationFrame(rafId);
            } else if (!running) {
                running = true;
                tick();
            }
        });
    }

    // Effet typewriter sur le hero subtitle
    function initTypewriter() {
        const el = document.querySelector('.hero-subtitle[data-typewriter]');
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.classList.add('typing-done');
            return;
        }

        const text = el.textContent;
        el.textContent = '';
        el.classList.add('typing');

        let i = 0;
        const speed = 32; // ms par caractère
        const tick = () => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(tick, speed + Math.random() * 25);
            } else {
                el.classList.remove('typing');
                el.classList.add('typing-done');
            }
        };
        // Petit délai pour laisser l'animation AOS du subtitle démarrer
        setTimeout(tick, 700);
    }

    // Initialiser les animations
    animateSkillBars();
    animateExperienceOnScroll();
    animateMetrics();
    initNeuralNetwork();
    initTypewriter();
    
    // Mettre à jour la navigation active au chargement
    updateActiveNav();
    
        // S'assurer que le body est visible
    document.body.style.opacity = '1';


});
