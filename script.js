// ====================================
// TEMA - Toggle com animação suave
// ====================================
const themeToggle = document.getElementById("theme-toggle");

// Carrega o tema salvo ou detecta preferência do sistema
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }
};

// Toggle de tema com feedback visual
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.hasAttribute('data-theme');
    
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    }
    
    // Animação de rotação no botão
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// ====================================
// FORMULÁRIO - Validação melhorada
// ====================================
const form = document.getElementById("contact-form");
const formResponse = document.getElementById("form-response");

// Validação de email
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Animação de shake para erro
const shakeElement = (element) => {
    element.style.animation = 'shake 0.5s';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const message = form.querySelector("#message").value.trim();
    
    // Validações com feedback específico
    if (!name) {
        showFormResponse("Por favor, insira seu nome!", "error");
        shakeElement(form.querySelector("#name"));
        return;
    }
    
    if (!email) {
        showFormResponse("Por favor, insira seu e-mail!", "error");
        shakeElement(form.querySelector("#email"));
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormResponse("Por favor, insira um e-mail válido!", "error");
        shakeElement(form.querySelector("#email"));
        return;
    }
    
    if (!message) {
        showFormResponse("Por favor, escreva uma mensagem!", "error");
        shakeElement(form.querySelector("#message"));
        return;
    }
    
    // Sucesso com animação
    showFormResponse("✅ Mensagem enviada com sucesso!", "success");
    
    // Limpa o formulário com delay
    setTimeout(() => {
        form.reset();
    }, 1000);
});

// Função auxiliar para mostrar resposta do formulário
const showFormResponse = (text, type) => {
    if (formResponse) {
        formResponse.textContent = text;
        formResponse.className = type;
        formResponse.classList.remove("hidden");
        
        setTimeout(() => {
            formResponse.classList.add("hidden");
        }, 4000);
    }
};

// ====================================
// INTERNACIONALIZAÇÃO - Idiomas
// ====================================
const content = {
    en: {
        about: "About",
        "about-title": "About Me",
        "about-content": "Hello, I'm Jorge Henrique Machado! I'm in a career transition to become a Front-End Developer. I have a passion for creating modern and accessible interfaces. I always seek to learn new technologies to evolve in the area.",
        skills: "Skills",
        "skills-title": "Skills",
        "skills-content": "Here are some of the technologies I regularly work with.",
        projects: "Projects",
        "projects-title": "Projects",
        "projects-content": "Check out some of my recent projects below.",
        contact: "Contact",
        "contact-title": "Contact",
        "contact-content": "If you have any questions or would like to get in touch, please feel free to contact me.",
        "submit-button": "Submit",
        "contact-name": "Name:",
        "contact-email": "Email:",
        "contact-message": "Message:",
        resume: "Resume",
        "resume-title": "Download Resume",
        "resume-content": "You can download a copy of my resume to learn more about my experiences and skills.",
        "resume-button": "Download Resume",
    },
    pt: {
        about: "Sobre Mim",
        "about-title": "Sobre Mim",
        "about-content": "Olá, sou Jorge Henrique Machado! Estou em transição de carreira para me tornar um Desenvolvedor Front-End. Tenho paixão por criar interfaces modernas e acessíveis. Sempre busco aprender novas tecnologias para evoluir na área.",
        skills: "Habilidades",
        "skills-title": "Habilidades",
        "skills-content": "Aqui estão algumas das tecnologias com as quais trabalho regularmente.",
        projects: "Projetos",
        "projects-title": "Projetos",
        "projects-content": "Confira alguns dos meus projetos mais recentes abaixo.",
        contact: "Contato",
        "contact-title": "Contato",
        "contact-content": "Se você tiver alguma pergunta ou gostaria de entrar em contato, sinta-se livre para entrar em contato comigo.",
        "contact-name": "Nome:",
        "contact-email": "E-mail:",
        "contact-message": "Mensagem:",
        "submit-button": "Enviar",
        resume: "Currículo",
        "resume-title": "Baixe Meu Currículo",
        "resume-content": "Você pode baixar uma cópia do meu currículo para saber mais sobre minhas experiências e habilidades.",
        "resume-button": "Baixar Currículo",
    },
};

// Configuração do idioma
let currentLanguage = localStorage.getItem('language') || 'pt';

const updateLanguage = (lang) => {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    const languageToggle = document.getElementById("language-toggle");
    const navLinks = document.querySelectorAll("nav ul li a");
    const translatableElements = document.querySelectorAll("[data-key]");
    
    // Atualiza o botão de idioma
    languageToggle.textContent = lang === "pt" ? "EN" : "PT";
    
    // Atualiza navegação
    if (navLinks.length >= 5) {
        navLinks[0].textContent = content[lang].about;
        navLinks[1].textContent = content[lang].skills;
        navLinks[2].textContent = content[lang].projects;
        navLinks[3].textContent = content[lang].resume;
        navLinks[4].textContent = content[lang].contact;
    }
    
    // Atualiza elementos com data-key
    translatableElements.forEach((element) => {
        const key = element.getAttribute("data-key");
        if (key && content[lang][key]) {
            element.textContent = content[lang][key];
        }
    });
    
    // Atualiza botões específicos
    const resumeButton = document.querySelector(".resume-button");
    const submitButton = document.querySelector("form button[type='submit']");
    
    if (resumeButton) {
        resumeButton.textContent = content[lang]["resume-button"];
    }
    if (submitButton) {
        submitButton.textContent = content[lang]["submit-button"];
    }
};

// ====================================
// CAROUSEL - Carrossel de projetos
// ====================================
const initCarousel = () => {
    const track = document.querySelector(".carousel-track");
    const slides = Array.from(track?.children || []);
    const prevButton = document.querySelector(".carousel-button.prev");
    const nextButton = document.querySelector(".carousel-button.next");
    
    if (!track || slides.length === 0) return;
    
    let currentIndex = 0;
    
    const updateCarousel = (index) => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
        
        // Adiciona classe active ao slide atual
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    };
    
    const showHideButtons = (index) => {
        if (prevButton) {
            prevButton.style.display = index === 0 ? "none" : "flex";
            prevButton.style.opacity = index === 0 ? "0" : "1";
        }
        if (nextButton) {
            nextButton.style.display = index === slides.length - 1 ? "none" : "flex";
            nextButton.style.opacity = index === slides.length - 1 ? "0" : "1";
        }
    };
    
    // Navegação com setas do teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateCarousel(currentIndex);
            showHideButtons(currentIndex);
        } else if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
            currentIndex++;
            updateCarousel(currentIndex);
            showHideButtons(currentIndex);
        }
    });
    
    // Suporte para touch/swipe em mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    const handleSwipe = () => {
        if (touchStartX - touchEndX > 50 && currentIndex < slides.length - 1) {
            // Swipe left
            currentIndex++;
            updateCarousel(currentIndex);
            showHideButtons(currentIndex);
        }
        
        if (touchEndX - touchStartX > 50 && currentIndex > 0) {
            // Swipe right
            currentIndex--;
            updateCarousel(currentIndex);
            showHideButtons(currentIndex);
        }
    };
    
    prevButton?.addEventListener("click", () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel(currentIndex);
        showHideButtons(currentIndex);
    });
    
    nextButton?.addEventListener("click", () => {
        currentIndex = Math.min(slides.length - 1, currentIndex + 1);
        updateCarousel(currentIndex);
        showHideButtons(currentIndex);
    });
    
    // Inicializa
    showHideButtons(currentIndex);
    updateCarousel(currentIndex);
};

// ====================================
// ANIMAÇÕES - Intersection Observer
// ====================================
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Anima badges com delay escalonado
                if (entry.target.classList.contains('badge')) {
                    const badges = entry.target.parentElement.querySelectorAll('.badge');
                    badges.forEach((badge, index) => {
                        setTimeout(() => {
                            badge.style.opacity = '1';
                            badge.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observa todas as seções e projetos
    const elements = document.querySelectorAll("section, .project, #skills, .badge");
    elements.forEach(element => observer.observe(element));
};

// ====================================
// EFEITO PARALLAX NO SCROLL
// ====================================
const initParallax = () => {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                // Parallax suave no about-me
                const aboutSection = document.querySelector('#about-me');
                if (aboutSection) {
                    aboutSection.style.transform = `translateY(${scrolled * 0.1}px)`;
                }
                
                // Efeito no header
                const header = document.querySelector('header');
                if (header && scrolled > 50) {
                    header.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
                    header.style.padding = '10px 30px';
                } else if (header) {
                    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
                    header.style.padding = '15px 30px';
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
};

// ====================================
// SMOOTH SCROLL para links internos
// ====================================
const initSmoothScroll = () => {
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
};

// ====================================
// SCROLL TO TOP BUTTON
// ====================================
const initScrollToTop = () => {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (!scrollTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// ====================================
// CAROUSEL INDICATORS
// ====================================
const initCarouselIndicators = () => {
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (indicators.length === 0 || slides.length === 0) return;
    
    const updateIndicators = (index) => {
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    };
    
    // Observa qual slide está visível
    const observerOptions = {
        root: document.querySelector('.carousel-track-container'),
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(slides).indexOf(entry.target);
                updateIndicators(index);
            }
        });
    }, observerOptions);
    
    slides.forEach(slide => observer.observe(slide));
    
    // Clique nos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            const track = document.querySelector('.carousel-track');
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${index * slideWidth}px)`;
            updateIndicators(index);
        });
    });
};

// ====================================
// LOADING ANIMATION
// ====================================
const initLoadingAnimation = () => {
    // Adiciona classe ao body quando tudo carregar
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Anima elementos principais com delay
        const mainElements = document.querySelectorAll('section');
        mainElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
};

// ====================================
// CONTADOR DE SKILLS (animação numérica)
// ====================================
const initSkillsCounter = () => {
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach((badge, index) => {
        // Inicialmente invisível
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        badge.style.transition = `all 0.5s ease ${index * 0.1}s`;
    });
};

// ====================================
// INICIALIZAÇÃO GERAL
// ====================================
document.addEventListener("DOMContentLoaded", () => {
    // Inicializa tema
    initTheme();
    
    // Inicializa idioma salvo
    updateLanguage(currentLanguage);
    
    // Event listener para toggle de idioma
    const languageToggle = document.getElementById("language-toggle");
    if (languageToggle) {
        languageToggle.addEventListener("click", () => {
            const newLang = currentLanguage === "pt" ? "en" : "pt";
            updateLanguage(newLang);
            
            // Animação no botão
            languageToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                languageToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Inicializa todas as features
    initCarousel();
    initScrollAnimations();
    initParallax();
    initSmoothScroll();
    initLoadingAnimation();
    initSkillsCounter();
    
    // Inicializa AOS se disponível
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
});

// ====================================
// CSS NECESSÁRIO PARA ANIMAÇÕES
// ====================================
// Adiciona estilos de animação via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .carousel-slide.active {
        opacity: 1;
        z-index: 1;
    }
    
    header {
        transition: all 0.3s ease;
    }
    
    #theme-toggle {
        transition: transform 0.3s ease;
    }
    
    #language-toggle {
        transition: transform 0.15s ease;
    }
    
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .loaded section {
        opacity: 1;
        transform: translateY(0);
    }
    
    .form-response {
        transition: all 0.3s ease;
        padding: 15px;
        border-radius: 8px;
        margin-top: 15px;
        text-align: center;
        font-weight: 600;
    }
    
    .form-response.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }
    
    .form-response.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }
    
    .form-response.hidden {
        opacity: 0;
        max-height: 0;
        padding: 0;
        margin: 0;
        overflow: hidden;
    }
`;
document.head.appendChild(style);