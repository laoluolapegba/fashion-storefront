/**
 * ══════════════════════════════════════════════════════
 *  ASO EBI ELEGANCE — APP (js/app.js)
 *
 *  All UI logic lives here. Data fetching is delegated
 *  entirely to js/data.js — swap that file for a real
 *  API and this file needs zero changes.
 *
 *  Sections:
 *   1. State
 *   2. DOM references
 *   3. Init
 *   4. Header / Navigation
 *   5. Products
 *   6. Gallery
 *   7. Services
 *   8. Cart
 *   9. Quick-view Modal
 *  10. Forms (Inquiry & Newsletter)
 *  11. Toast
 *  12. Helpers
 * ══════════════════════════════════════════════════════
 */

'use strict';

/* ─────────────────────────────────────
   1. STATE
───────────────────────────────────── */
const state = {
  allProducts:  [],         // full product list from data layer
  filtered:     [],         // currently displayed products
  activeCategory: 'all',
  cart:         loadCart(), // { id, name, category, price, image, sizes, quantity }[]
  wishlist:     loadWishlist(),
  activeModal:  null,       // product id currently in modal
};

const NGN = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 });

/* ─────────────────────────────────────
   2. DOM REFERENCES
   Cached at startup — avoids repeated querySelector calls.
───────────────────────────────────── */
const $ = id => document.getElementById(id);
const dom = {
  productsGrid:    $('productsGrid'),
  galleryGrid:     $('galleryGrid'),
  servicesGrid:    $('servicesGrid'),
  resultsCount:    $('resultsCount'),
  sortSelect:      $('sortSelect'),

  // Header
  cartToggleBtn:   $('cartToggleBtn'),
  cartBadge:       $('cartBadge'),
  mobileMenuBtn:   $('mobileMenuBtn'),
  mobileNav:       $('mobileNav'),
  mobileNavClose:  $('mobileNavClose'),

  // Cart
  cartOverlay:     $('cartOverlay'),
  cartSidebar:     $('cartSidebar'),
  cartBody:        $('cartBody'),
  cartFooter:      $('cartFooter'),
  cartTotal:       $('cartTotal'),
  cartCloseBtn:    $('cartCloseBtn'),
  checkoutBtn:     $('checkoutBtn'),

  // Modal
  modalOverlay:    $('modalOverlay'),
  modal:           $('modal'),
  modalClose:      $('modalClose'),
  modalImg:        $('modalImg'),
  modalCategory:   $('modalCategory'),
  modalTitle:      $('modalTitle'),
  modalRating:     $('modalRating'),
  modalPrice:      $('modalPrice'),
  modalOldPrice:   $('modalOldPrice'),
  modalDesc:       $('modalDesc'),
  sizeOptions:     $('sizeOptions'),
  modalAddBtn:     $('modalAddBtn'),
  modalWishBtn:    $('modalWishBtn'),

  // Forms
  inquiryForm:     $('inquiryForm'),
  inquiryMsg:      $('inquiryMsg'),
  newsletterForm:  $('newsletterForm'),
  newsletterMsg:   $('newsletterMsg'),

  // Toast
  toast:           $('toast'),
  toastMsg:        $('toastMsg'),

  // Footer
  copyrightYear:   $('copyrightYear'),
};

/* ─────────────────────────────────────
   3. INIT
───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  // Icons (Lucide)
  if (window.lucide) lucide.createIcons();

  // Footer year
  if (dom.copyrightYear) dom.copyrightYear.textContent = new Date().getFullYear();

  // Kick off parallel data loads
  await Promise.all([
    initProducts(),
    initGallery(),
    initServices(),
  ]);

  // Wire up all event listeners
  bindHeader();
  bindFilters();
  bindSort();
  bindCart();
  bindModal();
  bindForms();

  // Reflect persisted cart in badge
  updateCartBadge();
  renderCartItems();
});


/* ─────────────────────────────────────
   4. HEADER / NAVIGATION
───────────────────────────────────── */
function bindHeader() {
  // Mobile menu open
  dom.mobileMenuBtn?.addEventListener('click', () => {
    dom.mobileNav.classList.add('open');
    dom.mobileNav.setAttribute('aria-hidden', 'false');
    dom.mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  });

  // Mobile menu close
  dom.mobileNavClose?.addEventListener('click', closeMobileNav);

  // Close mobile menu on link click
  dom.mobileNav?.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Sub-nav category buttons (sync with filter pills)
  document.querySelectorAll('.sub-nav-link[data-category]').forEach(btn => {
    btn.addEventListener('click', () => filterByCategory(btn.dataset.category));
  });
}

function closeMobileNav() {
  dom.mobileNav.classList.remove('open');
  dom.mobileNav.setAttribute('aria-hidden', 'true');
  dom.mobileMenuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}


/* ─────────────────────────────────────
   5. PRODUCTS
───────────────────────────────────── */
async function initProducts() {
  renderProductSkeletons(8);
  try {
    state.allProducts = await getProducts();
    state.filtered    = [...state.allProducts];
    renderProducts(state.filtered);
  } catch (err) {
    dom.productsGrid.innerHTML = `<div class="grid-message">Unable to load products. <button onclick="initProducts()">Try again</button></div>`;
    console.error('[Products]', err);
  }
}

/** Render skeleton placeholders while loading */
function renderProductSkeletons(count) {
  dom.productsGrid.innerHTML = Array.from({ length: count }, () => `
    <div class="skeleton-card">
      <div class="skel skel-img"></div>
      <div class="skel skel-line w80"></div>
      <div class="skel skel-line w50"></div>
      <div class="skel skel-line w30" style="margin-bottom:1rem"></div>
    </div>
  `).join('');
}

/** Render a list of product objects to the grid */
function renderProducts(products) {
  updateResultsCount(products.length);

  if (!products.length) {
    dom.productsGrid.innerHTML = '<div class="grid-message">No products found for this filter.</div>';
    return;
  }

  dom.productsGrid.innerHTML = products.map(buildProductCard).join('');

  // Re-init icons for newly injected HTML
  if (window.lucide) lucide.createIcons();
}

/** Build a single product card's HTML string */
function buildProductCard(product) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  const badgeHTML = buildBadge(product.badge, discount);
  const starsHTML = buildStars(product.rating);

  return `
    <article class="product-card" data-id="${product.id}" aria-label="${escHtml(product.name)}">
      <div class="card-image-wrap">
        <img
          src="${escHtml(product.image)}"
          alt="${escHtml(product.name)}"
          loading="lazy"
          onerror="this.style.opacity='0'"
        >
        ${badgeHTML}
        <button
          class="card-add-btn"
          aria-label="Add ${escHtml(product.name)} to cart"
          onclick="addToCart(${product.id})"
        >
          <i data-lucide="plus" aria-hidden="true"></i>
        </button>
      </div>
      <div class="card-body">
        <p class="card-category">${escHtml(categoryLabel(product.category))}</p>
        <h3 class="card-title">${escHtml(product.name)}</h3>
        <div class="card-stars">
          <span class="stars" aria-label="${product.rating} out of 5 stars">${starsHTML}</span>
          <span>(${product.reviewCount})</span>
        </div>
        <div class="card-price-row">
          <span class="card-price">${NGN.format(product.price)}</span>
          ${product.oldPrice ? `<span class="card-old-price">${NGN.format(product.oldPrice)}</span>` : ''}
          ${discount         ? `<span class="card-discount">-${discount}%</span>` : ''}
        </div>
        <!-- Mobile: inline add button (no hover required) -->
        <button
          class="btn btn-primary btn-full card-add-mobile"
          onclick="addToCart(${product.id})"
          aria-label="Add to cart"
        >Add to Cart</button>
        <!-- Quick view -->
        <button
          class="btn btn-outline btn-full"
          onclick="openModal(${product.id})"
          style="margin-top:var(--sp-2)"
          aria-label="Quick view ${escHtml(product.name)}"
        >Quick View</button>
      </div>
    </article>
  `;
}

function buildBadge(badge, discount) {
  if (!badge && !discount) return '';
  const map = { top: ['badge-top', 'Top Pick'], new: ['badge-new', 'New'], low: ['badge-low', 'Low Stock'] };
  if (badge && map[badge]) {
    const [cls, label] = map[badge];
    return `<span class="card-badge ${cls}">${label}</span>`;
  }
  if (discount) return `<span class="card-badge badge-sale">-${discount}%</span>`;
  return '';
}

/* Filter */
function bindFilters() {
  document.querySelectorAll('.pill[data-category], .filter-bar .pill').forEach(btn => {
    btn.addEventListener('click', () => filterByCategory(btn.dataset.category));
  });
}

function filterByCategory(category) {
  state.activeCategory = category;

  // Sync all pill/subnav buttons
  document.querySelectorAll('.pill[data-category]').forEach(b => {
    b.classList.toggle('active', b.dataset.category === category);
  });
  document.querySelectorAll('.sub-nav-link[data-category]').forEach(b => {
    b.classList.toggle('active', b.dataset.category === category);
  });

  state.filtered = category === 'all'
    ? [...state.allProducts]
    : state.allProducts.filter(p => p.category === category);

  applySort(dom.sortSelect.value);
}

/* Sort */
function bindSort() {
  dom.sortSelect?.addEventListener('change', e => applySort(e.target.value));
}

function applySort(value) {
  const arr = [...state.filtered];
  switch (value) {
    case 'price-asc':  arr.sort((a, b) => a.price - b.price);              break;
    case 'price-desc': arr.sort((a, b) => b.price - a.price);              break;
    case 'rating':     arr.sort((a, b) => b.rating - a.rating);            break;
    default: /* featured — keep original order */ break;
  }
  renderProducts(arr);
}

function updateResultsCount(n) {
  if (dom.resultsCount) dom.resultsCount.textContent = `${n} item${n !== 1 ? 's' : ''}`;
}


/* ─────────────────────────────────────
   6. GALLERY
───────────────────────────────────── */
async function initGallery() {
  try {
    const items = await getGallery();
    dom.galleryGrid.innerHTML = items.map(item => `
      <figure class="gallery-item" aria-label="${escHtml(item.caption)}">
        <img
          src="${escHtml(item.image)}"
          alt="${escHtml(item.caption)}"
          loading="lazy"
          onerror="this.style.display='none'"
        >
        <div class="gallery-placeholder" aria-hidden="true">
          <i data-lucide="image"></i>
          <span>${escHtml(item.caption)}</span>
        </div>
      </figure>
    `).join('');
    if (window.lucide) lucide.createIcons();
  } catch (err) {
    console.error('[Gallery]', err);
  }
}


/* ─────────────────────────────────────
   7. SERVICES
───────────────────────────────────── */
async function initServices() {
  try {
    const services = await getServices();
    dom.servicesGrid.innerHTML = services.map(svc => `
      <article class="service-card">
        <div class="service-icon" aria-hidden="true">
          <i data-lucide="${escHtml(svc.icon)}"></i>
        </div>
        <h3 class="service-title">${escHtml(svc.title)}</h3>
        <p class="service-desc">${escHtml(svc.desc)}</p>
        <p class="service-price">${escHtml(svc.price)}</p>
        <p class="service-note">${escHtml(svc.note)}</p>
        <a href="${escHtml(svc.ctaHref)}" class="btn btn-primary">${escHtml(svc.ctaLabel)}</a>
      </article>
    `).join('');
    if (window.lucide) lucide.createIcons();
  } catch (err) {
    console.error('[Services]', err);
  }
}


/* ─────────────────────────────────────
   8. CART
───────────────────────────────────── */
function bindCart() {
  dom.cartToggleBtn?.addEventListener('click', openCart);
  dom.cartCloseBtn?.addEventListener('click', closeCart);
  dom.cartOverlay?.addEventListener('click', closeCart);
  dom.checkoutBtn?.addEventListener('click', handleCheckout);

  // Escape key closes cart
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (dom.cartSidebar.classList.contains('open')) closeCart();
      if (dom.modalOverlay.classList.contains('open')) closeModal();
    }
  });
}

function openCart() {
  dom.cartSidebar.classList.add('open');
  dom.cartOverlay.classList.add('open');
  dom.cartSidebar.setAttribute('aria-hidden', 'false');
  dom.cartToggleBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  dom.cartSidebar.classList.remove('open');
  dom.cartOverlay.classList.remove('open');
  dom.cartSidebar.setAttribute('aria-hidden', 'true');
  dom.cartToggleBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/** Add a product to cart by id */
function addToCart(id) {
  const product = state.allProducts.find(p => p.id == id);
  if (!product) return;

  const existing = state.cart.find(item => item.id == id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id:       product.id,
      name:     product.name,
      category: product.category,
      price:    product.price,
      image:    product.image,
      quantity: 1,
    });
  }

  saveCart();
  updateCartBadge();
  renderCartItems();
  showToast(`"${truncate(product.name, 34)}" added to cart`);
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id != id);
  saveCart();
  updateCartBadge();
  renderCartItems();
}

function changeQty(id, delta) {
  const item = state.cart.find(i => i.id == id);
  if (!item) return;
  item.quantity = Math.max(0, item.quantity + delta);
  if (item.quantity === 0) {
    removeFromCart(id);
  } else {
    saveCart();
    renderCartItems();
  }
}

function renderCartItems() {
  const totalQty   = state.cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.cart.reduce((s, i) => s + i.price * i.quantity, 0);

  if (!state.cart.length) {
    dom.cartBody.innerHTML = `
      <div class="cart-empty">
        <i data-lucide="shopping-bag" aria-hidden="true"></i>
        <p>Your cart is empty</p>
        <button onclick="closeCart()">Continue Shopping</button>
      </div>`;
    if (dom.cartFooter) dom.cartFooter.style.display = 'none';
    if (window.lucide) lucide.createIcons();
    return;
  }

  dom.cartBody.innerHTML = state.cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img
        class="cart-item-img"
        src="${escHtml(item.image)}"
        alt="${escHtml(item.name)}"
        onerror="this.style.opacity='0'"
      >
      <div class="cart-item-info">
        <p class="cart-item-title">${escHtml(item.name)}</p>
        <p class="cart-item-price">${NGN.format(item.price * item.quantity)}</p>
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)" aria-label="Decrease quantity">−</button>
          <span class="qty-val" aria-label="Quantity: ${item.quantity}">${item.quantity}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)"  aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="cart-remove-btn" onclick="removeFromCart(${item.id})" aria-label="Remove ${escHtml(item.name)}">
        <i data-lucide="trash-2" aria-hidden="true"></i>
      </button>
    </div>
  `).join('');

  if (dom.cartFooter) dom.cartFooter.style.display = '';
  if (dom.cartTotal) dom.cartTotal.textContent = NGN.format(totalPrice);
  if (window.lucide) lucide.createIcons();
}

function updateCartBadge() {
  const qty = state.cart.reduce((s, i) => s + i.quantity, 0);
  dom.cartBadge.textContent = qty;
  dom.cartBadge.classList.toggle('visible', qty > 0);
}

async function handleCheckout() {
  if (!state.cart.length) { showToast('Your cart is empty'); return; }

  const payload = {
    items: state.cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
    total: state.cart.reduce((s, i) => s + i.price * i.quantity, 0),
  };

  try {
    const result = await submitCheckout(payload);
    showToast(result.message);
    state.cart = [];
    saveCart();
    updateCartBadge();
    renderCartItems();
    closeCart();
  } catch (err) {
    showToast('Checkout failed. Please try again.');
    console.error('[Checkout]', err);
  }
}

/* Cart persistence */
function saveCart() {
  try { localStorage.setItem('aee_cart', JSON.stringify(state.cart)); } catch {}
}
function loadCart() {
  try { return JSON.parse(localStorage.getItem('aee_cart') || '[]'); } catch { return []; }
}
function saveWishlist() {
  try { localStorage.setItem('aee_wish', JSON.stringify([...state.wishlist])); } catch {}
}
function loadWishlist() {
  try { return new Set(JSON.parse(localStorage.getItem('aee_wish') || '[]')); } catch { return new Set(); }
}


/* ─────────────────────────────────────
   9. QUICK-VIEW MODAL
───────────────────────────────────── */
function bindModal() {
  dom.modalClose?.addEventListener('click', closeModal);
  dom.modalOverlay?.addEventListener('click', e => {
    if (e.target === dom.modalOverlay) closeModal();
  });
  dom.modalWishBtn?.addEventListener('click', toggleWishFromModal);
}

async function openModal(id) {
  const product = await getProduct(id);
  if (!product) return;

  state.activeModal = id;

  // Populate modal fields
  dom.modalImg.src              = product.image;
  dom.modalImg.alt              = product.name;
  dom.modalCategory.textContent = categoryLabel(product.category);
  dom.modalTitle.textContent    = product.name;
  dom.modalDesc.textContent     = product.description;
  dom.modalPrice.textContent    = NGN.format(product.price);
  dom.modalOldPrice.textContent = product.oldPrice ? NGN.format(product.oldPrice) : '';
  dom.modalRating.innerHTML     = `
    <span class="stars" aria-label="${product.rating} out of 5">${buildStars(product.rating)}</span>
    <span>${product.rating} (${product.reviewCount} reviews)</span>
  `;

  // Size options
  dom.sizeOptions.innerHTML = (product.sizes || []).map((size, i) => `
    <button
      class="size-btn${i === 0 ? ' active' : ''}"
      aria-pressed="${i === 0}"
      onclick="selectSize(this)"
    >${escHtml(size)}</button>
  `).join('');

  // Add to cart from modal
  dom.modalAddBtn.onclick = () => { addToCart(id); closeModal(); };

  // Update wishlist button state
  updateWishBtn(id);

  // Open
  dom.modalOverlay.classList.add('open');
  dom.modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (window.lucide) lucide.createIcons();
}

function closeModal() {
  dom.modalOverlay.classList.remove('open');
  dom.modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  state.activeModal = null;
}

function selectSize(btn) {
  dom.sizeOptions.querySelectorAll('.size-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
}

/* Wishlist */
function toggleWishFromModal() {
  const id = state.activeModal;
  if (!id) return;
  if (state.wishlist.has(id)) {
    state.wishlist.delete(id);
    showToast('Removed from wishlist');
  } else {
    state.wishlist.add(id);
    showToast('Added to wishlist ♡');
  }
  saveWishlist();
  updateWishBtn(id);
}

function updateWishBtn(id) {
  const inWish = state.wishlist.has(id);
  dom.modalWishBtn.setAttribute('aria-pressed', String(inWish));
  dom.modalWishBtn.innerHTML = inWish
    ? '<i data-lucide="heart" aria-hidden="true" style="color:var(--clr-brand);fill:var(--clr-brand)"></i> Wishlisted'
    : '<i data-lucide="heart" aria-hidden="true"></i> Wishlist';
  if (window.lucide) lucide.createIcons();
}


/* ─────────────────────────────────────
   10. FORMS
───────────────────────────────────── */
function bindForms() {
  dom.inquiryForm?.addEventListener('submit', handleInquirySubmit);
  dom.newsletterForm?.addEventListener('submit', handleNewsletterSubmit);
}

async function handleInquirySubmit(e) {
  e.preventDefault();
  setFormMsg(dom.inquiryMsg, '');

  const data = Object.fromEntries(new FormData(dom.inquiryForm).entries());

  // Basic validation
  if (!data.name?.trim())  return setFormMsg(dom.inquiryMsg, 'Please enter your name.', 'error');
  if (!data.email?.trim()) return setFormMsg(dom.inquiryMsg, 'Please enter your email.', 'error');
  if (!isValidEmail(data.email)) return setFormMsg(dom.inquiryMsg, 'Please enter a valid email address.', 'error');

  try {
    const result = await submitInquiry(data);
    setFormMsg(dom.inquiryMsg, result.message, 'success');
    dom.inquiryForm.reset();
    showToast('Inquiry sent! We\'ll be in touch shortly.');
  } catch (err) {
    setFormMsg(dom.inquiryMsg, 'Something went wrong. Please try again.', 'error');
    console.error('[Inquiry]', err);
  }
}

async function handleNewsletterSubmit(e) {
  e.preventDefault();
  const email = dom.newsletterForm.querySelector('input[type="email"]')?.value?.trim();
  setFormMsg(dom.newsletterMsg, '');

  if (!email || !isValidEmail(email)) {
    return setFormMsg(dom.newsletterMsg, 'Please enter a valid email address.', 'error');
  }

  try {
    const result = await subscribeNewsletter(email);
    setFormMsg(dom.newsletterMsg, result.message, 'success');
    dom.newsletterForm.reset();
  } catch (err) {
    setFormMsg(dom.newsletterMsg, 'Subscription failed. Please try again.', 'error');
    console.error('[Newsletter]', err);
  }
}

function setFormMsg(el, msg, type = '') {
  if (!el) return;
  el.textContent  = msg;
  el.className    = 'form-msg' + (type ? ` ${type}` : '');
}


/* ─────────────────────────────────────
   11. TOAST
───────────────────────────────────── */
let _toastTimer;
function showToast(msg, duration = 3500) {
  clearTimeout(_toastTimer);
  dom.toastMsg.textContent = msg;
  dom.toast.classList.add('show');
  _toastTimer = setTimeout(() => dom.toast.classList.remove('show'), duration);
}


/* ─────────────────────────────────────
   12. HELPERS
───────────────────────────────────── */

/** Build star icons string from a numeric rating */
function buildStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

/** Map category slug to display label */
function categoryLabel(cat) {
  return { women: "Women's", men: "Men's", accessories: 'Accessories' }[cat] || cat;
}

/** Sanitise string for use in HTML attributes / text nodes */
function escHtml(str = '') {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#039;');
}

function truncate(str, len) {
  return str.length <= len ? str : str.slice(0, len) + '…';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
