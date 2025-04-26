const logoSrc = '/Images/tiktok3.png'; // đường dẫn ảnh logo
const maxImages = 100; // số lượng ảnh rơi cùng lúc
const maxLogos = 10; // số lượng logo tối đa

function createRainImage() {
    const img = document.createElement('img');
    img.src = logoSrc; // Corrected to use logoSrc
    img.className = 'rain-image';
    
    // Tạo vị trí ngẫu nhiên theo chiều ngang
    img.style.left = Math.random() * window.innerWidth + 'px';
    img.style.top = '-100px'; // bắt đầu trên đỉnh
    img.style.width = (30 + Math.random() * 70) + 'px'; // kích cỡ ảnh từ 30px đến 70px
    img.style.zIndex = '9999'; // Ensure the image is on the topmost layer
    const randomRotation = 0 + Math.random() * 30;
    img.style.transform = `rotate(${randomRotation}deg)`;// Rotate the image by 20 degrees

    document.body.appendChild(img);
  
    // Tạo hiệu ứng rơi
    const fallDuration = 9 + Math.random() * 10; // thời gian rơi từ 3s ~ 5s
    img.style.transition = `top ${fallDuration}s linear`;
  
    // Bắt đầu rơi
    setTimeout(() => {
        img.style.top = document.body.scrollHeight + 'px'; // Rơi xuống cuối trang
      }, 100);
  
    // Xóa ảnh sau khi rơi xong
    setTimeout(() => {
      img.remove();
    }, fallDuration * 1000 + 100);
}

// Tạo ảnh liên tục như mưa
setInterval(() => {
  if (document.querySelectorAll('.rain-image').length < maxImages) {
    createRainImage();
  }
}, 120); // mỗi 120ms tạo 1 ảnh mới

// Placeholder for createLogo function
function createLogo() {
  // Implement logo creation logic here
}

// Tạo logo liên tục mỗi 300ms
setInterval(() => {
  if (document.querySelectorAll('.logo').length < maxLogos) {
    createLogo();
  }
}, 300);

// Main initialization when page loads
window.addEventListener('load', function() {
    // Ensure scrolling is enabled
    document.body.style.overflow = 'auto';

    // Check for any event listeners that might prevent scrolling
    window.addEventListener('scroll', function(event) {
        // If any condition is met that should prevent scrolling, use preventDefault
        // event.preventDefault(); // Uncomment if you need to prevent scrolling under certain conditions
    });
    
    // Hero Slider functionality
    initHeroSlider();
    
    // Contact Form functionality
    initContactForm();
    
    // Testimonial Slider functionality
    initTestimonialSlider();
    
    // Set background images from data attributes
    setBackgroundImages();
});

// Initialize Hero Slider
function initHeroSlider() {
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

    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = ''; // Clear existing dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
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
        clearInterval(autoSlideInterval); // Clear any existing interval
        autoSlideInterval = setInterval(nextSlide, 1500); // Change slide every 2 seconds
    }

    createDots();
    // Start the first transition immediately
    setTimeout(nextSlide, 500); // Start first transition after a short delay
    startAutoSlide(); // Then continue with regular intervals

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
}

// Initialize Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const popup = document.getElementById('popup');
    const popupIcon = document.getElementById('popupIcon');
    const popupTitle = document.getElementById('popupTitle');
    const popupMessage = document.getElementById('popupMessage');
    const popupCloseBtn = document.getElementById('popupCloseBtn');
    
    if (!contactForm) return;

    // Hàm hiển thị popup
    function showPopup(isSuccess, message) {
        if (!popup) return;
        
        if (isSuccess) {
            popupIcon.textContent = '✓';
            popupTitle.textContent = 'Gửi thành công!';
            popupMessage.textContent = message || 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất.';
            popupIcon.style.color = '#4CAF50';
        } else {
            popupIcon.textContent = '✗';
            popupTitle.textContent = 'Lỗi!';
            popupMessage.textContent = message || 'Có lỗi xảy ra khi gửi thông tin.';
            popupIcon.style.color = '#f44336';
        }
        popup.style.display = 'block';
    }

    // Đóng popup
    if (popupCloseBtn) {
        popupCloseBtn.addEventListener('click', function() {
            popup.style.display = 'none';
        });
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang gửi...';
        
        fetch(this.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showPopup(true);
                contactForm.reset();
            } else {
                throw new Error('Formspree returned status: ' + response.status);
            }
        })
        .catch(error => {
            showPopup(false, error.message);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
    });
}

// Initialize Testimonial Slider
function initTestimonialSlider() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevTestimonialBtn = document.querySelector('.testimonial-btn.prev-btn');
    const nextTestimonialBtn = document.querySelector('.testimonial-btn.next-btn');
    let currentTestimonialSlide = 0;
    let testimonialAutoSlideInterval;

    if (testimonialSlides.length === 0) {
        console.warn('No testimonial slides found');
        return;
    }

    // Hide all slides except the first one
    testimonialSlides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });

    // Function to show a specific testimonial slide
    function showTestimonialSlide(index) {
        // Hide current slide
        testimonialSlides[currentTestimonialSlide].style.display = 'none';
        
        // Update current slide index
        currentTestimonialSlide = (index + testimonialSlides.length) % testimonialSlides.length;
        
        // Show new current slide
        testimonialSlides[currentTestimonialSlide].style.display = 'block';
    }

    // Function to show next testimonial
    function nextTestimonial() {
        showTestimonialSlide(currentTestimonialSlide + 1);
    }

    // Function to show previous testimonial
    function prevTestimonial() {
        showTestimonialSlide(currentTestimonialSlide - 1);
    }

    // Function to start auto-sliding for testimonials
    function startTestimonialAutoSlide() {
        clearInterval(testimonialAutoSlideInterval); // Clear any existing interval
        testimonialAutoSlideInterval = setInterval(nextTestimonial, 4000); // Change slide every 4 seconds
    }

    // Add event listeners to testimonial navigation buttons
    if (prevTestimonialBtn) {
        prevTestimonialBtn.addEventListener('click', function() {
            clearInterval(testimonialAutoSlideInterval);
            prevTestimonial();
            startTestimonialAutoSlide();
        });
    }

    if (nextTestimonialBtn) {
        nextTestimonialBtn.addEventListener('click', function() {
            clearInterval(testimonialAutoSlideInterval);
            nextTestimonial();
            startTestimonialAutoSlide();
        });
    }

    // Start auto-sliding for testimonials
    startTestimonialAutoSlide();
    
    // Pause auto-sliding when hovering over testimonials
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', function() {
            clearInterval(testimonialAutoSlideInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', function() {
            startTestimonialAutoSlide();
        });
    }

    // Log to confirm the code is running
    console.log('Testimonial slider initialized with ' + testimonialSlides.length + ' slides');
    console.log('Previous button found: ' + (prevTestimonialBtn !== null));
    console.log('Next button found: ' + (nextTestimonialBtn !== null));
}

// Set background images from data attributes
function setBackgroundImages() {
    const slides = document.querySelectorAll('[data-bg-image]');
    slides.forEach(slide => {
        const bgImage = slide.getAttribute('data-bg-image');
        if (bgImage) {
            slide.style.backgroundImage = `url('${bgImage}')`;
        }
    });
}

// Initialize Feedback Gallery Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    let currentIndex = 0;
    let autoSlideInterval;
    const slideIntervalTime = 5000;
    
    // Khởi tạo carousel
    function initCarousel() {
        // Tạo bản sao của slides để tạo hiệu ứng vô hạn
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        
        firstClone.id = 'first-clone';
        lastClone.id = 'last-clone';
        
        carouselTrack.appendChild(firstClone);
        carouselTrack.insertBefore(lastClone, slides[0]);
        
        updateCarousel();
        startAutoSlide();
    }
    
    // Cập nhật vị trí carousel
    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        carouselTrack.style.transform = `translateX(-${(currentIndex + 1) * slideWidth}px)`;
        
        // Cập nhật trạng thái active
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentIndex % slides.length) {
                slide.classList.add('active');
            }
        });
        
        updateIndicators();
    }
    
    // Chuyển đến slide tiếp theo
    function nextSlide() {
        currentIndex++;
        carouselTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        updateCarousel();
        
        // Kiểm tra nếu đến slide clone cuối cùng
        if (currentIndex >= slides.length) {
            setTimeout(() => {
                carouselTrack.style.transition = 'none';
                currentIndex = 0;
                updateCarousel();
            }, 500);
        }
    }
    
    // Chuyển về slide trước đó
    function prevSlide() {
        currentIndex--;
        carouselTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        updateCarousel();
        
        // Kiểm tra nếu đến slide clone đầu tiên
        if (currentIndex < 0) {
            setTimeout(() => {
                carouselTrack.style.transition = 'none';
                currentIndex = slides.length - 1;
                updateCarousel();
            }, 500);
        }
    }
    
    // Chuyển đến slide cụ thể
    function goToSlide(index) {
        currentIndex = index;
        carouselTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        updateCarousel();
    }
    
    // Cập nhật indicator
    function updateIndicators() {
        const actualIndex = currentIndex % slides.length;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === actualIndex);
        });
    }
    
    // Tự động chuyển slide
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, slideIntervalTime);
    }
    
    // Dừng tự động chuyển slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Sự kiện khi click nút
    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    // Sự kiện khi click indicator
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(index);
            startAutoSlide();
        });
    });
    
    // Tạm dừng khi hover
    carouselTrack.addEventListener('mouseenter', stopAutoSlide);
    carouselTrack.addEventListener('mouseleave', startAutoSlide);
    
    // Khởi tạo carousel
    initCarousel();
    
    // Xử lý khi resize màn hình
    window.addEventListener('resize', () => {
        updateCarousel();
    });
});

// Add event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Ensure scrolling is enabled
    document.body.style.overflow = 'auto';

    // Check for any event listeners that might prevent scrolling
    window.addEventListener('scroll', function(event) {
        // If any condition is met that should prevent scrolling, use preventDefault
        // event.preventDefault(); // Uncomment if you need to prevent scrolling under certain conditions
    });
    
    // Hero Slider functionality
    initHeroSlider();
    
    // Contact Form functionality
    initContactForm();
    
    // Testimonial Slider functionality
    initTestimonialSlider();
    
    // Set background images from data attributes
    setBackgroundImages();
});