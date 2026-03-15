alter table orders
  add column if not exists shipping_address  text,
  add column if not exists shipping_city     text,
  add column if not exists shipping_state    text,
  add column if not exists shipping_country  text default 'Nigeria',
  add column if not exists paystack_ref      text,
  add column if not exists payment_status    text default 'unpaid';
