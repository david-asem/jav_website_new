document.addEventListener('DOMContentLoaded', function () {

       // News Item Overlay
    const newsLinks = document.querySelectorAll('.news-link');
    const newsOverlay = document.getElementById('newsOverlay');
    const closeNewsOverlay = document.getElementById('closeNewsOverlay');

    newsLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            newsOverlay.classList.remove('hidden');
            document.body.classList.add('modal-open');
        });
    });

    closeNewsOverlay.addEventListener('click', function () {
        newsOverlay.classList.add('hidden');
        document.body.classList.remove('modal-open');
    });

    newsOverlay.addEventListener('click', function (event) {
        if (event.target === newsOverlay) {
            newsOverlay.classList.add('hidden');
            document.body.classList.remove('modal-open');
        }
    });



   // Image Overlay
    const imageLinks = document.querySelectorAll('.image-link');
    const imageOverlay = document.getElementById('imageOverlay');
    const fullSizeImage = document.getElementById('fullSizeImage');
    const closeImageOverlay = document.getElementById('closeImageOverlay');

    imageLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const fullImageSrc = '/images/food_show_full.jpg';
            fullSizeImage.src = fullImageSrc;
            imageOverlay.classList.remove('hidden');
            document.body.classList.add('modal-open');
        });
    });

    closeImageOverlay.addEventListener('click', function () {
        imageOverlay.classList.add('hidden');
        fullSizeImage.src = '';
        document.body.classList.remove('modal-open');
    });

    imageOverlay.addEventListener('click', function (event) {
        if (event.target === imageOverlay) {
            imageOverlay.classList.add('hidden');
            fullSizeImage.src = '';
            document.body.classList.remove('modal-open');
        }
    });

        // Video Overlay
        const videoLinks = document.querySelectorAll('.video-link');
        const videoOverlay = document.getElementById('videoOverlay');
        const videoFrame = document.getElementById('videoFrame');
        const closeOverlay = document.getElementById('closeOverlay');

        videoLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                const videoId = this.getAttribute('data-video-id');
                videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    videoOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
            });
        });

    closeOverlay.addEventListener('click', function () {
        videoOverlay.classList.add('hidden');
        videoFrame.src = '';
        document.body.classList.remove('modal-open');
    });

    videoOverlay.addEventListener('click', function (event) {
        if (event.target === videoOverlay) {
            videoOverlay.classList.add('hidden');
            videoFrame.src = '';
            document.body.classList.remove('modal-open');
        }
    });
    });