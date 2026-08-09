import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import "./App.css";

const products = [
  {
    id: "heavy-tee",
    name: "Essential Heavy Tee",
    price: 48,
    tag: "Core",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "bd-hoodie",
    name: "Built Different Hoodie",
    price: 118,
    tag: "Drop 01",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "purpose-pant",
    name: "Purpose Track Pant",
    price: 96,
    tag: "New",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "crest-cap",
    name: "PRYME Crest Cap",
    price: 42,
    tag: "Accessory",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80",
  },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "li";
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref as never} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}

function Crown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`logo-crown ${className}`.trim()}
      viewBox="0 0 160 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Soft under-glow */}
      <ellipse cx="80" cy="92" rx="58" ry="5" fill="#C6A75E" opacity="0.18" />

      {/* Outer crown body */}
      <path
        fill="#9A7D3B"
        d="M16 70 L22 34 L40 52 L52 28 L68 48 L80 14 L92 48 L108 28 L120 52 L138 34 L144 70 Z"
      />
      {/* Mid highlight plate */}
      <path
        fill="#C6A75E"
        d="M20 68 L26 38 L42 54 L54 32 L70 50 L80 20 L90 50 L106 32 L118 54 L134 38 L140 68 Z"
      />
      {/* Inner face */}
      <path
        fill="#E0C57A"
        d="M28 66 L34 44 L46 56 L58 38 L72 54 L80 28 L88 54 L102 38 L114 56 L126 44 L132 66 Z"
      />

      {/* Arched bridges between peaks */}
      <path
        d="M26 40 Q42 56 54 34"
        fill="none"
        stroke="#EED9A0"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M54 34 Q68 52 80 24"
        fill="none"
        stroke="#F3E2A8"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M80 24 Q92 52 106 34"
        fill="none"
        stroke="#F3E2A8"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M106 34 Q118 56 134 40"
        fill="none"
        stroke="#EED9A0"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Engraved side flourishes */}
      <path
        d="M30 58 Q40 50 48 58"
        fill="none"
        stroke="#9A7D3B"
        strokeWidth="1.4"
      />
      <path
        d="M112 58 Q120 50 130 58"
        fill="none"
        stroke="#9A7D3B"
        strokeWidth="1.4"
      />
      <path
        d="M58 60 Q80 50 102 60"
        fill="none"
        stroke="#9A7D3B"
        strokeWidth="1.5"
      />

      {/* Center cross + orb */}
      <circle cx="80" cy="18" r="5.5" fill="#F3E2A8" />
      <circle cx="80" cy="18" r="2.8" fill="#9A7D3B" />
      <rect x="78.2" y="4" width="3.6" height="10" rx="0.6" fill="#EED9A0" />
      <rect x="74" y="7.2" width="12" height="3.2" rx="0.6" fill="#EED9A0" />

      {/* Peak jewels */}
      <circle cx="26" cy="36" r="5" fill="#EED9A0" />
      <circle cx="26" cy="35" r="2.2" fill="#FAF8F2" opacity="0.75" />
      <circle cx="54" cy="30" r="4.2" fill="#C6A75E" />
      <circle cx="54" cy="29" r="1.7" fill="#F3E2A8" />
      <circle cx="106" cy="30" r="4.2" fill="#C6A75E" />
      <circle cx="106" cy="29" r="1.7" fill="#F3E2A8" />
      <circle cx="134" cy="36" r="5" fill="#EED9A0" />
      <circle cx="134" cy="35" r="2.2" fill="#FAF8F2" opacity="0.75" />

      {/* Mid gems (darker cut stones) */}
      <path fill="#7A5F2A" d="M42 54 L46 48 L50 54 L46 58 Z" />
      <path fill="#E0C57A" d="M44.5 52 L46 49.5 L47.5 52 Z" />
      <path fill="#7A5F2A" d="M70 52 L74 45 L78 52 L74 56 Z" />
      <path fill="#F3E2A8" d="M72.6 50 L74 47 L75.4 50 Z" />
      <path fill="#7A5F2A" d="M82 52 L86 45 L90 52 L86 56 Z" />
      <path fill="#F3E2A8" d="M84.6 50 L86 47 L87.4 50 Z" />
      <path fill="#7A5F2A" d="M110 54 L114 48 L118 54 L114 58 Z" />
      <path fill="#E0C57A" d="M112.5 52 L114 49.5 L115.5 52 Z" />

      {/* Crown band */}
      <rect x="12" y="68" width="136" height="16" rx="2" fill="#C6A75E" />
      <rect x="12" y="68" width="136" height="4" fill="#EED9A0" />
      <rect x="12" y="80" width="136" height="4" fill="#9A7D3B" />
      <rect
        x="16"
        y="72.5"
        width="128"
        height="7"
        rx="1"
        fill="none"
        stroke="#F3E2A8"
        strokeWidth="1.2"
      />

      {/* Band jewels */}
      <circle cx="36" cy="76" r="3.2" fill="#FAF8F2" />
      <circle cx="36" cy="75.2" r="1.2" fill="#E0C57A" />
      <circle cx="58" cy="76" r="3.2" fill="#7A5F2A" />
      <circle cx="58" cy="75.2" r="1.1" fill="#EED9A0" />
      <circle cx="80" cy="76" r="3.8" fill="#FAF8F2" />
      <circle cx="80" cy="75" r="1.5" fill="#C6A75E" />
      <circle cx="102" cy="76" r="3.2" fill="#7A5F2A" />
      <circle cx="102" cy="75.2" r="1.1" fill="#EED9A0" />
      <circle cx="124" cy="76" r="3.2" fill="#FAF8F2" />
      <circle cx="124" cy="75.2" r="1.2" fill="#E0C57A" />

      {/* Rivets */}
      <circle cx="20" cy="76" r="1.3" fill="#9A7D3B" />
      <circle cx="140" cy="76" r="1.3" fill="#9A7D3B" />
    </svg>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo ${className}`.trim()} aria-label="PRYME">
      <Crown />
      <span className="logo-word">PRYME</span>
    </span>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  function addToBag(product: (typeof products)[number]) {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] ?? 0) + 1,
    }));
    setToast(`${product.name} added`);
  }

  function submitNewsletter(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
    setEmail("");
  }

  return (
    <div className="site">
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-inner container">
          <a href="#top" className="nav-brand" onClick={() => setMenuOpen(false)}>
            <Logo />
            <span className="nav-mark">™</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#drops">Shop</a>
            <a href="#story">About</a>
            <a href="#ready">Drops</a>
          </nav>

          <div className="nav-actions">
            <a href="#drops" className="nav-cart" aria-label={`Bag, ${cartCount} items`}>
              Bag
              {cartCount > 0 ? <span className="nav-cart-count">{cartCount}</span> : null}
            </a>
            <button
              className={`nav-toggle ${menuOpen ? "is-open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <a href="#drops" onClick={() => setMenuOpen(false)}>
            Shop
          </a>
          <a href="#story" onClick={() => setMenuOpen(false)}>
            About
          </a>
          <a href="#ready" onClick={() => setMenuOpen(false)}>
            Drops
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-label="Welcome to PRYME Apparel">
          <div className="hero-media" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2000&q=80"
              alt=""
              className="hero-image"
            />
            <div className="hero-wash" />
          </div>

          <div className="hero-content container">
            <p className="hero-kicker animate-in">Welcome to PRYME™ Apparel</p>
            <h1 className="hero-brand animate-in animate-in-delay-1">
              <Logo />
            </h1>
            <p className="hero-headline animate-in animate-in-delay-2">
              Built Different. Designed for Greatness.
            </p>
            <p className="hero-support animate-in animate-in-delay-3">
              Elevated essentials for those who move with purpose.
            </p>
            <div className="hero-ctas animate-in animate-in-delay-4">
              <a className="btn btn-primary" href="#drops">
                Shop New Drops
              </a>
              <a className="btn btn-ghost" href="#story">
                Our Standard
              </a>
            </div>
          </div>
        </section>

        <section id="drops" className="drops">
          <div className="container">
            <Reveal className="drops-header">
              <span className="section-label">Current Collection</span>
              <h2 className="section-title">Premium quality. Bold design. No compromises.</h2>
              <p className="section-copy">
                Stay ready—new drops are always on the way.
              </p>
            </Reveal>

            <ul className="product-grid">
              {products.map((product, index) => (
                <Reveal
                  as="li"
                  key={product.id}
                  className={`product reveal-delay-${(index % 3) + 1}`}
                >
                  <article>
                    <button
                      type="button"
                      className="product-media"
                      onClick={() => addToBag(product)}
                      aria-label={`Add ${product.name} to bag`}
                    >
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <span className="product-tag">{product.tag}</span>
                      <span className="product-add">Add to bag</span>
                    </button>
                    <div className="product-meta">
                      <h3>{product.name}</h3>
                      <p>${product.price}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section id="story" className="story">
          <div className="story-media" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
              alt=""
              loading="lazy"
            />
          </div>
          <Reveal className="story-panel">
            <span className="section-label">The Standard</span>
            <h2 className="section-title">Where ambition meets style.</h2>
            <p>
              Built for leaders, creators, and those who refuse to blend in.
              Premium streetwear. Unmatched quality. Built Different.
            </p>
            <a className="btn btn-primary" href="#drops">
              Explore Essentials
            </a>
          </Reveal>
        </section>

        <section id="ready" className="ready">
          <div className="container ready-inner">
            <Reveal>
              <span className="section-label">Stay Ready</span>
              <h2 className="section-title">New collections dropping regularly.</h2>
              <p className="section-copy">
                Be first to know when the next PRYME drop lands. No noise—just the
                pieces built for how you move.
              </p>
            </Reveal>

            <Reveal className="reveal-delay-2">
              {joined ? (
                <p className="ready-success" role="status">
                  You’re on the list. Stay ready.
                </p>
              ) : (
                <form className="ready-form" onSubmit={submitNewsletter}>
                  <label className="sr-only" htmlFor="email">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className="btn btn-primary" type="submit">
                    Join Drop List
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <Logo />
            <p>Premium streetwear. Elevated essentials. Built Different.</p>
          </div>
          <div className="footer-links">
            <a href="#drops">Shop</a>
            <a href="#story">About</a>
            <a href="#ready">Drops</a>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} PRYME™ Apparel</p>
        </div>
      </footer>

      {toast ? (
        <div className="toast" role="status" aria-live="polite">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
