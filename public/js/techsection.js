
var techServices = document.querySelectorAll('.tech-service');
var tsIcons = document.querySelectorAll(".ts-icons .ts");
var techConnectionLines = document.querySelectorAll('.javLineLink path');
var index = 0;
var nextIndex = 1;
// Set the duration for the line animation
var lineAnimationDuration = 2000; // Adjust this to match your line animation duration
var transitionInterval;
var isPaused = false;

function resizeTechServices() {
    techServices.forEach((service) => {
        if (window.innerWidth < 640) { // Mobile screen size
            service.classList.add('w-3/4', 'p-4');
            service.classList.remove('w-full', 'sm:w-[300px]', 'md:w-[400px]', 'lg:w-[500px]');
        } else {
            service.classList.add('w-full', 'sm:w-[300px]', 'md:w-[400px]', 'lg:w-[500px]');
            service.classList.remove('w-3/4', 'p-4');
        }
    });
}

// Initial resize
resizeTechServices();
window.addEventListener('resize', resizeTechServices);

// Handle hover effect
function onMouseOut(element, idx) {
    element.addEventListener('mouseover', function () {
        clearInterval(transitionInterval); // Pause transition
        activateCard(idx); // Show associated content
        isPaused = true;
    });
}

function onMouseOver(element) {
    element.addEventListener('mouseout', function () {
        isPaused = false;
        startTransitionLoop(); // Resume transition
    });
}

function handleHover() {
    tsIcons.forEach((element, idx) => {
        onMouseOut(element, idx);
        onMouseOver(element);
    });
}

// Function to activate a card
function activateCard(index) {
    techServices.forEach((service, idx) => {
        if (idx === index) {
            service.classList.remove('opacity-0');
            service.classList.add('opacity-100');
            tsIcons[idx].classList.remove('unfocus-tech');
        } else {
            service.classList.remove('opacity-100');
            service.classList.add('opacity-0');
            tsIcons[idx].classList.add('unfocus-tech');
        }
    });
    techServices[index].style.transition = "opacity " + 1000 + "ms";
    tsIcons[index].style.transition = "background-color " + 1000 + "ms, fill " + 1000 + "ms, transform " + 1000 + "ms, opacity " + 1000 + "ms";
}

// Function to deactivate a card
function deactivateCard(index) {
    techServices[index].classList.remove('opacity-100');
    techServices[index].classList.add('opacity-0');
    tsIcons[index].classList.add('unfocus-tech');
    techServices[index].style.transition = "opacity " + 1000 + "ms";
    tsIcons[index].style.transition = "background-color " + 1000 + "ms, fill " + 1000 + "ms, transform " + 1000 + "ms, opacity " + 1000 + "ms";
}

// Initial activation
activateCard(index);
handleHover();

// Function to handle the transition
function handleTransition() {
    if (isPaused) return; // Do nothing if paused
    let currentIndex = index;
    nextIndex = (index + 1) % techServices.length;

    // Start the line animation
    techConnectionLines[currentIndex]?.classList.add('animated-line');

    // Wait for the line animation to complete before changing the card
    setTimeout(function () {
        if (isPaused) return; // Do nothing if paused
        // Deactivate current card
        deactivateCard(currentIndex);
        // Remove line animation class from the current line
        techConnectionLines[currentIndex]?.classList.remove('animated-line');

        // Activate next card
        activateCard(nextIndex);

        // Update index
        index = nextIndex;
    }, lineAnimationDuration);
}

// Start the transition loop
function startTransitionLoop() {
    if (transitionInterval) clearInterval(transitionInterval);
    transitionInterval = setInterval(handleTransition, lineAnimationDuration + 1000); // Ensure the interval accounts for both the line animation and card transition durations
}

// Start the transition initially
startTransitionLoop();
