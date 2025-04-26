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

// Hero Slider
window.addEventListener('load', function() {
    // Ensure scrolling is enabled
    document.body.style.overflow = 'auto';

    // Check for any event listeners that might prevent scrolling
    window.addEventListener('scroll', function(event) {
        // If any condition is met that should prevent scrolling, use preventDefault
        // event.preventDefault(); // Uncomment if you need to prevent scrolling under certain conditions
    });
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

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 1000); // Change interval to 2 seconds
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

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const popup = document.getElementById('popup');
    const popupIcon = document.getElementById('popupIcon');
    const popupTitle = document.getElementById('popupTitle');
    const popupMessage = document.getElementById('popupMessage');
    const popupCloseBtn = document.getElementById('popupCloseBtn');

    // Hàm hiển thị popup
    function showPopup(isSuccess, message) {
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
    popupCloseBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

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
});