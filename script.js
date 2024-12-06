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