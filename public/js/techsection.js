function carousel() {
    return {
        slides: [
            { label: 'JAV Finance', image: '/images/javolin_finance.png', active: false, flipped: false, hovered: false, content: 'JAVOLIN provides investors and lenders an opportunity to earn a stable and predictable return by participating in its Agri Commodities trading platform.' },
            { label: 'JAV Tech', image: '/images/javolin_tech.png', active: false, flipped: false, hovered: false, content: 'We offer specific services such as digital Know Your Customer (KYC), access to proprietary APIs, and digital collections to financial institutions, businesses, and government entities.' },
            { label: 'JAV Infrastructure', image: '/images/infra.png', active: true, flipped: false, hovered: false, content: 'Our digital infrastructure connects multi location enterprises and provides collections software for businesses and government entities across a variety of fees and taxes.' },
            { label: 'JAV Payments', image: '/images/fx.png', active: false, flipped: false, hovered: false, content: 'Via our digital wallet, we are able to facilitate B2B payments domestically and internationally to countries across the globe in multiple currencies.' },
            { label: 'JAV AgriCommodities', image: '/images/commodities.png', active: false, flipped: false, hovered: false, content: 'We own and actively trade cashew and cassava from the continent of Africa to international locations in Asia and America. Via our commodities marketplace, buyers can gain access to the availability of the product to be purchased.' },
        ],
        activeSlide: 2, // Initially active slide
        observer: null,
        startX: 0,
        endX: 0,
        threshold: 50, // Minimum swipe distance to be considered as a swipe

        init() {
            this.arrangeSlides();
            this.observeSection();
            window.addEventListener('resize', this.arrangeSlides.bind(this));
            this.addTouchEvents();
        },
        setActiveSlide(index) {
            if (index >= 0 && index < this.slides.length) {
                this.activeSlide = index;
                this.arrangeSlides();
                if (this.slides[this.activeSlide].hovered) {
                    this.flipCard(this.activeSlide); // Flip the card if the mouse is already on it
                }
            }
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
                if (!slide.active) {
                    slide.flipped = false; // Reset flipped state when arranging slides
                }
            });
        },
        flipCard(index) {
            if (this.slides[index].active) {
                this.slides[index].flipped = true;
            }
        },
        mouseEnter(index) {
            this.slides[index].hovered = true;
            if (this.slides[index].active) {
                this.flipCard(index);
            }
        },
        mouseLeave(index) {
            this.slides[index].hovered = false;
            if (this.slides[index].active) {
                this.slides[index].flipped = false;
            }
        },
        observeSection() {
            const section = document.getElementById('products');
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const activeIndex = this.activeSlide;
                        if (this.slides[activeIndex].hovered) {
                            this.flipCard(activeIndex);
                        }
                    }
                });
            }, { threshold: 0.1 });

            this.observer.observe(section);
        },
        addTouchEvents() {
            const container = document.querySelector('.valuepropositioncarousel');
            container.addEventListener('touchstart', this.touchStart.bind(this));
            container.addEventListener('touchmove', this.touchMove.bind(this));
            container.addEventListener('touchend', this.touchEnd.bind(this));
        },
        touchStart(event) {
            this.startX = event.touches[0].clientX;
        },
        touchMove(event) {
            this.endX = event.touches[0].clientX;
        },
        touchEnd() {
            const distance = this.endX - this.startX;
            if (Math.abs(distance) > this.threshold) {
                if (distance > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        },
        slideStyles(index) {
            const numSlides = this.slides.length;
            const distance = Math.abs(index - this.activeSlide);
            let zIndex = numSlides - distance;
            let scale = 1.099 - 0.095 * distance;
            let textColor = index === this.activeSlide ? 'text-white' : 'text-gray-800';

            if (index === this.activeSlide) {
                scale = 1.1;
            }

            let opacity = index === this.activeSlide ? 1 : 0.5;

            // Default styles for larger screens
            let transform = `scale(${scale})`;
            let left = `${index * 18.5}%`;

            // Mobile-specific styles
            let mobileTransform = transform;
            let mobileLeft = left;
            let mobileZIndex = zIndex;
            let mobileOpacity = opacity;
            let mobileScale = scale;

            if (window.innerWidth <= 768) {
                if (index === this.activeSlide) {
                    mobileTransform = 'translateX(-50%) scale(0.95)'; // Center the active card and scale it down slightly
                    mobileLeft = '50%'; // Center position
                    mobileZIndex = 10; // Ensure the active card is on top
                    mobileOpacity = 1; // Full opacity for active card
                    mobileScale = 0.90; // Scale up the active card
                } else if (index === this.activeSlide - 1 || index === this.activeSlide + 1) {
                    const offset = (index - this.activeSlide) * 100; // Adjust position based on the active slide
                    mobileLeft = `calc(50% + ${offset}px)`; // Adjust position based on the active slide
                    mobileScale = 0.75; // Scale down adjacent non-active cards
                    mobileOpacity = 0.9; // Higher opacity for adjacent non-active cards
                    mobileZIndex = 5; // Lower z-index for adjacent non-active cards
                } else {
                    mobileOpacity = 0; // Hide other non-active cards
                    mobileZIndex = 1; // Ensure hidden cards have the lowest z-index
                }
            }

            return {
                style: `
                    transform: ${window.innerWidth <= 768 ? `translateX(-50%) scale(${mobileScale})` : transform}; 
                    z-index: ${window.innerWidth <= 768 ? mobileZIndex : zIndex}; 
                    opacity: ${window.innerWidth <= 768 ? mobileOpacity : opacity}; 
                    transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.5s ease-in, left 0.5s ease-in; 
                    position: absolute; 
                    left: ${window.innerWidth <= 768 ? mobileLeft : left};
                `,
                class: `${index === this.activeSlide ? 'w-80 h-96 bg-blue-800 ' + textColor : 'w-72 h-96 bg-white border border-blue-800 ' + textColor} rounded-2xl overflow-hidden shadow-lg relative`
            };
        }
    };
}
