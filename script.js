// Hero Slider
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let autoSlideInterval;
    
    // Set background images from data attributes
    slides.forEach(slide => {
        const bgImage = slide.getAttribute('data-bg-image');
        if (bgImage) {
            slide.style.backgroundImage = `url('${bgImage}')`;
        }
    });
    
    // Create dots for each slide
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        if (dotsContainer && dotsContainer.children[currentSlide]) {
            dotsContainer.children[currentSlide].classList.remove('active');
        }
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        if (dotsContainer && dotsContainer.children[currentSlide]) {
            dotsContainer.children[currentSlide].classList.add('active');
        }
    }
    
    // Go to next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Go to previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Start auto sliding
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    // Initialize slider
    if (slides.length > 0) {
        createDots();
        startAutoSlide();
        
        // Pause on hover
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            hero.addEventListener('mouseleave', startAutoSlide);
        }
    }
    
    // Add event listeners for arrow controls
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function() {
            clearInterval(autoSlideInterval); // Stop auto sliding
            prevSlide();
            startAutoSlide(); // Restart auto sliding
        });
        
        nextButton.addEventListener('click', function() {
            clearInterval(autoSlideInterval); // Stop auto sliding
            nextSlide();
            startAutoSlide(); // Restart auto sliding
        });
    }
});

let currentSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.querySelector('.slider-dots');
let autoSlideInterval;
function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dotsContainer.children[currentSlide].classList.remove('active');
    
    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dotsContainer.children[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    createDots();
    startAutoSlide();
    
    // Pause on hover
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    hero.addEventListener('mouseleave', startAutoSlide);
});

document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    const hero = document.querySelector('.hero');
    let currentSlide = 0;
    let autoSlideInterval;

    if (slides.length === 0) {
        console.warn('No slides found in hero section');
        return;
    }

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        if (dotsContainer && dotsContainer.children[currentSlide]) {
            dotsContainer.children[currentSlide].classList.remove('active');
        }

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        if (dotsContainer && dotsContainer.children[currentSlide]) {
            dotsContainer.children[currentSlide].classList.add('active');
        }
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    createDots();
    startAutoSlide();

    if (hero) {
        hero.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        hero.addEventListener('mouseleave', startAutoSlide);
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            prevSlide();
            startAutoSlide();
        });
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            nextSlide();
            startAutoSlide();
        });
    }

    // Form Handling with SMTP.js
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const popup = document.querySelector('.popup-notification');
    const overlay = document.querySelector('.popup-overlay');
    const closeBtn = popup.querySelector('.popup-button');

    function showPopup(message, isSuccess = true) {
        if (!popup || !overlay) return;
        popup.querySelector('.popup-title').textContent = isSuccess ? 'Gửi thành công!' : 'Lỗi';
        popup.querySelector('.popup-message').textContent = isSuccess 
            ? 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.'
            : message;
        popup.querySelector('.popup-icon').textContent = isSuccess ? '✓' : '✗';
        popup.classList.add('show');
        overlay.classList.add('show');
    }

    function hidePopup() {
        if (!popup || !overlay) return;
        popup.classList.remove('show');
        overlay.classList.remove('show');
    }

    if (closeBtn) closeBtn.addEventListener('click', hidePopup);
    if (overlay) overlay.addEventListener('click', hidePopup);

    function validateForm(name, email, phone) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,11}$/;
        if (!name.trim()) return 'Vui lòng nhập họ và tên';
        if (!emailRegex.test(email)) return 'Vui lòng nhập email hợp lệ';
        if (!phoneRegex.test(phone)) return 'Vui lòng nhập số điện thoại hợp lệ (10-11 số)';
        return null;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
    
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
    
        // Validate form
        const validationError = validateForm(name, email, phone);
        if (validationError) {
            showPopup(validationError, false);
            return;
        }
    
        // Disable button
        submitButton.disabled = true;
        const originalBtnText = submitButton.textContent;
        submitButton.textContent = 'Đang gửi...';
    
        // Send email
        Email.send({
            SecureToken: "f60ead9f-0496-4851-97f0-a999c606fc3a", // Thay bằng token thực
            Host: "smtp.elasticemail.com",
            Username: "acduong4567@gmail.com",
            Password : "BFC5C3E86D1E25797BBA7F0FE5FA0BF58E2C",
            To: "acduong4567@gmail.com",
            From: "21111061398@hunre.edu.vn",
            Subject: `HN-Media Liên hệ mới từ ${name}`,
            Body: `
                <h2>Thông tin liên hệ</h2>
                <p><strong>Tên:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Điện thoại:</strong> ${phone}</p>
                <p><strong>Nội dung:</strong> ${message}</p>
            `,
            IsHtml: true
        }).then(function(response) {
            console.log("Response:", response);
            if (response.includes("OK")) {
                showPopup();
                contactForm.reset();
            } else {
                throw new Error(response);
            }
        }).catch(function(error) {
            console.error("Error:", error);
            showPopup("Lỗi gửi email: " + error.message, false);
        }).finally(function() {
            submitButton.disabled = false;
            submitButton.textContent = originalBtnText;
        });
    });
});