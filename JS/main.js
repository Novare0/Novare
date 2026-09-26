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

const productModal = document.getElementById('productModal');
const productModalImage = document.getElementById('productModalImage');
const productModalTitle = document.getElementById('productModalTitle');
const productModalDescription = document.getElementById('productModalDescription');
const productModalPrice = document.getElementById('productModalPrice');
const productContactModal = document.getElementById('productContactModal');
const contactProductName = document.getElementById('contactProductName');
const contactEmail = document.getElementById('contactEmail');
const productContactButton = document.querySelector('[data-open-contact-modal]');
let activeContactTrigger = null;
let activeProductCard = null;

function closeProductContactModal() {
    if (!productContactModal) {
        return;
    }

    productContactModal.classList.remove('is-open');
    productContactModal.setAttribute('aria-hidden', 'true');

    if (activeContactTrigger) {
        activeContactTrigger.focus();
        activeContactTrigger = null;
    }
}

function closeProductModal() {
    if (!productModal) {
        return;
    }

    closeProductContactModal();
    productModal.classList.remove('is-open');
    productModal.setAttribute('aria-hidden', 'true');

    if (activeProductCard) {
        activeProductCard.focus();
        activeProductCard = null;
    }
}

function openProductModal(productCard) {
    if (!productModal || !productModalImage || !productModalTitle || !productModalDescription || !productModalPrice) {
        return;
    }

    activeProductCard = productCard;
    productModalTitle.textContent = productCard.dataset.title || 'Producto';
    productModalDescription.textContent = productCard.dataset.description || '';
    productModalPrice.textContent = productCard.dataset.price || '';
    productModalImage.src = productCard.dataset.image || '';
    productModalImage.alt = productCard.dataset.imageAlt || productCard.dataset.title || 'Producto';
    productModal.classList.add('is-open');
    productModal.setAttribute('aria-hidden', 'false');
    productModal.querySelector('.modal-close').focus();
}

document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', () => openProductModal(card));
});

document.querySelectorAll('[data-close-product-modal]').forEach((element) => {
    element.addEventListener('click', closeProductModal);
});

if (productContactButton && productContactModal && contactProductName && contactEmail) {
    productContactButton.addEventListener('click', () => {
        activeContactTrigger = productContactButton;
        contactProductName.textContent = productModalTitle ? productModalTitle.textContent : '';
        contactEmail.href = `mailto:novareestudio@gmail.com?subject=${encodeURIComponent(`Consulta para comprar: ${contactProductName.textContent}`)}`;
        productContactModal.classList.add('is-open');
        productContactModal.setAttribute('aria-hidden', 'false');
        productContactModal.querySelector('.modal-close').focus();
    });
}

document.querySelectorAll('[data-close-contact-modal]').forEach((element) => {
    element.addEventListener('click', closeProductContactModal);
});

document.querySelectorAll('[data-product-filter]').forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.productFilter;
        const cards = document.querySelectorAll('.product-card');
        let visibleCards = 0;

        document.querySelectorAll('[data-product-filter]').forEach((filterButton) => {
            const isActive = filterButton === button;
            filterButton.classList.toggle('active', isActive);
            filterButton.setAttribute('aria-pressed', String(isActive));
        });

        cards.forEach((card) => {
            const isVisible = card.dataset.productCategory === filter;
            card.hidden = !isVisible;
            visibleCards += Number(isVisible);
        });

        const emptyMessage = document.querySelector('.products-empty');
        if (emptyMessage) {
            emptyMessage.hidden = visibleCards > 0;
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (productContactModal && productContactModal.classList.contains('is-open')) {
            closeProductContactModal();
        } else {
            closeProductModal();
        }
    }
});
