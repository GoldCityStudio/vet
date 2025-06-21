// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Tab functionality for jewelry categories
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Language selector functionality
    const languageSpans = document.querySelectorAll('.language-selector span');
    
    languageSpans.forEach(span => {
        span.addEventListener('click', () => {
            languageSpans.forEach(s => s.classList.remove('active'));
            span.classList.add('active');
            
            // Here you would typically implement language switching logic
            console.log('Language changed to:', span.textContent);
        });
    });
    
    // Shopping cart functionality
    const cart = document.querySelector('.cart');
    const cartCount = document.querySelector('.cart-count');
    const totalAmount = document.querySelector('.total-amount');
    
    let cartItems = 0;
    let cartTotal = 0;
    
    // Simulate adding items to cart
    function addToCart(price = 1000) {
        cartItems++;
        cartTotal += price;
        
        cartCount.textContent = cartItems;
        totalAmount.textContent = `HK$ ${cartTotal.toLocaleString()}`;
        
        // Add animation effect
        cart.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cart.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Add click event to CTA buttons to simulate adding to cart
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.textContent.includes('選購') || button.textContent.includes('預約')) {
                e.preventDefault();
                addToCart();
                
                // Show success message
                showNotification('商品已加入購物車！', 'success');
            }
        });
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#007bff'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add hover effects to category items
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        imageObserver.observe(img);
    });
    
    // Search functionality (placeholder)
    function initializeSearch() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = '搜尋首飾...';
        searchInput.className = 'search-input';
        
        // Style the search input
        searchInput.style.cssText = `
            padding: 8px 15px;
            border: 1px solid #ddd;
            border-radius: 20px;
            font-size: 14px;
            width: 200px;
            outline: none;
            transition: border-color 0.3s;
        `;
        
        searchInput.addEventListener('focus', () => {
            searchInput.style.borderColor = '#d4af37';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.style.borderColor = '#ddd';
        });
        
        // Add search input to header if needed
        // const headerRight = document.querySelector('.header-top-right');
        // headerRight.insertBefore(searchInput, headerRight.firstChild);
    }
    
    // Initialize search
    initializeSearch();
    
    // Mobile menu toggle (for responsive design)
    function createMobileMenu() {
        const headerMain = document.querySelector('.header-main');
        const nav = document.querySelector('.main-nav');
        
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            color: #333;
            cursor: pointer;
            padding: 10px;
        `;
        
        // Add mobile menu button to header
        headerMain.querySelector('.container').appendChild(mobileMenuBtn);
        
        // Mobile menu functionality
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('mobile-active');
            mobileMenuBtn.innerHTML = nav.classList.contains('mobile-active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Hide mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                nav.classList.remove('mobile-active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Show mobile menu button on small screens
        function checkMobileMenu() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                nav.style.display = 'none';
            } else {
                mobileMenuBtn.style.display = 'none';
                nav.style.display = 'block';
                nav.classList.remove('mobile-active');
            }
        }
        
        checkMobileMenu();
        window.addEventListener('resize', checkMobileMenu);
    }
    
    // Initialize mobile menu
    createMobileMenu();
    
    // Add CSS for mobile menu
    const mobileMenuCSS = `
        @media (max-width: 768px) {
            .main-nav.mobile-active {
                display: block !important;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                padding: 20px;
                z-index: 1000;
            }
            
            .main-nav.mobile-active ul {
                flex-direction: column;
                gap: 15px;
            }
            
            .main-nav.mobile-active a {
                display: block;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }
        }
    `;
    
    // Inject mobile menu CSS
    const style = document.createElement('style');
    style.textContent = mobileMenuCSS;
    document.head.appendChild(style);
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate elements on page load
        const animateElements = document.querySelectorAll('.promo-item, .category-item, .promotion-item, .feature, .benefit-item');
        
        animateElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
    
    // Add CSS for loading animation
    const loadingCSS = `
        .promo-item, .category-item, .promotion-item, .feature, .benefit-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        body.loaded .promo-item,
        body.loaded .category-item,
        body.loaded .promotion-item,
        body.loaded .feature,
        body.loaded .benefit-item {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = loadingCSS;
    document.head.appendChild(loadingStyle);
    
    console.log('MaBelle website initialized successfully!');
}); 