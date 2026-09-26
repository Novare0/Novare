const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalCategory = document.getElementById('modalCategory');
const modalMedia = document.getElementById('modalMedia');
let activeVideo = null;

function closeModal() {
    if (modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
    }

    if (activeVideo) {
        activeVideo.pause();
        activeVideo.currentTime = 0;
        activeVideo = null;
    }

    if (modalMedia) {
        modalMedia.innerHTML = '';
    }
}

function openModal(projectCard) {
    if (!modal || !modalTitle || !modalDescription || !modalCategory || !modalMedia) {
        return;
    }

    modalTitle.textContent = projectCard.dataset.title || 'Proyecto';
    modalDescription.textContent = projectCard.dataset.description || '';
    modalCategory.textContent = projectCard.dataset.category || 'Proyecto';
    modalMedia.innerHTML = '';

    if (projectCard.dataset.type === 'video') {
        activeVideo = document.createElement('video');
        activeVideo.src = projectCard.dataset.videoUrl;
        activeVideo.autoplay = true;
        activeVideo.muted = true;
        activeVideo.playsInline = true;
        activeVideo.loop = true;
        activeVideo.controls = true;
        modalMedia.appendChild(activeVideo);
        activeVideo.play().catch(() => {});
    } else {
        const image = document.createElement('img');
        image.src = projectCard.dataset.imageUrl;
        image.alt = projectCard.dataset.title || 'Proyecto';
        modalMedia.appendChild(image);
    }

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
}

document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('click', () => openModal(card));
});

document.querySelectorAll('[data-close-modal]').forEach((element) => {
    element.addEventListener('click', closeModal);
});

if (modal) {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

document.querySelectorAll('.filter-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter || 'all';

        document.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');

        document.querySelectorAll('.project-card').forEach((card) => {
            const matches = filter === 'all' || card.dataset.type === filter || card.dataset.category === filter;
            card.classList.toggle('is-hidden', !matches);
        });
    });
});
