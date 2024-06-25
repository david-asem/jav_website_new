function carousel() {
        return {
            slides: [
                { label: 'JAV Finance', image: '/images/javolin_finance.png', active: false, flipped: false, hovered: false, content:'JAVOLIN provides investors and lenders an opportunity to earn a stable and predictable return by participating in its Agri Commodities trading platform.' },
                { label: 'JAV Tech', image: '/images/javolin_tech.png', active: false, flipped: false, hovered: false, content:'We offer specific services such as digital Know Your Customer (KYC), access to proprietary APIs, and digital collections to financial institutions, businesses, and government entities.'  },
                { label: 'JAV Infrastructure', image: '/images/infra.png', active: true, flipped: false, hovered: false, content:'Our digital infrastructure connects multi location enterprises and provides collections software for businesses and government entities across a variety of fees and taxes.'},
                { label: 'JAV Payments', image: '/images/fx.png', active: false, flipped: false, hovered: false, content:'Via our digital wallet, we are able to facilitate B2B payments domestically and internationally to countries across the globe in multiple currencies.' },
                { label: 'JAV AgriCommodities', image: '/images/commodities.png', active: false, flipped: false, hovered: false, content:'We own and actively trade cashew and cassava from the continent of Africa to international locations in Asia and America. Via our commodities marketplace, buyers can gain access to the availability of the product to be purchased.' },
            ],
            activeSlide: 2, // Initially active slide
            observer: null,

            init() {
                this.arrangeSlides();
                this.observeSection();
            },
            setActiveSlide(index) {
                this.activeSlide = index;
                this.arrangeSlides();
                if (this.slides[index].hovered) {
                    this.flipCard(index); // Flip the card if the mouse is already on it
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
                            // When the section is visible, flip the active card
                            const activeIndex = this.activeSlide;
                            if (this.slides[activeIndex].hovered) {
                                this.flipCard(activeIndex);
                            }
                        }
                    });
                }, { threshold: 0.1 });

                this.observer.observe(section);
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

                return {
                    style: `transform: scale(${scale}); z-index: ${zIndex}; opacity: ${opacity}; transition: transform 1s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1s ease-in; position: absolute; left: ${index * 18.5}%;`,
                    class: `${index === this.activeSlide ? 'w-80 bg-blue-800 ' + textColor : 'w-72 bg-white border border-blue-800 ' + textColor} h-96 rounded-2xl overflow-hidden shadow-lg relative`
                };
            }
        };
    }