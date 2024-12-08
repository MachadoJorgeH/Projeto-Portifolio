const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.toggleAttribute("data-theme", "dark");
    themeToggle.textContent = document.body.hasAttribute("data-theme") ? "☀️" : "🌙";
});

AOS.init();

const form = document.getElementById("contact-form");
const response = document.getElementById("form-response");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const message = form.querySelector("#message").value.trim();

    if (name && email && message) {
        response.textContent = "Mensagem enviada com sucesso!";
        response.className = "success";
    } else {
        response.textContent = "Por favor, preencha todos os campos!";
        response.className = "error";
    }

    response.classList.remove("hidden");
    setTimeout(() => response.classList.add("hidden"), 3000);
});

const themetoggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌗';

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌗';
});

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    const sections = document.querySelectorAll("section, .project, #skills");

    sections.forEach(section => {
        observer.observe(section);
    });

    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        observer.observe(project);
    });
});

window.addEventListener('scroll', function() {
    const skillsSection = document.getElementById('skills');
    const sectionPosition = skillsSection.getBoundingClientRect().top;

    if (sectionPosition < window.innerHeight) {
        skillsSection.classList.add('visible');
    }
});

const content = {
    en: {
      about: "About",
      "about-title": "About Me",
      "about-content":
        "Hello, I'm Jorge Henrique Machado! I'm in a career transition to become a Front-End Developer. I have a passion for creating modern and accessible interfaces. I always seek to learn new technologies to evolve in the area.",
      skills: "Skills",
      "skills-title": "Skills",
      "skills-content":
        "Here are some of the technologies I regularly work with.",
      projects: "Projects",
      "projects-title": "Projects",
      "projects-content":
        "Check out some of my recent projects below.",
      contact: "Contact",
      "contact-title": "Contact",
      "contact-content":
        "If you have any questions or would like to get in touch, please feel free to contact me.",
        "submit-button": "Submit",
        "contact-name": "Name:",
        "contact-email": "Email:",
        "contact-message": "Message:",
      resume: "Resume",
      "resume-title": "Download Resume",
      "resume-content":
        "You can download a copy of my resume to learn more about my experiences and skills.",
        "resume-button": "Download Resume",
    },
    pt: {
      about: "Sobre Mim",
      "about-title": "Sobre Mim",
      "about-content":
        "Olá, sou Jorge Henrique Machado! Estou em transição de carreira para me tornar um Desenvolvedor Front-End. Tenho paixão por criar interfaces modernas e acessíveis. Sempre busco aprender novas tecnologias para evoluir na área.",
      skills: "Habilidades",
      "skills-title": "Habilidades",
      "skills-content":
        "Aqui estão algumas das tecnologias com as quais trabalho regularmente.",
      projects: "Projetos",
      "projects-title": "Projetos",
      "projects-content":
        "Confira alguns dos meus projetos mais recentes abaixo.",
      contact: "Contato",
      "contact-title": "Contato",
      "contact-content":
        "Se você tiver alguma pergunta ou gostaria de entrar em contato, sinta-se livre para entrar em contato comigo.",
        "contact-name": "Nome:",
        "contact-email": "E-mail:",
        "contact-message": "Mensagem:",
        "submit-button": "Enviar",
      resume: "Curriculo",
      "resume-title": "Baixe Meu Currículo",
      "resume-content":
        "Você pode baixar uma cópia do meu currículo para saber mais sobre minhas experiências e habilidades.",
        "resume-button": "Baixar Currículo",
    },
  };
  




  document.addEventListener("DOMContentLoaded", () => {
    const languageToggle = document.getElementById("language-toggle");
    const navLinks = document.querySelectorAll("nav ul li a");
    const translatableElements = document.querySelectorAll("[data-key]");
  
    // Define o idioma inicial
    let currentLanguage = "pt";
  
    languageToggle.addEventListener("click", () => {
      // Alterna o idioma
      currentLanguage = currentLanguage === "pt" ? "en" : "pt";
      languageToggle.textContent = currentLanguage === "pt" ? "EN" : "PT";
  
      // Atualiza os textos do menu de navegação
      navLinks[0].textContent = content[currentLanguage].about;
      navLinks[1].textContent = content[currentLanguage].skills;
      navLinks[2].textContent = content[currentLanguage].projects;
      navLinks[3].textContent = content[currentLanguage].resume;
      navLinks[4].textContent = content[currentLanguage].contact;
  
      // Atualiza os textos dos elementos translatáveis
      translatableElements.forEach((element) => {
        const key = element.getAttribute("data-key");
        if (key && content[currentLanguage][key]) {
            element.textContent = content[currentLanguage][key];
          }
        element.textContent = content[currentLanguage][key];
      });
      const resumeButton = document.querySelector(".resume-button");
    const submitButton = document.querySelector("form button[type='submit']");
    if (resumeButton) {
      resumeButton.textContent = content[currentLanguage]["resume-button"];
    }
    if (submitButton) {
      submitButton.textContent = content[currentLanguage]["submit-button"];
    }
    });
  });
  