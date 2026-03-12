/**
 * ══════════════════════════════════════════════════════
 *  ASO EBI ELEGANCE — DATA LAYER  (js/data.js)
 *
 *  All data is defined here manually so you can:
 *   1. Edit products/gallery/services without touching app logic
 *   2. Swap this file out for real API calls later with zero
 *      changes to app.js — just keep the same exported shape
 *
 *  HOW TO CONNECT A BACKEND LATER:
 *   Replace each exported function below with a fetch() call.
 *   Example:
 *
 *     export async function getProducts() {
 *       const res = await fetch('/api/v1/products');
 *       if (!res.ok) throw new Error('Failed to load products');
 *       return res.json();          // must return same shape
 *     }
 *
 *  Shape contracts are documented above each function.
 * ══════════════════════════════════════════════════════
 */

'use strict';

/* ─────────────────────────────────────
   PRODUCTS
   Required fields per product object:
   {
     id:          number | string   (unique)
     name:        string
     category:    'women' | 'men' | 'accessories'
     price:       number            (NGN, e.g. 45000)
     oldPrice:    number | null     (NGN, null = no discount)
     rating:      number            (0–5, one decimal place)
     reviewCount: number
     badge:       'new' | 'top' | 'low' | null
     image:       string            (path or URL; '' = placeholder)
     sizes:       string[]          (available sizes)
     description: string
   }
───────────────────────────────────── */
const _products = [
  /* ── WOMEN ── */
  {
    id: 1,
    name: 'Adire Wrap Maxi Dress',
    category: 'women',
    price: 45500,
    oldPrice: 65000,
    rating: 4.8,
    reviewCount: 142,
    badge: 'top',
    image: 'Images/W material 1.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Hand-dyed adire fabric in a timeless wrap silhouette. Features a V-neckline, tie waist, and flutter sleeves. Perfect for owambe, church, or formal events.',
  },
  {
    id: 2,
    name: 'Ankara Peplum Blouse',
    category: 'women',
    price: 22000,
    oldPrice: 28000,
    rating: 4.6,
    reviewCount: 98,
    badge: 'new',
    image: 'Images/W material 2.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Bold ankara print peplum blouse with structured shoulders. Pairs beautifully with high-waist trousers or a pencil skirt.',
  },
  {
    id: 3,
    name: 'French Lace Boubou',
    category: 'women',
    price: 95000,
    oldPrice: null,
    rating: 4.9,
    reviewCount: 67,
    badge: 'top',
    image: 'Images/W material 3.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Premium French lace full boubou with embroidered neckline detailing. A statement piece for weddings and high-table events.',
  },
  {
    id: 4,
    name: 'Aso-Oke Off-Shoulder Gown',
    category: 'women',
    price: 72000,
    oldPrice: 85000,
    rating: 4.7,
    reviewCount: 113,
    badge: null,
    image: 'Images/W material 4.jpg',
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Structured aso-oke off-shoulder gown with a mermaid skirt. Lined with premium satin for comfort and a flawless silhouette.',
  },
  {
    id: 5,
    name: 'Chiffon Ruffle Midi Dress',
    category: 'women',
    price: 35000,
    oldPrice: 42000,
    rating: 4.4,
    reviewCount: 55,
    badge: null,
    image: 'Images/W material 5.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Flowy chiffon midi dress with tiered ruffles and a cinched waist. Available in blush, sage, and cobalt blue.',
  },
  {
    id: 6,
    name: 'Kente Print Co-ord Set',
    category: 'women',
    price: 55000,
    oldPrice: 68000,
    rating: 4.5,
    reviewCount: 79,
    badge: 'new',
    image: 'Images/W material 6.jpg',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Two-piece kente-inspired print set: crop top + wide-leg trousers. A modern take on African heritage — perfect for casual luxury events.',
  },

  /* ── MEN ── */
  {
    id: 7,
    name: 'Classic Agbada Set',
    category: 'men',
    price: 88000,
    oldPrice: null,
    rating: 4.9,
    reviewCount: 204,
    badge: 'top',
    image: 'Images/M material 1.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    description: 'Three-piece classic agbada set (grand buba, under-buba, sokoto) in premium embroidered fabric. The definitive choice for aso ebi and formal events.',
  },
  {
    id: 8,
    name: 'Senator Kaftan Set',
    category: 'men',
    price: 42000,
    oldPrice: 52000,
    rating: 4.6,
    reviewCount: 88,
    badge: null,
    image: 'Images/M material 2.jpg',
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Polished senator-style kaftan with matching trousers. Subtle embroidery on the collar and cuffs. Available in ivory, ash, and navy.',
  },
  {
    id: 9,
    name: 'Ankara Print Shirt',
    category: 'men',
    price: 18500,
    oldPrice: 24000,
    rating: 4.3,
    reviewCount: 41,
    badge: null,
    image: 'Images/M material 3.jpg',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Slim-fit ankara print short-sleeve shirt. Great for casual outings, corporate-casual days, and daytime events.',
  },
  {
    id: 10,
    name: 'Aso-Oke Cap (Fila)',
    category: 'men',
    price: 9500,
    oldPrice: null,
    rating: 4.7,
    reviewCount: 132,
    badge: 'top',
    image: 'Images/M material 4.jpg',
    sizes: ['One Size'],
    description: 'Handwoven aso-oke fila (cap) in traditional Yoruba style. Pairs with any agbada or senator set. Custom colours available on request.',
  },

  /* ── ACCESSORIES ── */
  {
    id: 11,
    name: 'Beaded Statement Necklace',
    category: 'accessories',
    price: 14500,
    oldPrice: 18000,
    rating: 4.8,
    reviewCount: 176,
    badge: 'top',
    image: 'Images/A material 1.jpg',
    sizes: ['One Size'],
    description: 'Hand-strung multi-layered beaded necklace in coral, gold, and teal. A timeless accessory for formal and cultural events.',
  },
  {
    id: 12,
    name: 'Red Filigree Gele Set',
    category: 'accessories',
    price: 8500,
    oldPrice: null,
    rating: 4.5,
    reviewCount: 63,
    badge: 'new',
    image: 'Images/A material 2.jpg',
    sizes: ['One Size'],
    description: 'Pre-tied gele head tie in gold-threaded aso-oke. Comes with an ìbòrùn (shoulder wrap). No tying experience needed!',
  },
  {
    id: 13,
    name: 'Leather Beaded Clutch',
    category: 'accessories',
    price: 22000,
    oldPrice: 28000,
    rating: 4.6,
    reviewCount: 47,
    badge: null,
    image: 'Images/A material 3.jpg',
    sizes: ['One Size'],
    description: 'Genuine leather clutch bag with hand-applied bead embellishment. Magnetic closure, suede lining, detachable gold chain.',
  },
  {
    id: 14,
    name: 'Coral Bead Bracelet Stack',
    category: 'accessories',
    price: 7200,
    oldPrice: null,
    rating: 4.4,
    reviewCount: 39,
    badge: null,
    image: 'Images/A material 4.jpg',
    sizes: ['One Size'],
    description: 'Set of three layered coral and gold bead bracelets. A powerful finishing touch for both casual and ceremonial looks.',
  },
];

/* ─────────────────────────────────────
   GALLERY
   Required fields:
   {
     id:      number
     image:   string   (path or URL)
     caption: string
   }
───────────────────────────────────── */
const _gallery = [
  { id: 1, image: 'Images/W style 1.jpg', caption: 'Blue & Gold Wedding Aso Ebi' },
  { id: 2, image: 'Images/M style 1.jpg',       caption: 'Burgundy Bride\'s Train, 2024' },
  { id: 3, image: 'Images/W style 2.jpg',        caption: 'Pink Owambe Matching Set' },
  { id: 4, image: 'Images/M style 2.jpg',      caption: 'Corporate Ankara Group Aso Ebi' },
  { id: 5, image: 'Images/W style 3.jpg',        caption: 'Green French Lace, Naming Ceremony' },
  { id: 6, image: 'Images/M style 3.jpg',      caption: 'Cream Agbada, Men\'s Aso Ebi' },
  { id: 7, image: 'Images/W style 4.jpg',    caption: 'Fuschia Birthday Co-ord Set' },
  { id: 8, image: 'Images/M style 4.jpg',        caption: 'Gele & Accessories Styling' },
];

/* ─────────────────────────────────────
   SERVICES
   Required fields:
   {
     id:       number
     icon:     string  (lucide icon name)
     title:    string
     desc:     string
     price:    string  (display string)
     note:     string
     ctaLabel: string
     ctaHref:  string  (anchor or URL)
   }
───────────────────────────────────── */
const _services = [
  {
    id: 1,
    icon: 'shirt',
    title: 'Custom Design',
    desc: 'Collaborate with our designers to create a unique Aso Ebi outfit tailored to your event and personal style. From the first sketch to the final fitting, every detail is yours.',
    price: '₦75,000 – ₦500,000+',
    note: 'Includes fabric consultation, design sketches, and 2 fittings.',
    ctaLabel: 'Inquire Now',
    ctaHref: '#contact',
  },
  {
    id: 2,
    icon: 'calendar-days',
    title: 'Event Styling & Consultation',
    desc: 'Book a personal session with one of our stylists to discuss your event, fabric choices, colour palette, and receive expert advice tailored to your body type and occasion.',
    price: '₦25,000 – ₦45,000',
    note: 'Session duration: 1–2 hours. Available in-studio or virtually.',
    ctaLabel: 'Book a Consultation',
    ctaHref: '#contact',
  },
  {
    id: 3,
    icon: 'truck',
    title: 'Fabric Sourcing & Delivery',
    desc: 'We source premium fabrics — Ankara, Aso-Oke, French Lace, Chiffon — from our trusted suppliers and deliver nationwide. Bulk Aso Ebi group orders welcome.',
    price: 'Varies by fabric & quantity',
    note: 'Delivery timelines depend on fabric availability and order size.',
    ctaLabel: 'Get a Quote',
    ctaHref: '#contact',
  },
];


/* ══════════════════════════════════════════════════════
   PUBLIC API
   These are the functions app.js calls.
   Replace the bodies with fetch() calls to plug in a backend.
════════════════════════════════════════════════════════ */

/**
 * Returns all products (or filtered by category).
 * @param {string} [category='all']  'all' | 'women' | 'men' | 'accessories'
 * @returns {Promise<typeof _products>}
 */
async function getProducts(category = 'all') {
  /* ── FUTURE BACKEND ─────────────────────────────────
   *   const params = category !== 'all' ? `?category=${category}` : '';
   *   const res    = await fetch(`/api/v1/products${params}`);
   *   if (!res.ok) throw new Error('Failed to fetch products');
   *   return res.json();
   * ─────────────────────────────────────────────────── */
  const data = category === 'all'
    ? _products
    : _products.filter(p => p.category === category);
  return Promise.resolve(data);
}

/**
 * Returns a single product by id.
 * @param {number|string} id
 * @returns {Promise<typeof _products[0] | null>}
 */
async function getProduct(id) {
  /* ── FUTURE BACKEND ─────────────────────────────────
   *   const res = await fetch(`/api/v1/products/${id}`);
   *   if (!res.ok) throw new Error('Product not found');
   *   return res.json();
   * ─────────────────────────────────────────────────── */
  const product = _products.find(p => p.id == id) || null;
  return Promise.resolve(product);
}

/**
 * Returns gallery items.
 * @returns {Promise<typeof _gallery>}
 */
async function getGallery() {
  /* ── FUTURE BACKEND ─────────────────────────────────
   *   const res = await fetch('/api/v1/gallery');
   *   if (!res.ok) throw new Error('Failed to fetch gallery');
   *   return res.json();
   * ─────────────────────────────────────────────────── */
  return Promise.resolve(_gallery);
}

/**
 * Returns service offerings.
 * @returns {Promise<typeof _services>}
 */
async function getServices() {
  /* ── FUTURE BACKEND ─────────────────────────────────
   *   const res = await fetch('/api/v1/services');
   *   if (!res.ok) throw new Error('Failed to fetch services');
   *   return res.json();
   * ─────────────────────────────────────────────────── */
  return Promise.resolve(_services);
}

/**
 * Submits an inquiry form.
 * @param {Object} payload  Fields from the inquiry form
 * @returns {Promise<{ success: boolean, message: string }>}
 */
async function submitInquiry(payload) {
  /* ── FUTURE BACKEND ─────────────────────────────────
   *   const res = await fetch('/api/v1/inquiries', {
   *     method:  'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body:    JSON.stringify(payload),
   *   });
   *   if (!res.ok) throw new Error('Failed to submit inquiry');
   *   return res.json();
   * ─────────────────────────────────────────────────── */
  console.log('[Inquiry submitted]', payload);
  return Promise.resolve({ success: true, message: 'Inquiry received! We\'ll be in touch within 2 hours.' });
}

/**
 * Subscribes an email to the newsletter.
 * @param {string} email
 * @returns {Promise<{ success: boolean, message: string }>}
 */
async function subscribeNewsletter(email) {
  /* ── FUTURE BACKEND ─────────────────────────────────
   *   const res = await fetch('/api/v1/newsletter', {
   *     method:  'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body:    JSON.stringify({ email }),
   *   });
   *   if (!res.ok) throw new Error('Subscription failed');
   *   return res.json();
   * ─────────────────────────────────────────────────── */
  console.log('[Newsletter subscription]', email);
  return Promise.resolve({ success: true, message: 'Thank you for subscribing!' });
}

/**
 * Submits a cart checkout.
 * @param {{ items: Array, total: number }} payload
 * @returns {Promise<{ success: boolean, orderId: string, message: string }>}
 */
async function submitCheckout(payload) {
  /* ── FUTURE BACKEND ─────────────────────────────────
   *   const res = await fetch('/api/v1/orders', {
   *     method:  'POST',
   *     headers: { 'Content-Type': 'application/json' },
   *     body:    JSON.stringify(payload),
   *   });
   *   if (!res.ok) throw new Error('Checkout failed');
   *   return res.json();
   *   // Then redirect to Paystack payment link from response
   * ─────────────────────────────────────────────────── */
  console.log('[Checkout submitted]', payload);
  const orderId = 'AEE-' + Date.now();
  return Promise.resolve({
    success: true,
    orderId,
    message: `Order ${orderId} placed! In production this redirects to Paystack.`,
  });
}
