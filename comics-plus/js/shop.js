/* COMICS PLUS! — Catalog + Cart (localStorage demo shop) */

const PRODUCTS = [
  {
    id: "c-shadow-01",
    title: "Shadow Circuit #1",
    category: "comics",
    type: "Comic",
    price: 4.99,
    tag: "New",
    desc: "A neon noir origin issue. Detective Mara Vale plugs into the underground grid and finds a city that bites back.",
    colors: ["#111110", "#ffe600", "#6e6e66"],
  },
  {
    id: "c-iron-12",
    title: "Iron Harbor #12",
    category: "comics",
    type: "Comic",
    price: 3.99,
    tag: "Bestseller",
    desc: "The docks erupt as rival crews clash over a relic that rewrites memories. Double-sized finale.",
    colors: ["#2f6fd6", "#ffffff", "#ffe600"],
  },
  {
    id: "c-pulse-03",
    title: "Pulse Riders Vol. 3",
    category: "comics",
    type: "Graphic Novel",
    price: 19.99,
    tag: "TPB",
    desc: "Collected arcs of the speedster crew racing across fractured timelines. Includes sketch gallery.",
    colors: ["#111110", "#c9b400", "#e8e8e4"],
  },
  {
    id: "c-void-07",
    title: "Void Choir #7",
    category: "comics",
    type: "Comic",
    price: 4.49,
    tag: "Hot",
    desc: "Choir drones open a rift above the yellow district. Silent panels, loud consequences.",
    colors: ["#111110", "#b8b8b0", "#ffe600"],
  },
  {
    id: "g-blast-arena",
    title: "Blast Arena",
    category: "games",
    type: "Game",
    price: 29.99,
    tag: "Digital",
    desc: "Local and online arena brawler. Smash panels, chain combos, unlock comic skins.",
    colors: ["#ffe600", "#111110", "#ffffff"],
  },
  {
    id: "g-panel-quest",
    title: "Panel Quest",
    category: "games",
    type: "Game",
    price: 24.99,
    tag: "Indie",
    desc: "Turn-based RPG where every battle is a comic page. Flip panels to rewrite the fight.",
    colors: ["#2f6fd6", "#ffe600", "#f5f5f0"],
  },
  {
    id: "g-ink-runners",
    title: "Ink Runners",
    category: "games",
    type: "Game",
    price: 19.99,
    tag: "New",
    desc: "Endless runner across living comic strips. Dodge ink spills, collect power glyphs.",
    colors: ["#111110", "#ffffff", "#ffe600"],
  },
  {
    id: "g-frame-wars",
    title: "Frame Wars",
    category: "games",
    type: "Game",
    price: 39.99,
    tag: "Pre-order",
    desc: "Strategy title: draft heroes, build pages, and out-panel rival publishers.",
    colors: ["#111110", "#c9b400", "#6e6e66"],
  },
  {
    id: "m-logo-tee",
    title: "COMICS PLUS! Tee",
    category: "merch",
    type: "Apparel",
    price: 28.0,
    tag: "Merch",
    desc: "Heavyweight black tee with the official COMICS PLUS! logo print. Soft hand feel, loud presence.",
    colors: ["#111110", "#ffe600", "#ffffff"],
  },
  {
    id: "m-poster-set",
    title: "Strike Poster Set",
    category: "merch",
    type: "Print",
    price: 22.0,
    tag: "Limited",
    desc: "Three 18×24 prints: Shadow Circuit, Blast Arena, and the COMICS PLUS! logo.",
    colors: ["#ffe600", "#111110", "#b8b8b0"],
  },
  {
    id: "m-enamel-pin",
    title: "PLUS! Enamel Pin",
    category: "merch",
    type: "Accessory",
    price: 12.0,
    tag: "Merch",
    desc: "Hard enamel pin with the COMICS PLUS! mark. Locking clasp included.",
    colors: ["#ffe600", "#111110", "#e8e8e4"],
  },
  {
    id: "t-robot-80s",
    title: "Retro Robot Figure",
    category: "toys",
    type: "Vintage Toy",
    price: 34.99,
    tag: "Vintage",
    desc: "Wind-up tin robot restock. Chrome chest plate, yellow eyes, shelf-ready.",
    colors: ["#6e6e66", "#ffe600", "#ffffff"],
  },
  {
    id: "t-castle-set",
    title: "Micro Castle Set",
    category: "toys",
    type: "Vintage Toy",
    price: 42.0,
    tag: "Rare",
    desc: "Complete boxed micro castle with knights. Great display piece for collectors.",
    colors: ["#111110", "#b8b8b0", "#ffe600"],
  },
  {
    id: "c-daybreak-01",
    title: "Daybreak Legion #1",
    category: "comics",
    type: "Comic",
    price: 5.99,
    tag: "Variant",
    desc: "Team book launch with yellow foil variant cover. First appearance of Captain Static.",
    colors: ["#ffffff", "#ffe600", "#111110"],
  },
];

const CART_KEY = "comicsPlusCart";

function money(n) {
  return `$${Number(n).toFixed(2)}`;
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, item) => {
    const p = PRODUCTS.find((x) => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === id);
  if (existing) existing.qty += qty;
  else cart.push({ id, qty });
  saveCart(cart);
  showToast("Added to cart — BAM!");
}

function setQty(id, qty) {
  let cart = getCart();
  qty = Math.max(1, parseInt(qty, 10) || 1);
  cart = cart.map((i) => (i.id === id ? { ...i, qty } : i));
  saveCart(cart);
}

function removeFromCart(id) {
  saveCart(getCart().filter((i) => i.id !== id));
}

function clearCart() {
  saveCart([]);
}

function updateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(cartCount());
  });
}

function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 1800);
}

function coverSVG(product) {
  const [c1, c2, c3] = product.colors;
  const initial = product.title.charAt(0);
  return `
  <svg class="cover" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${product.title}">
    <defs>
      <pattern id="ht-${product.id}" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.2" fill="${c3}" opacity="0.35"/>
      </pattern>
      <linearGradient id="g-${product.id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="300" height="400" fill="url(#g-${product.id})"/>
    <rect width="300" height="400" fill="url(#ht-${product.id})"/>
    <polygon points="0,320 300,260 300,400 0,400" fill="#111110" opacity="0.85"/>
    <rect x="18" y="18" width="70" height="18" fill="#ffe600"/>
    <text x="28" y="31" font-family="Arial Black, sans-serif" font-size="10" fill="#111110">${product.type.toUpperCase()}</text>
    <text x="24" y="120" font-family="Impact, Arial Black, sans-serif" font-size="92" fill="#ffffff" opacity="0.18">${initial}</text>
    <text x="24" y="360" font-family="Impact, Arial Black, sans-serif" font-size="22" fill="#ffe600">${escapeXml(product.title.split(" ")[0].toUpperCase())}</text>
    <text x="24" y="382" font-family="Arial, sans-serif" font-size="12" fill="#e8e8e4">${escapeXml(product.title)}</text>
  </svg>`;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function productCard(p) {
  return `
  <article class="product reveal" data-category="${p.category}" data-id="${p.id}" data-price="${p.price}" data-title="${escapeXml(p.title)}">
    <a href="product.html?id=${encodeURIComponent(p.id)}" class="product-media">
      ${coverSVG(p)}
      <span class="product-tag">${p.tag}</span>
    </a>
    <h3 class="product-title"><a href="product.html?id=${encodeURIComponent(p.id)}">${escapeXml(p.title)}</a></h3>
    <p class="product-meta">${p.type} · ${p.category}</p>
    <div class="product-row">
      <span class="price">${money(p.price)}</span>
      <button class="btn btn-dark btn-sm" type="button" data-add="${p.id}">Add</button>
    </div>
  </article>`;
}

function renderProducts(target, filter = "all", query = "", sort = "featured") {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;

  let list = PRODUCTS.slice();
  if (filter && filter !== "all") list = list.filter((p) => p.category === filter);
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
    );
  }
  if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
  if (sort === "name") list.sort((a, b) => a.title.localeCompare(b.title));

  el.innerHTML = list.length
    ? list.map(productCard).join("")
    : `<p>No products match your filters.</p>`;

  observeReveals();
}

function renderCartPage() {
  const body = document.querySelector("[data-cart-body]");
  const empty = document.querySelector("[data-cart-empty]");
  const layout = document.querySelector("[data-cart-layout]");
  if (!body) return;

  const cart = getCart();
  if (!cart.length) {
    if (layout) layout.hidden = true;
    if (empty) empty.hidden = false;
    return;
  }
  if (layout) layout.hidden = false;
  if (empty) empty.hidden = true;

  body.innerHTML = cart
    .map((item) => {
      const p = PRODUCTS.find((x) => x.id === item.id);
      if (!p) return "";
      return `
      <tr>
        <td>
          <div class="cart-item">
            <div class="cart-thumb">${coverSVG(p)}</div>
            <div>
              <strong>${escapeXml(p.title)}</strong><br>
              <span class="product-meta">${p.type}</span>
            </div>
          </div>
        </td>
        <td>${money(p.price)}</td>
        <td>
          <input type="number" min="1" value="${item.qty}" data-qty-id="${p.id}" style="width:4rem;padding:0.4rem;border:2px solid #0a0a08;text-align:center;">
        </td>
        <td>${money(p.price * item.qty)}</td>
        <td><button class="btn btn-outline btn-sm" type="button" data-remove="${p.id}">Remove</button></td>
      </tr>`;
    })
    .join("");

  const sub = cartSubtotal();
  const ship = sub >= 50 || sub === 0 ? 0 : 4.99;
  const tax = sub * 0.08;
  const total = sub + ship + tax;

  const set = (sel, val) => {
    const n = document.querySelector(sel);
    if (n) n.textContent = money(val);
  };
  set("[data-subtotal]", sub);
  set("[data-shipping]", ship);
  set("[data-tax]", tax);
  set("[data-total]", total);
}

function renderCheckoutSummary() {
  const list = document.querySelector("[data-order-lines]");
  if (!list) return;
  const cart = getCart();
  if (!cart.length) {
    list.innerHTML = `<p>Your cart is empty. <a href="shop.html">Browse the shop</a>.</p>`;
    return;
  }
  list.innerHTML = cart
    .map((item) => {
      const p = PRODUCTS.find((x) => x.id === item.id);
      if (!p) return "";
      return `<div class="summary-row"><span>${escapeXml(p.title)} × ${item.qty}</span><span>${money(p.price * item.qty)}</span></div>`;
    })
    .join("");

  const sub = cartSubtotal();
  const ship = sub >= 50 || sub === 0 ? 0 : 4.99;
  const tax = sub * 0.08;
  const total = sub + ship + tax;
  const set = (sel, val) => {
    const n = document.querySelector(sel);
    if (n) n.textContent = money(val);
  };
  set("[data-subtotal]", sub);
  set("[data-shipping]", ship);
  set("[data-tax]", tax);
  set("[data-total]", total);
}

function renderProductDetail() {
  const root = document.querySelector("[data-product-detail]");
  if (!root) return;
  const id = new URLSearchParams(location.search).get("id") || PRODUCTS[0].id;
  const p = PRODUCTS.find((x) => x.id === id) || PRODUCTS[0];
  root.innerHTML = `
    <div class="detail-media">${coverSVG(p)}</div>
    <div class="detail-info">
      <p class="product-meta">${p.type} · ${p.category} · ${p.tag}</p>
      <h1>${escapeXml(p.title)}</h1>
      <p class="detail-price">${money(p.price)}</p>
      <p>${escapeXml(p.desc)}</p>
      <div class="qty-row">
        <label for="qty">Qty</label>
        <input id="qty" type="number" min="1" value="1">
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;">
        <button class="btn btn-primary" type="button" id="detail-add">Add to cart</button>
        <a class="btn btn-outline" href="shop.html">Back to shop</a>
      </div>
    </div>`;
  document.getElementById("detail-add").addEventListener("click", () => {
    const qty = parseInt(document.getElementById("qty").value, 10) || 1;
    addToCart(p.id, qty);
  });
}

function observeReveals() {
  const nodes = document.querySelectorAll(".reveal:not(.in)");
  if (!nodes.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  nodes.forEach((n) => io.observe(n));
}

function initNav() {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.getAttribute("href") && location.pathname.endsWith(a.getAttribute("href"))) {
      a.classList.add("active");
    }
  });
}

function initShopPage() {
  const grid = document.querySelector("[data-shop-grid]");
  if (!grid) return;

  let filter = grid.dataset.filter || "all";
  let query = "";
  let sort = "featured";

  const apply = () => renderProducts(grid, filter, query, sort);

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      filter = btn.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      apply();
    });
  });

  const search = document.querySelector("[data-search]");
  if (search) {
    search.addEventListener("input", () => {
      query = search.value.trim();
      apply();
    });
  }

  const sortEl = document.querySelector("[data-sort]");
  if (sortEl) {
    sortEl.addEventListener("change", () => {
      sort = sortEl.value;
      apply();
    });
  }

  apply();
}

document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  if (add) {
    addToCart(add.dataset.add, 1);
  }
  const remove = e.target.closest("[data-remove]");
  if (remove) {
    removeFromCart(remove.dataset.remove);
    renderCartPage();
    renderCheckoutSummary();
  }
});

document.addEventListener("change", (e) => {
  const qty = e.target.closest("[data-qty-id]");
  if (qty) {
    setQty(qty.dataset.qtyId, qty.value);
    renderCartPage();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  updateCartCount();
  initShopPage();
  renderProductDetail();
  renderCartPage();
  renderCheckoutSummary();
  observeReveals();

  // Featured grids on home / category pages
  document.querySelectorAll("[data-featured]").forEach((el) => {
    const cat = el.dataset.featured;
    const limit = parseInt(el.dataset.limit || "4", 10);
    let list = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
    list = list.slice(0, limit);
    el.innerHTML = list.map(productCard).join("");
  });
  observeReveals();

  const checkoutForm = document.querySelector("[data-checkout-form]");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!getCart().length) {
        showToast("Cart is empty");
        return;
      }
      clearCart();
      location.href = "success.html";
    });
  }
});

// Expose for debugging in browser console
window.ComicsPlus = { PRODUCTS, getCart, addToCart, clearCart, money };
