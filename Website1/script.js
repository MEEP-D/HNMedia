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
            dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        const dots = document.querySelectorAll('.slider-dot');
        if (dots.length > 0) {
            dots[currentSlide].classList.remove('active');
        }
        
        // Update current slide index
        currentSlide = (index + slides.length) % slides.length;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        if (dots.length > 0) {
            dots[currentSlide].classList.add('active');
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
    createDots();
    startAutoSlide();
    
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
    
    // Pause auto sliding when hovering over the slider
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', function() {
        clearInterval(autoSlideInterval);
    });
    
    heroSection.addEventListener('mouseleave', function() {
        startAutoSlide();
    });
});
let currentSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.querySelector('.slider-dots');
let autoSlideInterval;

function createDots() {
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
    // Thay thế toàn bộ phần carousel script bằng code này
    document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);
    
    // Tính toán kích thước slide
    const slideWidth = slides[0].getBoundingClientRect().width;
    const slideMargin = parseInt(window.getComputedStyle(slides[0]).marginRight);
    const totalSlideWidth = slideWidth + slideMargin;
    
    // Cập nhật số slide hiển thị theo kích thước màn hình
    function getSlidesPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 992) return 2;
        if (window.innerWidth <= 1200) return 3;
        return 4;
    }
    
    let slidesPerView = getSlidesPerView();
    let currentIndex = 0;
    
    // Tạo dots navigation
    function createDots() {
        dotsNav.innerHTML = '';
        const dotsCount = Math.ceil(slides.length / slidesPerView);
        
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-indicator';
            dot.dataset.index = i;
            dotsNav.appendChild(dot);
        }
        
        updateDots();
    }
    
    // Cập nhật trạng thái dots
    function updateDots() {
        const allDots = dotsNav.querySelectorAll('.carousel-indicator');
        allDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Math.floor(currentIndex / slidesPerView));
        });
    }
    
    // Di chuyển đến slide cụ thể
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, slides.length - slidesPerView));
        track.style.transform = `translateX(-${currentIndex * totalSlideWidth}px)`;
        updateDots();
        updateButtons();
    }
    
    // Cập nhật trạng thái nút điều hướng
    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= slides.length - slidesPerView;
    }
    
    // Xử lý sự kiện resize
    function handleResize() {
        const newSlidesPerView = getSlidesPerView();
        if (newSlidesPerView !== slidesPerView) {
            slidesPerView = newSlidesPerView;
            createDots();
            goToSlide(0);
        }
    }
    
    // Sự kiện click nút next
    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    // Sự kiện click nút prev
    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    // Sự kiện click dot
    dotsNav.addEventListener('click', (e) => {
        const dot = e.target.closest('.carousel-indicator');
        if (dot) {
            const index = parseInt(dot.dataset.index);
            goToSlide(index * slidesPerView);
        }
    });
    
    // Auto scroll
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (currentIndex >= slides.length - slidesPerView) {
                goToSlide(0);
            } else {
                goToSlide(currentIndex + 1);
            }
        }, 3000);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Khởi tạo
    createDots();
    goToSlide(0);
    startAutoScroll();
    
    // Dừng auto scroll khi hover
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);
    
    // Xử lý resize
    window.addEventListener('resize', handleResize);
    });
    // Thay thế phần testimonial slider bằng code này
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Cập nhật slider
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    // Chuyển đến slide trước
    function goToPrevSlide() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSlider();
        resetAutoSlide();
    }
    
    // Chuyển đến slide tiếp theo
    function goToNextSlide() {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
        resetAutoSlide();
    }
    
    // Tự động chuyển slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(goToNextSlide, 5000);
    }
    
    // Reset tự động chuyển slide
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Sự kiện click nút
    prevBtn.addEventListener('click', goToPrevSlide);
    nextBtn.addEventListener('click', goToNextSlide);
    
    // Khởi động
    updateSlider();
    startAutoSlide();
    
    // Dừng auto slide khi hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', startAutoSlide);
    });
    // Thay thế phần form submission bằng code này
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Lấy dữ liệu form
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        phone: this.querySelector('input[type="tel"]').value,
        message: this.querySelector('textarea').value
    };
    
    // Hiển thị loading
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Đang gửi...';
    submitBtn.disabled = true;
    
    // Giả lập gửi dữ liệu (thay bằng AJAX thực tế)
    setTimeout(() => {
        // Hiển thị thông báo thành công
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
        
        // Reset form
        this.reset();
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        // Thêm vào console để kiểm tra
        console.log('Form submitted:', formData);
    }, 1500);
    });
    // Thêm code này để xử lý click video placeholder
document.querySelectorAll('.tiktok-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        // Thay thế placeholder bằng iframe khi click
        const videoId = 'VIDEO_ID'; // Thay bằng ID video thực tế
        const videoUrl = `https://www.tiktok.com/embed/v2/${videoId}`;
        
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', videoUrl);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        
        this.innerHTML = '';
        this.appendChild(iframe);
    });
    });
    // Cập nhật phần smooth scroll để đóng mobile menu
    document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        // Đóng mobile menu nếu đang mở
        if (nav.classList.contains('show')) {
            nav.classList.remove('show');
        }
    });
    });
    // Cập nhật phần scroll animation
function checkReveal() {
    const triggerBottom = window.innerHeight * 0.8;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Thêm Intersection Observer cho mượt hơn
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
    } else {
    // Fallback cho trình duyệt cũ
    window.addEventListener('load', checkReveal);
    window.addEventListener('scroll', checkReveal);
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    }

        // Mobile Menu Toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const nav = document.querySelector('nav');
        
        mobileMenu.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
        
        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('show')) {
                    nav.classList.remove('show');
                }
            });
        });
        
        // Testimonial Slider
        const slider = document.querySelector('.testimonial-slider');
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;
        
        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            updateSlider();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });
        
        // Auto slide testimonials
        setInterval(() => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }, 5000);
        
        // Form Submission
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                message: this.querySelector('textarea').value
            };
            
            // Here you would typically send this data to your server
            // For now, we'll just show a success message
            alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
            
            // Reset form
            this.reset();
        });
        
        // Scroll Animation for Elements
        const revealElements = document.querySelectorAll('.service-card, .product-card, .video-card, .about-img, .about-content');
        
        function checkReveal() {
            const triggerBottom = window.innerHeight * 0.8;
            
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < triggerBottom) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Add initial styles for animation
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Check on load and scroll
        window.addEventListener('load', checkReveal);
        window.addEventListener('scroll', checkReveal);
        
        // Handle video placeholder clicks
        const videoWrappers = document.querySelectorAll('.video-wrapper');
        
        videoWrappers.forEach(wrapper => {
            wrapper.addEventListener('click', function() {
                // Here you could implement logic to start playing the video
                console.log('Video clicked');
            });
        });
        
        // Add more dynamic functionality as needed
        
        // Image gallery for product showcases (optional enhancement)
        // This would require adding more HTML structure for a gallery
        function setupProductGallery() {
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    // Could add hover effects or image swapping functionality
                    this.querySelector('.product-img').style.transform = 'scale(1.05)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.querySelector('.product-img').style.transform = 'scale(1)';
                });
            });
        }
        
        setupProductGallery();
        
        // Add transition to product images
        document.querySelectorAll('.product-img').forEach(img => {
            img.style.transition = 'transform 0.3s ease';
        });
        
        // Sticky header effect on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                header.style.background = 'var(--white)';
            }
        });
        
        // Add scroll indicator (optional enhancement)
        function addScrollIndicator() {
            const indicator = document.createElement('div');
            indicator.style.position = 'fixed';
            indicator.style.top = '0';
            indicator.style.left = '0';
            indicator.style.height = '3px';
            indicator.style.backgroundColor = 'var(--primary-color)';
            indicator.style.zIndex = '999';
            document.body.appendChild(indicator);
            
            window.addEventListener('scroll', function() {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                indicator.style.width = scrolled + '%';
            });
        }
        
        addScrollIndicator();
        
        // Countdown timer for promotional offers (optional enhancement)
        function setupCountdownTimer(endDate, elementId) {
            const countdownElement = document.getElementById(elementId);
            if (!countdownElement) return;
            
            const interval = setInterval(function() {
                const now = new Date().getTime();
                const distance = new Date(endDate).getTime() - now;
                
                if (distance < 0) {
                    clearInterval(interval);
                    countdownElement.innerHTML = "Chương trình đã kết thúc!";
                    return;
                }
                
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }, 1000);
        }
        
        // Usage example (uncomment and add element with id="promotion-countdown" to HTML):
        // setupCountdownTimer('2025-05-30T23:59:59', 'promotion-countdown');
        
        // Lazy loading images for better performance
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.loading = 'lazy';
            });
        } else {
            // Fallback for browsers that don't support native lazy loading
            // Could implement a JavaScript lazy loading library here
        }
        // JavaScript cho carousel ảnh feedback
        document.addEventListener('DOMContentLoaded', function() {
         const track = document.querySelector('.carousel-track');
         const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-button.next');
            const prevButton = document.querySelector('.carousel-button.prev');
            const dotsNav = document.querySelector('.carousel-nav');
            const dots = Array.from(dotsNav.children);
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    const slideMargin = parseInt(window.getComputedStyle(slides[0]).marginRight) + 
                       parseInt(window.getComputedStyle(slides[0]).marginLeft);
    
    // Sắp xếp slides cạnh nhau
    const setSlidePosition = (slide, index) => {
        slide.style.left = (slideWidth + slideMargin) * index + 'px';
    };
    
    slides.forEach(setSlidePosition);
    
    // Khi khung hiển thị nhỏ hơn, hiển thị ít slides hơn một lần
    let slidesPerView = 4; // Mặc định hiển thị 4 slides
    
    function updateSlidesPerView() {
        if (window.innerWidth <= 768) {
            slidesPerView = 1;
        } else if (window.innerWidth <= 992) {
            slidesPerView = 2;
        } else if (window.innerWidth <= 1200) {
            slidesPerView = 3;
        } else {
            slidesPerView = 4;
        }
    }
    
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    
    // Hàm di chuyển đến slide
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };
    
    // Cập nhật dots
    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('active');
        targetDot.classList.add('active');
    };
    
    // Ẩn/hiện nút khi ở slide đầu/cuối
    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - slidesPerView) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        } else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
    };
    
    // Khi click nút next
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide') || slides[0];
        let currentIndex = slides.indexOf(currentSlide);
        let nextIndex = currentIndex + slidesPerView <= slides.length - slidesPerView ? 
                        currentIndex + slidesPerView : slides.length - slidesPerView;
        
        const nextSlide = slides[nextIndex];
        const currentDot = dotsNav.querySelector('.active') || dots[0];
        const nextDot = dots[Math.floor(nextIndex / slidesPerView)];
        
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, prevButton, nextButton, nextIndex);
    });
    
    // Khi click nút prev
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide') || slides[0];
        let currentIndex = slides.indexOf(currentSlide);
        let prevIndex = currentIndex - slidesPerView >= 0 ? currentIndex - slidesPerView : 0;
        
        const prevSlide = slides[prevIndex];
        const currentDot = dotsNav.querySelector('.active') || dots[0];
        const prevDot = dots[Math.floor(prevIndex / slidesPerView)];
        
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
        hideShowArrows(slides, prevButton, nextButton, prevIndex);
    });
    
    // Khi click vào dots
    dotsNav.addEventListener('click', e => {
        // Nếu không click vào dot thì bỏ qua
        const targetDot = e.target.closest('button');
        if (!targetDot) return;
        
        const currentSlide = track.querySelector('.current-slide') || slides[0];
        const currentDot = dotsNav.querySelector('.active') || dots[0];
        const targetIndex = dots.indexOf(targetDot) * slidesPerView;
        const targetSlide = slides[targetIndex];
        
        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrows(slides, prevButton, nextButton, targetIndex);
    });
    
    // Auto scroll
    let autoScrollInterval;
    
    function startAutoScroll() {
        // Điều chỉnh tốc độ tự động cuộn ở đây (5000ms = 5 giây)
        autoScrollInterval = setInterval(() => {
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            let currentIndex = slides.indexOf(currentSlide);
            
            // Nếu đã đến cuối, quay về đầu
            let nextIndex = currentIndex + slidesPerView;
            if (nextIndex >= slides.length - slidesPerView + 1) {
                nextIndex = 0;
            }
            
            const nextSlide = slides[nextIndex];
            const currentDot = dotsNav.querySelector('.active') || dots[0];
            const nextDot = dots[Math.floor(nextIndex / slidesPerView) % dots.length];
            
            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
        }, 5000);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Khởi tạo carousel
    slides[0].classList.add('current-slide');
    dots[0].classList.add('active');
    hideShowArrows(slides, prevButton, nextButton, 0);
    
    // Bắt đầu auto scroll
    startAutoScroll();
    
    // Dừng auto scroll khi người dùng tương tác
    track.addEventListener('mouseenter', stopAutoScroll);
    prevButton.addEventListener('mouseenter', stopAutoScroll);
    nextButton.addEventListener('mouseenter', stopAutoScroll);
    dotsNav.addEventListener('mouseenter', stopAutoScroll);
    
    // Tiếp tục auto scroll khi người dùng không tương tác
    track.addEventListener('mouseleave', startAutoScroll);
    prevButton.addEventListener('mouseleave', startAutoScroll);
    nextButton.addEventListener('mouseleave', startAutoScroll);
    dotsNav.addEventListener('mouseleave', startAutoScroll);
    
    // Thêm lựa chọn tự động chạy liên tục không cần nút điều hướng
    const carouselContainer = document.querySelector('.carousel-container');
    const toggleAutoRunButton = document.createElement('button');
    toggleAutoRunButton.className = 'btn toggle-auto-run';
    toggleAutoRunButton.textContent = 'Chế độ tự động chạy';
    toggleAutoRunButton.style.marginTop = '20px';
    
    document.querySelector('#feedback-gallery .container').appendChild(toggleAutoRunButton);
    
    let isAutoRunMode = false;
    
    toggleAutoRunButton.addEventListener('click', () => {
        isAutoRunMode = !isAutoRunMode;
        
        if (isAutoRunMode) {
            // Chuyển sang chế độ tự động chạy liên tục
            track.parentElement.classList.add('auto-scroll');
            toggleAutoRunButton.textContent = 'Tắt chế độ tự động';
            stopAutoScroll(); // Tắt auto scroll thông thường
            
            // Đảm bảo tất cả slides đều hiển thị
            slides.forEach(slide => {
                slide.style.left = ''; // Xóa vị trí cố định
            });
            
            // Ẩn nút điều hướng và dots trong chế độ này
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            dotsNav.style.display = 'none';
            
            // Clone slides để tạo hiệu ứng vô hạn
            const originalSlides = Array.from(slides);
            originalSlides.forEach(slide => {
                const clone = slide.cloneNode(true);
                track.appendChild(clone);
            });
            
        } else {
            // Quay lại chế độ thông thường
            track.parentElement.classList.remove('auto-scroll');
            toggleAutoRunButton.textContent = 'Chế độ tự động chạy';
            
            // Xóa các slide đã clone
            const allSlides = Array.from(track.children);
            allSlides.slice(slides.length).forEach(slide => slide.remove());
            
            // Khôi phục vị trí ban đầu
            slides.forEach(setSlidePosition);
            
            // Hiện lại nút điều hướng và dots
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
            dotsNav.style.display = 'flex';
            
            startAutoScroll(); // Khởi động lại auto scroll thông thường
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.videos-container').forEach(container => {
    const slider   = container.querySelector('.video-slider');
    const prevBtn  = container.querySelector('.prev-btn');
    const nextBtn  = container.querySelector('.next-btn');
    const cards    = slider.querySelectorAll('.video-card');
    const gap      = parseInt(getComputedStyle(slider).gap) || 0;
    let cardWidth  = cards[0].offsetWidth + gap;
    let position   = 0;
    const maxPos   = cards.length - Math.floor(slider.offsetWidth / cardWidth);

    // Khởi tạo trạng thái nút
    updateButtons();

    prevBtn.addEventListener('click', () => {
      if (position > 0) {
        position--;
        slider.style.transform = `translateX(-${position * cardWidth}px)`;
        updateButtons();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (position < maxPos) {
        position++;
        slider.style.transform = `translateX(-${position * cardWidth}px)`;
        updateButtons();
      }
    });

    // Cập nhật disabled/opacity cho nút
    function updateButtons() {
      prevBtn.disabled = position === 0;
      nextBtn.disabled = position >= maxPos;
      prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
      nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }

    // Cập nhật lại khi resize
    window.addEventListener('resize', () => {
      cardWidth = cards[0].offsetWidth + gap;
      slider.style.transform = `translateX(-${position * cardWidth}px)`;
      updateButtons();
    });
  });
});

