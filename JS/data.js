/**
 * ELEVEN08 — DATA LAYER  (JS/data.js)
 * Shared across all pages. Replace function bodies with fetch() for backend.
 */
'use strict';

const _products = [
  { id:1,  name:'Adire Silk Kaftan',         category:'kaftans',  price:85000,  oldPrice:110000, rating:4.9, reviewCount:38,  badge:'top', image:'Images/W material 1.jpg', sizes:['XS','S','M','L','XL','XXL','XXXL'], description:'Flowing hand-dyed adire silk kaftan with a plunge neckline and wide sleeves. Finished with hand-stitched trim at the hem and cuffs. Each piece is one-of-a-kind due to the artisanal dyeing process.' },
  { id:2,  name:'Gold Brocade Kaftan',        category:'kaftans',  price:125000, oldPrice:null,   rating:4.8, reviewCount:22,  badge:'new', image:'Images/W material 2.jpg', sizes:['S','M','L','XL','XXL','XXXL'],       description:'Opulent gold brocade kaftan in a relaxed silhouette with a cinched waist option. A statement piece for ceremonies, owambe, and formal dinners.' },
  { id:3,  name:'Sculptured Lace Gown',       category:'dresses',  price:145000, oldPrice:null,   rating:5.0, reviewCount:14,  badge:'top', image:'Images/W material 3.jpg', sizes:['XS','S','M','L','XL','XXL'],         description:'Structured French lace floor-length gown with a sweetheart neckline and built-in boning. Every seam is hand-finished. Available in ivory, dusty rose, and deep burgundy.' },
  { id:4,  name:'Aso-Oke Wrap Dress',         category:'dresses',  price:95000,  oldPrice:120000, rating:4.7, reviewCount:29,  badge:null,  image:'Images/W material 4.jpg', sizes:['XS','S','M','L','XL','XXL','XXXL'], description:'Handwoven aso-oke fabric reimagined in a contemporary wrap silhouette. The adjustable tie waist flatters all body types.' },
  { id:5,  name:'Chiffon Cascade Dress',      category:'dresses',  price:72000,  oldPrice:88000,  rating:4.5, reviewCount:41,  badge:null,  image:'Images/W material 5.jpg', sizes:['XS','S','M','L','XL','XXL'],         description:'Layered chiffon dress with a waterfall hemline and subtle ruffle detail. Lightweight and perfect for outdoor ceremonies and dinner parties.' },
  { id:6,  name:'Ankara Power Set',           category:'sets',     price:88000,  oldPrice:105000, rating:4.8, reviewCount:33,  badge:'new', image:'Images/W material 6.jpg', sizes:['XS','S','M','L','XL','XXL','XXXL'], description:'Structured crop blazer and wide-leg trouser set in vibrant Ankara print. Lined throughout for comfort.' },
  { id:7,  name:'Lace Bralet & Skirt Set',    category:'sets',     price:115000, oldPrice:null,   rating:4.6, reviewCount:19,  badge:null,  image:'Images/M style 1.jpg',    sizes:['XS','S','M','L','XL'],               description:'Intricate French lace bralet with fully boned structure and a matching high-waist midi skirt. Designed for weddings and high-table events.' },
  { id:8,  name:'Heritage Iro & Buba',        category:'occasion', price:68000,  oldPrice:null,   rating:4.9, reviewCount:52,  badge:'top', image:'Images/M style 2.jpg',    sizes:['XS','S','M','L','XL','XXL','XXXL'], description:'Classic iro and buba in premium aso-oke fabric, fully lined with satin. Includes ìbòrùn (shoulder wrap). A timeless choice for traditional occasions.' },
  { id:9,  name:'Off-Shoulder Evening Gown',  category:'occasion', price:185000, oldPrice:220000, rating:4.7, reviewCount:11,  badge:null,  image:'Images/M style 3.jpg',    sizes:['XS','S','M','L','XL','XXL'],         description:'Dramatic off-shoulder evening gown with a corseted bodice and full skirt. Optional beadwork and embroidery available.' },
  { id:10, name:'The Solstice Piece',         category:'limited',  price:250000, oldPrice:null,   rating:5.0, reviewCount:7,   badge:'low', image:'Images/M style 4.jpg',    sizes:['S','M','L','XL'],                    description:'One of only 10 pieces produced. Hand-embroidered with real gold thread on silk organza. Comes with a certificate of authenticity and Eleven08 garment bag.' },
  { id:11, name:'Noir Editorial Set',         category:'limited',  price:195000, oldPrice:null,   rating:4.9, reviewCount:9,   badge:'low', image:'Images/W style 1.jpg',    sizes:['XS','S','M','L','XL'],               description:'Matte black structured set from our editorial limited run. Features architectural shoulders and a hand-draped skirt. Only 8 pieces remaining.' },
  { id:12, name:'Aso-Ebi Ankara (Cobalt)',    category:'asoebi',   price:55000,  oldPrice:65000,  rating:4.8, reviewCount:64,  badge:null,  image:'Images/W style 2.jpg',    sizes:['XS','S','M','L','XL','XXL','XXXL'], description:'Group-coordinated Ankara Aso-Ebi in cobalt and gold. Minimum 5 units for bulk orders. Contact us for group pricing.' },
  { id:13, name:'Aso-Ebi Lace (Blush)',       category:'asoebi',   price:78000,  oldPrice:null,   rating:4.7, reviewCount:43,  badge:'new', image:'Images/W style 3.jpg',    sizes:['XS','S','M','L','XL','XXL','XXXL'], description:'Premium French lace Aso-Ebi in blush pink with subtle gold threading. Ideal for bridal parties and naming ceremonies.' },
  { id:14, name:'Aso-Ebi Aso-Oke (Cream)',    category:'asoebi',   price:92000,  oldPrice:110000, rating:4.9, reviewCount:31,  badge:null,  image:'Images/W style 4.jpg',    sizes:['XS','S','M','L','XL','XXL','XXXL'], description:'Handwoven cream and gold aso-oke. Each yard is uniquely woven. Custom colours available.' },
];

const _gallery = [
  { id:1, image:'Images/W style 1.jpg', caption:'Gold Brocade Campaign' },
  { id:2, image:'Images/W style 2.jpg', caption:'Cobalt Aso-Ebi Shoot' },
  { id:3, image:'Images/W style 3.jpg', caption:'Blush Lace Editorial' },
  { id:4, image:'Images/W style 4.jpg', caption:'Heritage Iro & Buba' },
  { id:5, image:'Images/M style 1.jpg', caption:'Sculptured Lace Gown' },
  { id:6, image:'Images/M style 2.jpg', caption:'Solstice Limited Edition' },
  { id:7, image:'Images/M style 3.jpg', caption:'Ankara Power Set' },
  { id:8, image:'Images/M style 4.jpg', caption:'Noir Editorial Series' },
];

const _services = [
  { id:1, icon:'scissors', title:'Custom Orders',      desc:'Work with our design team to create a bespoke piece built around your vision and measurements.',         price:'₦80,000 – ₦350,000+', note:'7–14 working days depending on design complexity.', ctaLabel:'Start Your Order',    ctaHref:'order.html' },
  { id:2, icon:'video',    title:'Style Consultations', desc:'Book a private 30–45 minute virtual or in-person session with an Eleven08 stylist.',                    price:'From ₦15,000',         note:'Available virtually or in-studio. Book in advance.', ctaLabel:'Book a Session',     ctaHref:'booking.html' },
  { id:3, icon:'package',  title:'Ready-to-Wear',      desc:'Shop our curated collection of luxury kaftans, statement dresses, two-piece sets and occasion wear.',     price:'₦50,000 – ₦250,000+',  note:'Lagos same-day/next-day · Nationwide · International.', ctaLabel:'Shop Now',         ctaHref:'shop.html' },
];

/* ── Public API ── */
async function getProducts(category = 'all') {
  /* BACKEND: const r = await fetch(`/api/v1/products${category!=='all'?'?category='+category:''}`); return r.json(); */
  return Promise.resolve(category === 'all' ? _products : _products.filter(p => p.category === category));
}
async function getProduct(id) {
  /* BACKEND: const r = await fetch(`/api/v1/products/${id}`); return r.json(); */
  return Promise.resolve(_products.find(p => p.id == id) || null);
}
async function getGallery() {
  /* BACKEND: const r = await fetch('/api/v1/gallery'); return r.json(); */
  return Promise.resolve(_gallery);
}
async function getServices() {
  /* BACKEND: const r = await fetch('/api/v1/services'); return r.json(); */
  return Promise.resolve(_services);
}
async function submitInquiry(payload) {
  /* BACKEND: POST /api/v1/inquiries */
  console.log('[Inquiry]', payload);
  return Promise.resolve({ success:true, message:"Message received! We'll respond within 24 hours." });
}
async function submitCustomOrder(payload) {
  /* BACKEND: POST /api/v1/orders/custom */
  console.log('[CustomOrder]', payload);
  return Promise.resolve({ success:true, message:"Custom order submitted! We'll confirm within 24–48 hours." });
}
async function submitBooking(payload) {
  /* BACKEND: POST /api/v1/bookings */
  console.log('[Booking]', payload);
  return Promise.resolve({ success:true, message:"Appointment request sent! We'll confirm your slot within 24 hours." });
}
async function subscribeNewsletter(email) {
  /* BACKEND: POST /api/v1/newsletter */
  console.log('[Newsletter]', email);
  return Promise.resolve({ success:true, message:"You're on the list! Welcome to Eleven08." });
}
async function submitCheckout(payload) {
  /* BACKEND: POST /api/v1/orders  → returns Paystack payment_url */
  console.log('[Checkout]', payload);
  const orderId = 'E08-' + Date.now();
  return Promise.resolve({ success:true, orderId, message:`Order ${orderId} placed! Redirecting to Paystack...` });
}
