
    document.addEventListener('DOMContentLoaded', function () {
        function animateCounter(element, start, end, duration) {
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const progress = currentTime - startTime;
                const current = Math.min(Math.floor(progress / duration * end), end);
                element.innerText = current.toLocaleString();
                if (progress < duration) {
                    requestAnimationFrame(animation);
                }
            }
            requestAnimationFrame(animation);
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counterElement = document.getElementById('counter');
                    counterElement.innerText = '0'; // Reset the counter to 0
                    animateCounter(counterElement, 0, 35000, 3000);
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(document.getElementById('counter'));
    });
