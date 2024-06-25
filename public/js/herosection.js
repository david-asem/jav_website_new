document.addEventListener('DOMContentLoaded', function () {
    const heroVideo = document.getElementById('heroVideo');
    const playPauseIcon = document.getElementById('playPauseIcon');
    const muteIcon = document.getElementById('muteIcon');
    const tooltip = document.getElementById('tooltip');
    const gotItButton = document.getElementById('gotItButton');
    let userPaused = false;

    heroVideo.addEventListener('error', function(e) {
        console.error('Video error:', e);
    });

    // Play/Pause icon event listener
    playPauseIcon.addEventListener('click', function () {
        if (heroVideo.paused) {
            heroVideo.play();
            userPaused = false;
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
        } else {
            heroVideo.pause();
            userPaused = true;
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
        }
    });

    // Mute/Unmute icon event listener
    muteIcon.addEventListener('click', function () {
        heroVideo.muted = !heroVideo.muted;
        if (heroVideo.muted) {
            muteIcon.classList.remove('fa-volume-up');
            muteIcon.classList.add('fa-volume-mute');
        } else {
            muteIcon.classList.remove('fa-volume-mute');
            muteIcon.classList.add('fa-volume-up');
        }
    });

    // Function to check if the video is 2/3 in the viewport
    function checkVideoInView() {
        const rect = heroVideo.getBoundingClientRect();
        const videoHeight = rect.height;
        const threshold = videoHeight * (2 / 3);
        const isInView = (
            rect.bottom >= threshold &&
            rect.top <= (window.innerHeight - threshold)
        );

        if (isInView && !userPaused) {
            heroVideo.play();
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
        } else if (!isInView) {
            heroVideo.pause();
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
        }
    }

    // Function to check if the tooltip should be hidden
    function checkTooltipInView() {
        const heroSec = document.getElementById('heroSec');
        const rect = heroSec.getBoundingClientRect();
        if (rect.bottom < 0) {
            tooltip.style.display = 'none';
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', function() {
        checkVideoInView();
        checkTooltipInView();
    });

    // Initial check
    checkVideoInView();

    // Show tooltip on page load
    tooltip.style.display = 'block';

    // Close tooltip when "Got it!" button is clicked
    gotItButton.addEventListener('click', function () {
        tooltip.style.display = 'none';
    });
});
