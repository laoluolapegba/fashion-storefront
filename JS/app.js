/**
 * ELEVEN08 — SHARED APP  (JS/app.js)
 * Cart, modal, toast, nav — used on every page.
 * Page-specific logic is in each page's own <script> block.
 */
'use strict';

const NGN = new Intl.NumberFormat('en-NG', { style:'currency', currency:'NGN', minimumFractionDigits:0 });

/* ── State ── */
const state = {
  allProducts: [],
  wishlist:    loadWishlist(),
  cart:        loadCart(),
  activeModal: null,
};

/* ── DOM shorthand ── */
const $  = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ══════════════════
   INIT (runs on every page)
══════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  const yr = $('copyrightYear'); if (yr) yr.textContent = new Date().getFullYear();
  setActiveNavLink();
  bindMobileNav();
  bindCartUI();
  bindModalUI();
  bindKeyboard();
  updateCartBadge();
  renderCartItems();
});

/* ── Highlight active nav link based on current page ── */
function setActiveNavLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  $$('.primary-nav a, .mobile-nav-link, .site-footer nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === 'index.html' && href === '#')) {
      a.classList.add('active');
    }
  });
}

/* ══════════════════
   MOBILE NAV
══════════════════ */
/* ══════════════════
   MOBILE NAV
══════════════════ */
function bindMobileNav() {
  const btn   = $('mobileMenuBtn');
  const nav   = $('mobileNav');
  const close = $('mobileNavClose');
  if (!btn || !nav) return;

  btn.addEventListener('click', openMobileNav);
  close?.addEventListener('click', closeMobileNav);

  // Close when a nav link is clicked
  nav.querySelectorAll('.mobile-nav-link').forEach(l =>
    l.addEventListener('click', closeMobileNav)
  );

  // Close when clicking outside the nav panel
  nav.addEventListener('click', e => {
    if (e.target === nav) closeMobileNav();
  });
}

function openMobileNav() {
  const nav = $('mobileNav');
  const btn = $('mobileMenuBtn');
  if (!nav || !btn) return;
  nav.classList.add('open');
  nav.setAttribute('aria-hidden', 'false');
  btn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  const nav = $('mobileNav');
  const btn = $('mobileMenuBtn');
  if (!nav || !btn) return;
  nav.classList.remove('open');
  nav.setAttribute('aria-hidden', 'true');
  btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/* ══════════════════
   CART
══════════════════ */
function bindCartUI() {
  $('cartToggleBtn')?.addEventListener('click', openCart);
  $('cartCloseBtn')?.addEventListener('click',  closeCart);
  $('cartOverlay')?.addEventListener('click',   closeCart);
  $('checkoutBtn')?.addEventListener('click',   handleCheckout);
}

function openCart() {
  $('cartSidebar')?.classList.add('open');
  $('cartOverlay')?.classList.add('open');
  $('cartSidebar')?.setAttribute('aria-hidden','false');
  $('cartToggleBtn')?.setAttribute('aria-expanded','true');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  $('cartSidebar')?.classList.remove('open');
  $('cartOverlay')?.classList.remove('open');
  $('cartSidebar')?.setAttribute('aria-hidden','true');
  $('cartToggleBtn')?.setAttribute('aria-expanded','false');
  document.body.style.overflow = '';
}

function addToCart(id) {
  const allP = state.allProducts;
  const p = allP.find(x => x.id == id);
  if (!p) return;
  const ex = state.cart.find(x => x.id == id);
  ex ? ex.quantity++ : state.cart.push({ id:p.id, name:p.name, category:p.category, price:p.price, image:p.image, quantity:1 });
  saveCart(); updateCartBadge(); renderCartItems();
  showToast(`"${truncate(p.name,34)}" added to cart`);
}

function removeFromCart(id) {
  state.cart = state.cart.filter(x => x.id != id);
  saveCart(); updateCartBadge(); renderCartItems();
}

function changeQty(id, delta) {
  const item = state.cart.find(x => x.id == id);
  if (!item) return;
  item.quantity = Math.max(0, item.quantity + delta);
  if (item.quantity === 0) removeFromCart(id);
  else { saveCart(); renderCartItems(); }
}

function renderCartItems() {
  const body   = $('cartBody');
  const footer = $('cartFooter');
  const total  = $('cartTotal');
  if (!body) return;

  const sum = state.cart.reduce((s,i) => s + i.price * i.quantity, 0);

  if (!state.cart.length) {
    body.innerHTML = `
      <div class="cart-empty">
        <i data-lucide="shopping-bag"></i>
        <p>Your cart is empty</p>
        <button onclick="closeCart()">Continue Shopping</button>
      </div>`;
    if (footer) footer.style.display = 'none';
    if (window.lucide) lucide.createIcons(); return;
  }

  body.innerHTML = state.cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img class="ci-img" src="${esc(item.image)}" alt="${esc(item.name)}" onerror="this.style.opacity='0'">
      <div class="ci-info">
        <p class="ci-name">${esc(item.name)}</p>
        <p class="ci-price">${NGN.format(item.price * item.quantity)}</p>
        <div class="qty-ctrl">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
      </div>
      <button class="ci-del" onclick="removeFromCart(${item.id})" aria-label="Remove">
        <i data-lucide="trash-2"></i>
      </button>
    </div>`).join('');

  if (footer) footer.style.display = '';
  if (total)  total.textContent = NGN.format(sum);
  if (window.lucide) lucide.createIcons();
}

function updateCartBadge() {
  const badge = $('cartBadge');
  if (!badge) return;
  const qty = state.cart.reduce((s,i) => s + i.quantity, 0);
  badge.textContent = qty;
  badge.classList.toggle('visible', qty > 0);
}

async function handleCheckout() {
  if (!state.cart.length) { showToast('Your cart is empty'); return; }
  const payload = {
    items: state.cart.map(i => ({ id:i.id, name:i.name, price:i.price, quantity:i.quantity })),
    total: state.cart.reduce((s,i) => s + i.price * i.quantity, 0),
  };
  try {
    const r = await submitCheckout(payload);
    showToast(r.message);
    state.cart = []; saveCart(); updateCartBadge(); renderCartItems(); closeCart();
  } catch { showToast('Checkout failed. Please try again.'); }
}

function saveCart()     { try { localStorage.setItem('e08_cart', JSON.stringify(state.cart)); } catch {} }
function loadCart()     { try { return JSON.parse(localStorage.getItem('e08_cart') || '[]'); } catch { return []; } }
function saveWishlist() { try { localStorage.setItem('e08_wish', JSON.stringify([...state.wishlist])); } catch {} }
function loadWishlist() { try { return new Set(JSON.parse(localStorage.getItem('e08_wish') || '[]')); } catch { return new Set(); } }

/* ══════════════════
   QUICK VIEW MODAL
══════════════════ */
function bindModalUI() {
  $('modalClose')?.addEventListener('click', closeModal);
  $('modalOverlay')?.addEventListener('click', e => { if (e.target === $('modalOverlay')) closeModal(); });
  $('modalWishBtn')?.addEventListener('click', toggleWishFromModal);
}

async function openModal(id) {
  const p = await getProduct(id);
  if (!p) return;
  state.activeModal = id;

  $('modalImg').src             = p.image;
  $('modalImg').alt             = p.name;
  $('modalCat').textContent     = catLabel(p.category);
  $('modalTitle').textContent   = p.name;
  $('modalDesc').textContent    = p.description;
  $('modalPrice').textContent   = NGN.format(p.price);
  $('modalOld').textContent     = p.oldPrice ? NGN.format(p.oldPrice) : '';
  $('modalRating').innerHTML    = `<span class="stars">${buildStars(p.rating)}</span><span>${p.rating}/5 (${p.reviewCount})</span>`;

  $('modalSizes').innerHTML = (p.sizes||[]).map((sz,i) =>
    `<button class="size-btn${i===0?' active':''}" aria-pressed="${i===0}" onclick="selectSize(this)">${esc(sz)}</button>`
  ).join('');

  $('modalAddBtn').onclick = () => { addToCart(id); closeModal(); };
  updateWishBtn(id);

  $('modalOverlay').classList.add('open');
  $('modalOverlay').setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
}

function closeModal() {
  $('modalOverlay')?.classList.remove('open');
  $('modalOverlay')?.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  state.activeModal = null;
}

function selectSize(btn) {
  $$('#modalSizes .size-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
  btn.classList.add('active'); btn.setAttribute('aria-pressed','true');
}

function toggleWishFromModal() {
  const id = state.activeModal; if (!id) return;
  state.wishlist.has(id) ? state.wishlist.delete(id) : state.wishlist.add(id);
  saveWishlist(); updateWishBtn(id);
  showToast(state.wishlist.has(id) ? 'Saved to wishlist' : 'Removed from wishlist');
}
function updateWishBtn(id) {
  const btn = $('modalWishBtn'); if (!btn) return;
  const on = state.wishlist.has(id);
  btn.innerHTML = on
    ? `<i data-lucide="heart" style="fill:var(--orange);stroke:var(--orange)"></i> Wishlisted`
    : `<i data-lucide="heart"></i> Wishlist`;
  if (window.lucide) lucide.createIcons();
}

/* ══════════════════
   KEYBOARD
══════════════════ */
function bindKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if ($('cartSidebar')?.classList.contains('open'))  closeCart();
      if ($('modalOverlay')?.classList.contains('open')) closeModal();
      if ($('mobileNav')?.classList.contains('open')) closeMobileNav();
    }
  });
}

/* ══════════════════
   TOAST
══════════════════ */
let _tt;
function showToast(msg, ms=3500) {
  clearTimeout(_tt);
  const el = $('toast'); if (!el) return;
  $('toastMsg').textContent = msg;
  el.classList.add('show');
  _tt = setTimeout(() => el.classList.remove('show'), ms);
}

/* ══════════════════
   FORM HELPERS
══════════════════ */
function setMsg(el, msg, type='') {
  if (!el) return;
  el.textContent = msg;
  el.className   = 'form-msg' + (type ? ' '+type : '');
}
function formToObj(form) { return Object.fromEntries(new FormData(form).entries()); }
function validEmail(e)   { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

/* ══════════════════
   SHARED HELPERS
══════════════════ */
function buildStars(r) {
  const f=Math.floor(r), h=r%1>=.5?1:0, e=5-f-h;
  return '★'.repeat(f)+(h?'⯨':'')+'☆'.repeat(e);
}

const _catLabels = { kaftans:'Luxury Kaftans', dresses:'Statement Dresses', sets:'Two-Piece Sets', occasion:'Occasion Wear', limited:'Limited Collection', asoebi:'Aso-Ebi' };
function catLabel(cat) { return _catLabels[cat] || cat; }

function esc(str='') {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}
function truncate(str, len) { return str.length<=len ? str : str.slice(0,len)+'…'; }

/* ══════════════════
   PRODUCT RENDERING (used on shop, collections, asoebi pages)
══════════════════ */
function buildProductCard(p) {
  const disc  = p.oldPrice ? Math.round((1 - p.price/p.oldPrice)*100) : null;
  const badge = buildBadge(p.badge, disc);
  return `
    <article class="product-card" data-id="${p.id}" aria-label="${esc(p.name)}">
      <div class="card-img-wrap">
        <img class="card-img" src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="this.style.opacity='0'">
        ${badge}
        <div class="card-hover-layer">
          <button class="card-act primary" onclick="addToCart(${p.id})">Add to Cart</button>
          <button class="card-act"         onclick="openModal(${p.id})">Quick View</button>
        </div>
      </div>
      <div class="card-body">
        <p class="card-cat">${esc(catLabel(p.category))}</p>
        <h3 class="card-name">${esc(p.name)}</h3>
        <div class="card-stars">
          <span class="stars" aria-label="${p.rating} out of 5">${buildStars(p.rating)}</span>
          <span>(${p.reviewCount})</span>
        </div>
        <div class="card-price-row">
          <span class="card-price">${NGN.format(p.price)}</span>
          ${p.oldPrice ? `<span class="card-old-price">${NGN.format(p.oldPrice)}</span>` : ''}
          ${disc        ? `<span class="card-discount">-${disc}%</span>` : ''}
        </div>
        <button class="btn btn-primary btn-full card-add-mobile" onclick="addToCart(${p.id})">Add to Cart</button>
        <button class="btn btn-outline btn-full" onclick="openModal(${p.id})" style="margin-top:.5rem">Quick View</button>
      </div>
    </article>`;
}

function buildBadge(badge, disc) {
  const m = { top:['badge-top','Top Pick'], new:['badge-new','New'], low:['badge-low','Last Few'] };
  if (badge && m[badge]) return `<span class="card-badge ${m[badge][0]}">${m[badge][1]}</span>`;
  if (disc)              return `<span class="card-badge badge-top">-${disc}%</span>`;
  return '';
}

function renderSkeletons(gridId, n=8) {
  const g = $(gridId); if (!g) return;
  g.innerHTML = Array.from({length:n}, ()=>`
    <div class="skeleton-card">
      <div class="skel skel-img"></div>
      <div class="skel skel-line w80"></div>
      <div class="skel skel-line w50"></div>
      <div class="skel skel-line w30" style="margin-bottom:1rem"></div>
    </div>`).join('');
}

function renderProductsToGrid(gridId, list, countId) {
  const g = $(gridId); if (!g) return;
  const n = list.length;
  if (countId) { const c=$(countId); if(c) c.textContent=`${n} piece${n!==1?'s':''}`; }
  if (!n) { g.innerHTML='<div class="grid-msg">No pieces found.</div>'; return; }
  g.innerHTML = list.map(buildProductCard).join('');
  if (window.lucide) lucide.createIcons();
}
