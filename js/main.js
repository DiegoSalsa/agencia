/* ========================================
   Agencia Software Chile - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // === Crear Partículas Animadas en el Hero ===
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        createParticles(particlesContainer, 20);
    }
    
    function createParticles(container, count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (8 + Math.random() * 10) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = 0.3 + Math.random() * 0.5;
            container.appendChild(particle);
        }
    }
    
    // === Mouse Tracking para Bento Cards ===
    const bentoCards = document.querySelectorAll('.bento-card-gradient');
    bentoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });

    // === Smooth Scroll para navegación ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Cerrar mobile menu si está abierto
                closeMobileMenu();
            }
        });
    });

    // === Mobile Menu Toggle ===
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    function openMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', openMobileMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }

    // === Intersection Observer para animaciones ===
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos con animaciones de scroll
    document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale, .stagger-children, .animate-slide-up').forEach(el => {
        observer.observe(el);
    });

    // === Contador Animado ===
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (counter.dataset.counted) return;
                counter.dataset.counted = 'true';
                
                const target = parseInt(counter.dataset.target);
                const prefix = counter.dataset.prefix || '';
                const suffix = counter.dataset.suffix || '';
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();
                
                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * target);
                    
                    counter.textContent = prefix + current + (target === 150 ? '+' : '') + suffix;
                    counter.classList.add('counting');
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = prefix + target + (target === 150 ? '+' : '') + suffix;
                        counter.classList.remove('counting');
                    }
                }
                
                requestAnimationFrame(updateCounter);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter-number').forEach(el => {
        counterObserver.observe(el);
    });

    // === Star Animation Trigger ===
    const starsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stars = entry.target.querySelectorAll('.star-icon');
                stars.forEach((star, index) => {
                    star.style.animationDelay = (index * 0.1) + 's';
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stars-container').forEach(el => {
        starsObserver.observe(el);
    });

    // === Header scroll effect ===
    const header = document.getElementById('main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (header) {
            if (currentScroll > 100) {
                header.classList.add('shadow-2xl', 'scrolled');
            } else {
                header.classList.remove('shadow-2xl', 'scrolled');
            }
        }
        
        lastScroll = currentScroll;
    });

    // === Parallax Effect for Hero Elements ===
    const heroOrbs = document.querySelectorAll('.hero-orb');
    const heroContent = document.querySelector('.hero-title');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        heroOrbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        if (heroContent && scrollY < 800) {
            heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
            heroContent.style.opacity = 1 - (scrollY / 800);
        }
    });

    // === Tilt Effect for Cards ===
    const tiltCards = document.querySelectorAll('.pricing-card, .tech-card, .stat-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // === Form submission ===
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí puedes agregar lógica para enviar el formulario
            // Por ejemplo, usando fetch() a un endpoint
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            console.log('Form data:', data);
            
            // Mostrar mensaje de éxito
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            this.reset();
        });
    }

    // === Carrusel simple ===
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const track = carousel.querySelector('.carousel-track');
        
        if (prevBtn && nextBtn && track) {
            const scrollAmount = 400;
            
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
            
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    });

    // === Active nav link based on scroll ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'font-semibold');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary', 'font-semibold');
            }
        });
    });

    // === Cotizador Automático ===
    const projectTypeInputs = document.querySelectorAll('input[name="projectType"]');
    const sectionsMinus = document.getElementById('sections-minus');
    const sectionsPlus = document.getElementById('sections-plus');
    const sectionsCount = document.getElementById('sections-count');
    const extraCheckboxes = document.querySelectorAll('.extra-checkbox');
    
    const summaryBase = document.getElementById('summary-base');
    const summarySections = document.getElementById('summary-sections');
    const summaryExtras = document.getElementById('summary-extras');
    const quoteTotal = document.getElementById('quote-total');
    
    let sections_additional = 0;
    const PRICE_PER_SECTION = 25000;
    
    function calculateQuote() {
        // Precio base según tipo de proyecto (en CLP)
        let basePrice = 220000;
        const selectedProject = document.querySelector('input[name="projectType"]:checked');
        if (selectedProject) {
            basePrice = parseInt(selectedProject.dataset.price);
        }
        
        // Secciones adicionales
        const sectionsPrice = sections_additional * PRICE_PER_SECTION;
        
        // Extras seleccionados
        let extrasPrice = 0;
        extraCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                extrasPrice += parseInt(checkbox.value);
            }
        });
        
        // Total
        const total = basePrice + sectionsPrice + extrasPrice;
        
        // Usar i18n para formatear si está disponible
        const formatFn = window.i18n ? window.i18n.formatPrice : (p) => '$' + p.toLocaleString('es-CL');
        
        // Actualizar UI
        if (summaryBase) summaryBase.textContent = formatFn(basePrice);
        if (summarySections) summarySections.textContent = formatFn(sectionsPrice);
        if (summaryExtras) summaryExtras.textContent = formatFn(extrasPrice);
        if (quoteTotal) quoteTotal.textContent = formatFn(total);
    }
    
    // Exponer función para que i18n pueda llamarla
    window.updateQuote = calculateQuote;
    
    // Event listeners para el cotizador
    projectTypeInputs.forEach(input => {
        input.addEventListener('change', calculateQuote);
    });
    
    if (sectionsMinus) {
        sectionsMinus.addEventListener('click', () => {
            if (sections_additional > 0) {
                sections_additional--;
                sectionsCount.textContent = sections_additional;
                calculateQuote();
            }
        });
    }
    
    if (sectionsPlus) {
        sectionsPlus.addEventListener('click', () => {
            if (sections_additional < 10) {
                sections_additional++;
                sectionsCount.textContent = sections_additional;
                calculateQuote();
            }
        });
    }
    
    extraCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateQuote);
    });
    
    // Calcular precio inicial después de que i18n esté listo
    setTimeout(calculateQuote, 500);

});
