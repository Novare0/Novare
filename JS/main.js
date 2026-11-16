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


/* NOVARE ALBUM */
(() => {
  const grid = document.getElementById('albumGrid');
  if (!grid) return;
  const entries = Array.isArray(window.NOVARE_ALBUM) ? window.NOVARE_ALBUM : [];
  const filters = [...document.querySelectorAll('[data-album-filter]')];
  const known = new Set(filters.map(button => button.dataset.albumFilter));
  const customCategories = [...new Set(entries.map(item => String(item.category || '').toLowerCase()).filter(Boolean))].filter(category => !known.has(category));
  const categoryGrid = document.querySelector('.category-grid');
  customCategories.forEach(category => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'category-card category-custom';
    button.dataset.albumFilter = category;
    const label = document.createElement('span');
    label.textContent = 'NEW / ' + category.toUpperCase();
    const title = document.createElement('strong');
    title.textContent = category.charAt(0).toUpperCase() + category.slice(1) + '.';
    const arrow = document.createElement('i');
    arrow.textContent = '↘';
    button.append(label, title, arrow);
    categoryGrid?.appendChild(button);
    filters.push(button);
  });
  const heading = document.getElementById('albumHeading');
  const count = document.getElementById('albumCount');
  const empty = document.getElementById('albumEmpty');
  const modal = document.getElementById('albumModal');
  const modalMedia = document.getElementById('albumModalMedia');
  const labels = {all:'Todo el archivo',visuals:'Visuals',motion:'Motion',sound:'Sound',digital:'Digital'};
  let activeFilter = 'all';
  const safe = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function render() {
    const visible = entries.filter(item => activeFilter === 'all' || String(item.category).toLowerCase() === activeFilter);
    heading.textContent = labels[activeFilter] || activeFilter.toUpperCase();
    count.textContent = String(visible.length).padStart(2,'0') + ' PIEZAS';
    grid.innerHTML = visible.map((item,index) => {
      const cover = item.cover ? '<img src="' + safe(item.cover) + '" alt="' + safe(item.title) + '" loading="lazy">' : '';
      return '<button class="album-item" type="button" data-entry-index="' + entries.indexOf(item) + '"><span class="album-item-cover">' + cover + '</span><span class="album-item-meta"><span>' + safe(item.category) + ' / ' + safe(item.type || 'piece') + '</span><strong>' + safe(item.title) + '</strong><small>' + safe(item.date || 'NOVARE ARCHIVE') + '</small></span></button>';
    }).join('');
    empty.classList.toggle('is-visible', visible.length === 0);
    grid.querySelectorAll('[data-entry-index]').forEach(card => card.addEventListener('click', () => openEntry(entries[Number(card.dataset.entryIndex)])));
  }
  function openEntry(item) {
    if (!modal || !modalMedia) return;
    document.getElementById('albumModalCategory').textContent = String(item.category || 'NOVARE').toUpperCase();
    document.getElementById('albumModalTitle').textContent = item.title || 'Untitled';
    document.getElementById('albumModalDescription').textContent = item.description || '';
    document.getElementById('albumModalDate').textContent = item.date || '';
    modalMedia.innerHTML = '';
    if (item.type === 'video' && item.media) modalMedia.innerHTML = '<video src="' + safe(item.media) + '" controls autoplay playsinline></video>';
    else if (item.type === 'audio' && item.media) modalMedia.innerHTML = '<audio src="' + safe(item.media) + '" controls></audio>';
    else if (item.type === 'embed' && item.media) modalMedia.innerHTML = '<iframe src="' + safe(item.media) + '" title="' + safe(item.title) + '" loading="lazy" allowfullscreen></iframe>';
    else if (item.media || item.cover) modalMedia.innerHTML = '<img src="' + safe(item.media || item.cover) + '" alt="' + safe(item.title) + '">';
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true'); modalMedia.innerHTML=''; document.body.style.overflow='';
  }
  filters.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.albumFilter;
    filters.forEach(item => item.classList.toggle('is-active', item === button));
    render();
  }));
  modal?.querySelector('.album-modal-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
  const requested = new URLSearchParams(location.search).get('category');
  if (requested && filters.some(button => button.dataset.albumFilter === requested)) {
    activeFilter = requested;
    filters.forEach(button => button.classList.toggle('is-active', button.dataset.albumFilter === requested));
  }
  render();
})();


/* NOVARE GLOBAL NAVIGATION + MOTION */
(() => {
  const nav = document.querySelector('.site-header .nav-bar');
  if (!nav) return;
  const toggle = nav.querySelector('.menu-toggle');
  const links = nav.querySelector('.nav-links');
  const closeMenu = () => {
    if (!toggle || !links) return;
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    toggle.textContent = '☰';
  };
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = !links.classList.contains('is-open');
      links.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      toggle.textContent = open ? '×' : '☰';
    });
    links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', event => {
      if (!nav.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  const lastSegment = window.location.pathname.replace(/\/+$/, '').split('/').pop() || '';
  const currentFile = (lastSegment.includes('.') ? lastSegment : 'index.html').toLowerCase();
  links?.querySelectorAll('a').forEach(link => {
    const target = link.getAttribute('href')?.split('?')[0].toLowerCase();
    if (target === currentFile || (currentFile === '' && target === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  const main = document.querySelector('main');
  if (main) main.classList.add('page-enter');
  const motionTargets = document.querySelectorAll(
    '.section-heading, .service-grid .card, .products-page-cta, .product-card, .contact-info, .album-explore, .album-feed'
  );
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    motionTargets.forEach(element => element.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  motionTargets.forEach(element => {
    element.classList.add('reveal-on-scroll');
    observer.observe(element);
  });
})();


/* NOVARE THEME CONTROL — dark by default */
(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  let theme = 'dark';
  try {
    theme = localStorage.getItem('novare-theme') === 'light' ? 'light' : 'dark';
  } catch (_) {}
  const apply = () => {
    root.dataset.theme = theme;
    if (!button) return;
    const isDark = theme === 'dark';
    button.textContent = isDark ? '☼' : '☾';
    button.setAttribute('aria-pressed', String(isDark));
    button.setAttribute('aria-label', isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    button.title = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
  };
  apply();
  button?.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('novare-theme', theme); } catch (_) {}
    apply();
  });
})();
