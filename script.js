// ==================== DOM CONTENT LOADED ====================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScroll();
    initScrollEffects();
    initThemeToggle();
    initCustomCursor();
    initStatistics();
    initAgeCalculator();
    initQuiz();
    initMyths();
    initAccordion();
    initTestimonialsSlider();
    initGalleryFilter();
    initLightbox();
    initContactForm();
    initBackToTop();
    initRevealOnScroll();
    initHeroParticles();
});

// ==================== NAVIGATION ====================
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksItems.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== SCROLL EFFECTS ====================
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
}

// ==================== THEME TOGGLE (DARK MODE) ====================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, icon);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, icon);
    });
}

function updateThemeIcon(theme, icon) {
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ==================== CUSTOM CURSOR ====================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Create paw trail effect occasionally
        if (Math.random() < 0.03) {
            createPawTrail(mouseX, mouseY);
        }
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .filter-btn, .option-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hover'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
    });
}

function createPawTrail(x, y) {
    const paw = document.createElement('div');
    paw.className = 'paw-trail';
    paw.innerHTML = '🐾';
    paw.style.left = x + 'px';
    paw.style.top = y + 'px';
    document.body.appendChild(paw);
    
    setTimeout(() => paw.remove(), 1000);
}

// ==================== STATISTICS ANIMATION ====================
function initStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'));
                animateCounter(target, finalValue);
                statsObserver.unobserve(target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, stepTime);
}

// ==================== AGE CALCULATOR ====================
function initAgeCalculator() {
    const calculateBtn = document.getElementById('calculate-age');
    const catAgeInput = document.getElementById('cat-age');
    
    if (!calculateBtn || !catAgeInput) return;
    
    calculateBtn.addEventListener('click', calculateCatAge);
    catAgeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateCatAge();
    });
    
    // Initial calculation
    calculateCatAge();
}

function calculateCatAge() {
    const catAgeInput = document.getElementById('cat-age');
    const humanYearsEl = document.getElementById('human-years');
    const catYearsEl = document.getElementById('cat-years');
    const descriptionEl = document.getElementById('age-description');
    
    const catAge = parseFloat(catAgeInput.value) || 0;
    let humanAge;
    
    // Calculate human age equivalent
    if (catAge === 0) {
        humanAge = 0;
    } else if (catAge === 1) {
        humanAge = 15;
    } else if (catAge === 2) {
        humanAge = 24;
    } else if (catAge <= 25) {
        humanAge = 24 + (catAge - 2) * 4;
    } else {
        humanAge = 24 + 23 * 4 + (catAge - 25) * 3;
    }
    
    // Animate the numbers
    animateNumber(humanYearsEl, humanAge);
    catYearsEl.textContent = catAge;
    
    // Update description based on age
    let description = '';
    if (catAge < 0.5) {
        description = 'Tu gatito es un bebé. Necesita alimentación especial para cachorros y mucha supervisión.';
    } else if (catAge < 1) {
        description = 'Tu gatito está en una etapa de crecimiento rápido. Es momento de socialización y vacunas.';
    } else if (catAge < 3) {
        description = 'Tu gato es joven y lleno de energía. Es el momento perfecto para establecer rutinas saludables.';
    } else if (catAge < 7) {
        description = 'Tu gato es un adulto en plena madurez. Mantén una dieta equilibrada y chequeos regulares.';
    } else if (catAge < 11) {
        description = 'Tu gato es senior. Considera chequeos veterinarios más frecuentes y adaptar su dieta.';
    } else {
        description = 'Tu gato es gerítrico. Necesita atención especial, dieta para senior y visitas veterinarias regulares.';
    }
    
    descriptionEl.textContent = description;
}

function animateNumber(element, target) {
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / 30;
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 30);
}

// ==================== QUIZ ====================
const quizData = [
    {
        question: '¿Cuántas horas duerme un gato adulto en promedio?',
        options: ['4-6 horas', '8-10 horas', '12-16 horas', '20-22 horas'],
        correct: 2,
        explanation: 'Los gatos duermen entre 12 y 16 horas al día. Son crepúsculos, lo que significa que son más activos al amanecer y atardecer.'
    },
    {
        question: '¿Cuál es el sentido más desarrollado en los gatos?',
        options: ['Vista', 'Oído', 'Olfato', 'Gusto'],
        correct: 1,
        explanation: 'Los gatos tienen un oído excepcional, capaz de escuchar frecuencias ultrasonicas que los humanos no pueden percibir.'
    },
    {
        question: '¿Qué aminoácido es esencial para la salud de los gatos?',
        options: ['Glutamina', 'Taurina', 'Arginina', 'Glicina'],
        correct: 1,
        explanation: 'La taurina es un aminoácido esencial para los gatos. Su deficiencia puede causar ceguera y problemas cardíacos.'
    },
    {
        question: '¿Cuántos dedos tiene un gato normalmente?',
        options: ['16', '18', '20', '22'],
        correct: 1,
        explanation: 'Los gatos tienen 18 dedos en total: 5 en las patas delanteras (incluyendo el espolón) y 4 en las traseras.'
    },
    {
        question: '¿Qué signo indica que un gato está feliz?',
        options: ['Cola entre las piernas', 'Ronroneo', 'Orejas hacia atrás', 'Pupilas dilatadas'],
        correct: 1,
        explanation: 'El ronroneo es una señal clara de que un gato está contento y relajado. También puede ronronear cuando está estresado para calmarse.'
    },
    {
        question: '¿Cuál es la temperatura corporal normal de un gato?',
        options: ['36-37°C', '37.5-39°C', '39-40°C', '40-41°C'],
        correct: 1,
        explanation: 'La temperatura normal de un gato está entre 37.5°C y 39°C. Si supera los 39.5°C, puede tener fiebre.'
    }
];

let currentQuestion = 0;
let score = 0;

function initQuiz() {
    const nextBtn = document.getElementById('next-question');
    const restartBtn = document.getElementById('restart-quiz');
    
    if (!nextBtn || !restartBtn) return;
    
    document.getElementById('total-questions').textContent = quizData.length;
    
    // Add click handlers to option buttons
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            selectAnswer(this);
        });
    });
    
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    
    loadQuestion();
}

function loadQuestion() {
    const questionText = document.getElementById('question-text');
    const optionBtns = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-question');
    
    questionText.textContent = quizData[currentQuestion].question;
    
    optionBtns.forEach((btn, index) => {
        btn.textContent = quizData[currentQuestion].options[index];
        btn.className = 'option-btn';
        btn.disabled = false;
    });
    
    feedback.classList.remove('show', 'correct', 'wrong');
    nextBtn.style.display = 'none';
    
    // Update progress
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('progress-fill').style.width = ((currentQuestion + 1) / quizData.length * 100) + '%';
}

function selectAnswer(selectedBtn) {
    const optionBtns = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-question');
    const selectedIndex = Array.from(optionBtns).indexOf(selectedBtn);
    
    // Disable all buttons
    optionBtns.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === quizData[currentQuestion].correct) {
        selectedBtn.classList.add('correct');
        feedback.textContent = '¡Correcto! ' + quizData[currentQuestion].explanation;
        feedback.classList.add('show', 'correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
        optionBtns[quizData[currentQuestion].correct].classList.add('correct');
        feedback.textContent = 'Incorrecto. ' + quizData[currentQuestion].explanation;
        feedback.classList.add('show', 'wrong');
    }
    
    if (currentQuestion < quizData.length - 1) {
        nextBtn.style.display = 'flex';
    } else {
        setTimeout(showResults, 1500);
    }
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quiz-card').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    loadQuestion();
}

function showResults() {
    const quizCard = document.getElementById('quiz-card');
    const quizResult = document.getElementById('quiz-result');
    
    quizCard.style.display = 'none';
    quizResult.style.display = 'block';
    
    document.getElementById('final-score').textContent = score;
    document.getElementById('total-score').textContent = quizData.length;
    
    const resultMessage = document.getElementById('result-message');
    const percentage = (score / quizData.length) * 100;
    
    if (percentage === 100) {
        resultMessage.textContent = '¡Perfecto! Eres un verdadero experto en gatos. 🏆';
    } else if (percentage >= 80) {
        resultMessage.textContent = '¡Excelente! Sabes mucho sobre gatos. 🌟';
    } else if (percentage >= 60) {
        resultMessage.textContent = '¡Muy bien! Tienes buenos conocimientos felinos. 👍';
    } else if (percentage >= 40) {
        resultMessage.textContent = 'No está mal, pero hay espacio para aprender más. 📚';
    } else {
        resultMessage.textContent = 'Te recomendamos explorar nuestra sección de guías. ¡A aprender! 🎓';
    }
}

// ==================== MYTHS TOGGLE ====================
function initMyths() {
    const revealBtns = document.querySelectorAll('.reveal-btn');
    
    revealBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mythId = this.getAttribute('data-myth');
            const reality = document.getElementById('reality-' + mythId);
            
            reality.classList.toggle('show');
            
            if (reality.classList.contains('show')) {
                btn.innerHTML = '<span>Ocultar Realidad</span><i class="fas fa-eye-slash"></i>';
            } else {
                btn.innerHTML = '<span>Ver Realidad</span><i class="fas fa-eye"></i>';
            }
        });
    });
}

// ==================== ACCORDION ====================
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.classList.toggle('show');
        });
    });
}

// ==================== TESTIMONIALS SLIDER ====================
function initTestimonialsSlider() {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('slider-dots');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
    let autoSlide;
    
    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        const numDots = maxIndex + 1;
        
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + 30; // Including gap
        track.style.transform = `translateX(-${currentIndex * cardWidth * cardsPerView}px)`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateSlider();
        resetAutoSlide();
    }
    
    function nextSlide() {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateSlider();
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, 5000);
    }
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        cardsPerView = getCardsPerView();
        maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
        currentIndex = Math.min(currentIndex, maxIndex);
        createDots();
        updateSlider();
    });
    
    createDots();
    autoSlide = setInterval(nextSlide, 5000);
}

// ==================== GALLERY FILTER ====================
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            galleryItems.forEach((item, index) => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ==================== LIGHTBOX ====================
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (!lightbox) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-overlay h4');
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = title ? title.textContent : '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ==================== CONTACT FORM ====================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Por favor, ingresa un email válido.', 'error');
            return;
        }

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        display: flex;
        align-items: center;
        gap: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;

    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = 'background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;';
    closeBtn.addEventListener('click', () => removeNotification(notification));

    setTimeout(() => removeNotification(notification), 5000);
}

function removeNotification(notification) {
    notification.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => notification.remove(), 300);
}

// ==================== BACK TO TOP ====================
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== REVEAL ON SCROLL ====================
function initRevealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    function reveal() {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);
    reveal();
}

// ==================== HERO PARTICLES ====================
function initHeroParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;
    
    // Create floating paw prints
    for (let i = 0; i < 15; i++) {
        const paw = document.createElement('div');
        paw.innerHTML = '🐾';
        paw.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 5 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        heroParticles.appendChild(paw);
    }
    
    // Add float animation
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(10deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== LAZY LOADING ====================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==================== PRELOADER ====================
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => preloader.style.display = 'none', 500);
    }
});