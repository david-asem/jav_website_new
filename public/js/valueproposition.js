function carousel() {
    return {
        slides: [
            { label: 'JAV Finance', image: '/images/javolin_finance.png', content: 'JAVOLIN provides investors and lenders an opportunity to earn a stable and predictable return by participating in its Agri Commodities trading platform.' },
            { label: 'JAV Tech', image: '/images/javolin_tech.png', content: 'We offer specific services such as digital Know Your Customer (KYC), access to proprietary APIs, and digital collections to financial institutions, businesses, and government entities.' },
            { label: 'JAV Infrastructure', image: '/images/infra.png', content: 'Our digital infrastructure connects multi location enterprises and provides collections software for businesses and government entities across a variety of fees and taxes.' },
            { label: 'JAV Payments', image: '/images/fx.png', content: 'Via our digital wallet, we are able to facilitate B2B payments domestically and internationally to countries across the globe in multiple currencies.' },
            { label: 'JAV AgriCommodities', image: '/images/commodities.png', content: 'We own and actively trade cashew and cassava from the continent of Africa to international locations in Asia and America. Via our commodities marketplace, buyers can gain access to the availability of the product to be purchased.' },
        ],
        activeSlide: 2, // Initially active slide
        touchStartX: 0,
        touchEndX: 0,

        init() {
            this.arrangeSlides();
            this.addTouchEvents();
        },
        setActiveSlide(index) {
            this.activeSlide = index;
            this.arrangeSlides();
        },
        nextSlide() {
            this.setActiveSlide((this.activeSlide + 1) % this.slides.length);
        },
        previousSlide() {
            this.setActiveSlide((this.activeSlide - 1 + this.slides.length) % this.slides.length);
        },
        arrangeSlides() {
            this.slides.forEach((slide, index) => {
                slide.active = index === this.activeSlide;
            });
        },
        addTouchEvents() {
            const section = document.getElementById('products');
            section.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
            section.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
            section.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
        },
        handleTouchStart(event) {
            this.touchStartX = event.touches[0].clientX;
        },
        handleTouchMove(event) {
            this.touchEndX = event.touches[0].clientX;
        },
        handleTouchEnd() {
            const threshold = 50; // Minimum distance to be considered a swipe
            const distance = this.touchEndX - this.touchStartX;
            if (distance > threshold) {
                this.previousSlide(); // Swipe right
            } else if (distance < -threshold) {
                this.nextSlide(); // Swipe left
            }
        },
        slideStyles(index) {
            const numSlides = this.slides.length;
            const distance = Math.abs(index - this.activeSlide);
            let zIndex = numSlides - distance;
            let scale = 1.099 - 0.095 * distance; // Each non-active card is slightly smaller than the one before it
            let textColor = index === this.activeSlide ? 'text-white' : 'text-gray-800';

            if (index === this.activeSlide) {
                scale = 1.1;
            }

            let opacity = index === this.activeSlide ? 1.2 : 1.1;

            // Calculate left positioning based on screen size
            let left;
            let classList;
            if (window.innerWidth <= 640) { // Mobile devices
                if (index === this.activeSlide) {
                    left = '50%'; // Center the active slide
                    classList = 'w-72 h-96 bg-blue-800 text-white'; // Active card size for mobile
                } else if (index < this.activeSlide) {
                    left = `calc(50% - ${18.5 * distance}% + 8px)`; // Adjust for better visibility
                    classList = 'w-64 h-80 bg-white border border-blue-800 text-gray-800'; // Non-active card size for mobile
                } else {
                    left = `calc(50% + ${18.5 * distance}% - 8px)`; // Adjust for better visibility
                    classList = 'w-64 h-80 bg-white border border-blue-800 text-gray-800'; // Non-active card size for mobile
                }
            } else { // Desktop and larger screens
                left = `${index * 18.5 + 10}%`; // Shift from left a bit for better centering
                classList = index === this.activeSlide ? 'w-80 h-96 bg-blue-800 text-white' : 'w-72 h-96 bg-white border border-blue-800 text-gray-800';
            }

            return {
                style: `transform: scale(${scale}) translateX(-50%); z-index: ${zIndex}; opacity: ${opacity}; transition: transform 1s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1s ease-in; position: absolute; left: ${left};`,
                class: `rounded-2xl overflow-hidden shadow-lg relative ${classList}`
            };
        }
    };
}
