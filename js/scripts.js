document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const carrossel = document.querySelector('.carrossel-imagens');
    const prevBtn = document.querySelector('.carrossel-btn.prev');
    const nextBtn = document.querySelector('.carrossel-btn.next');
    const images = document.querySelectorAll('.carrossel-imagens img');
    const contactForm = document.getElementById('contact-form');
    const contactCard = document.getElementById('contact-card');
    const loadingSpinner = document.getElementById('loading-spinner');
    let currentIndex = 0;
    const autoSlideInterval = 5000; // Tempo em milissegundos

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth"
        });
    }

    // Animation for sections on scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', checkSections);

    function checkSections() {
        const triggerBottom = window.innerHeight * 0.8;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add('show');
            } else {
                section.classList.remove('show');
            }
        });
    }

    checkSections();

    // Carrossel controls
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateCarrossel();
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateCarrossel();
        resetAutoSlide();
    });

    function updateCarrossel() {
        const offset = -currentIndex * 100;
        carrossel.style.transform = `translateX(${offset}%)`;
    }

    // Auto slide
    let autoSlide = setInterval(nextImage, autoSlideInterval);

    function nextImage() {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateCarrossel();
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextImage, autoSlideInterval);
    }

    // Animate images on scroll
    const animateImages = document.querySelectorAll('.animate-img');

    function animateOnScroll() {
        const windowHeight = window.innerHeight;
        animateImages.forEach(img => {
            const imgPosition = img.getBoundingClientRect().top;
            if (imgPosition < windowHeight - 100) {
                img.classList.add('fade-in');
            } else {
                img.classList.remove('fade-in');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Handle contact form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted'); // Debugging statement
        contactCard.style.display = 'none';
        loadingSpinner.style.display = 'flex';

        // Simulate a network request
        setTimeout(() => {
            console.log('Loading complete'); // Debugging statement
            loadingSpinner.style.display = 'none';
            contactCard.style.display = 'block';
            contactForm.reset(); // Reset form after submission
        }, 2000); // Simulate a 2 second delay for demonstration
    });

    // ScrollReveal configuration
    ScrollReveal().reveal('.animate-img', {
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        duration: 800,
        easing: 'ease-in-out',
        reset: true
    });
});
