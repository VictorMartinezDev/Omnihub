document.addEventListener('DOMContentLoaded', () => {
    // --- Menú Móvil ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Cambiar icono de hamburguesa a X
            const icon = mobileMenu.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Cerrar menú al hacer clic en un enlace (en móvil)
    const navLinks = document.querySelectorAll('#nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            if (icon.classList.contains('fa-times')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Efecto de Header al Hacer Scroll ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = '#ffffff';
        }
    });

    // --- Validación y Envío del Formulario ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulación de envío
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            console.log('Datos del formulario:', data);

            // Mostrar mensaje de éxito (estilizado básico por ahora)
            alert(`¡Gracias ${data.nombre}! Hemos recibido tu mensaje sobre ${data.servicio}. Nos pondremos en contacto contigo pronto.`);
            
            contactForm.reset();
        });
    }

    // --- Lógica de Carruseles en Portafolio ---
    const carousels = document.querySelectorAll('.portfolio-carousel');
    
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-container');
        const nextBtn = carousel.querySelector('.next');
        const prevBtn = carousel.querySelector('.prev');
        const images = carousel.querySelectorAll('.carousel-container img');
        let index = 0;
        let autoPlayInterval;

        const updateCarousel = () => {
            container.style.transform = `translateX(-${index * 100}%)`;
        };

        const nextImage = () => {
            index = (index + 1) % images.length;
            updateCarousel();
        };

        const prevImage = () => {
            index = (index - 1 + images.length) % images.length;
            updateCarousel();
        };

        // Eventos de botones
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextImage();
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevImage();
            resetAutoPlay();
        });

        // --- Auto-play (5 segundos) ---
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextImage, 5000);
        };

        const stopAutoPlay = () => {
            clearInterval(autoPlayInterval);
        };

        const resetAutoPlay = () => {
            stopAutoPlay();
            startAutoPlay();
        };

        // Pausar al pasar el mouse (desktop)
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // --- Soporte Táctil (Swipe) ---
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, {passive: true});

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoPlay();
        }, {passive: true});

        const handleSwipe = () => {
            const swipeThreshold = 50; // Mínimo de píxeles para considerar swipe
            if (touchStartX - touchEndX > swipeThreshold) {
                nextImage(); // Deslizar a la izquierda -> siguiente
            } else if (touchEndX - touchStartX > swipeThreshold) {
                prevImage(); // Deslizar a la derecha -> anterior
            }
        };

        // Iniciar auto-play al cargar
        startAutoPlay();
    });

    // --- Animación de entrada para las tarjetas de servicio ---
    const serviceCards = document.querySelectorAll('.service-card');
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
