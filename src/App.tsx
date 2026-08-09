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

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`logo ${className}`.trim()} aria-label="PRYME">
      PRYME
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
              className="nav-toggle"
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
