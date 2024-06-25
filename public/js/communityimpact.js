
    document.addEventListener('DOMContentLoaded', function () {
        const texts = [
            {
                text: '<div style="display: inline;"><span style="font-size: 100px; color: #6CC24A; line-height: 0.3; vertical-align: middle;">“</span><span style="line-height: 0.3; margin: 0 10px; display: inline; vertical-align: middle; margin-right: -20px;">We improve the communities in which we live and work by increasing food security, and access to essential resources, education, and athletics.</span><span style="font-size: 100px; color: #6CC24A; line-height: 0.3; position: relative; top: 40px;">”</span></div>',
duration: 5000


            },
            {
                text: '<div style="display: inline;"><span style="font-size: 100px; color: #6CC24A; line-height: 1; vertical-align: middle;">“</span><span style="line-height: 1.3; margin: 0 10px; display: inline; vertical-align: middle; margin-right: -20px;">Our goal is to have a positive impact on the world.</span><span style="font-size: 100px; color: #6CC24A; line-height: 1; vertical-align: middle; position: relative; top: 10px;">”</span></div>',
                duration: 10000
            }
        ];

        const quoteElement = document.getElementById('quoteText');
        let index = 0;

        function applyStyles() {
            quoteElement.style.width = '100%';
            quoteElement.style.textAlign = 'center';
            quoteElement.style.color = '#000638';
            quoteElement.style.fontSize = '40px';
            quoteElement.style.fontFamily = "'Satoshi', sans-serif";
            quoteElement.style.fontWeight = '500';
            quoteElement.style.position = 'relative';
            quoteElement.style.overflow = 'hidden';
            quoteElement.style.opacity = '0';
            quoteElement.style.display = 'flex';
            quoteElement.style.justifyContent = 'center';
            quoteElement.style.alignItems = 'center';
        }

        function displayNextText() {
            quoteElement.classList.remove('slide-in');
            quoteElement.classList.add('slide-out');

            setTimeout(() => {
                index = (index + 1) % texts.length;
                quoteElement.innerHTML = texts[index].text;
                quoteElement.classList.remove('slide-out');
                quoteElement.classList.add('slide-in');
            }, 1000); // Duration of slide-out animation

            setTimeout(displayNextText, texts[index].duration + 1000); // Adding 1s for the transition
        }

        // Initial display for the first text duration without animation
        setTimeout(() => {
            applyStyles();
            quoteElement.innerHTML = texts[0].text;
            quoteElement.classList.add('slide-in');
            setTimeout(displayNextText, texts[0].duration);
        }, 0); // Start the initial text display immediately

        // Carousel functionality
        const carousel = document.querySelector('.carousel');
        const dots = document.querySelectorAll('.navigation-dot');
        const images = Array.from(document.querySelectorAll('.community-image'));
        const imageCount = images.length;
        const imageWidth = images[0].offsetWidth + 20; // width + gap
        const visibleImages = 4;
        let currentIndex = 0;

        // Clone images to achieve circular effect
        function cloneImages() {
            images.forEach(image => {
                const cloneFirst = image.cloneNode(true);
                const cloneLast = image.cloneNode(true);
                carousel.appendChild(cloneFirst);
                carousel.insertBefore(cloneLast, carousel.firstChild);
            });
        }

        function updateCarousel(newIndex) {
            currentIndex = newIndex;
            const offset = -((currentIndex + imageCount) % imageCount) * imageWidth;
            carousel.style.transition = 'transform 0.5s ease';
            carousel.style.transform = `translateX(${ offset }px)`;
            dots.forEach((dot, dotIndex) => {
                dot.querySelector('circle').setAttribute('fill', dotIndex === currentIndex % imageCount ? '#6CC24A' : '#CAD9C5');
            });
        }

        // Move to the clicked dot's index
        dots.forEach(dot => {
            dot.addEventListener('click', function () {
                const newIndex = parseInt(dot.getAttribute('data-index'));
                updateCarousel(newIndex);
            });
        });

        // Handle the transition end to wrap around seamlessly
        carousel.addEventListener('transitionend', () => {
            if (currentIndex < 0) {
                currentIndex += imageCount;
                carousel.style.transition = 'none';
                carousel.style.transform = `translateX(${- ((currentIndex + imageCount) % imageCount) * imageWidth}px)`;
            } else if (currentIndex >= imageCount) {
                currentIndex -= imageCount;
                carousel.style.transition = 'none';
                carousel.style.transform = `translateX(${- ((currentIndex + imageCount) % imageCount) * imageWidth}px)`;
            }
        });

        // Initial setup
        cloneImages();
        updateCarousel(0);
    });