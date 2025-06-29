import React, { useState, useRef } from "react";
import "./index.css";

const PRODUCTS = [
  { name: "Wireless Headphones", price: "$99", img: "https://cdn.pixabay.com/photo/2022/10/06/21/49/headphones-7503631_1280.jpg", desc: "High-quality wireless headphones with noise cancellation and long battery life." },
  { name: "Smart Watch", price: "$149", img: "https://cdn.pixabay.com/photo/2021/12/07/14/27/watch-6853385_1280.jpg", desc: "Track your fitness, notifications, and more with this stylish smart watch." },
  { name: "Bluetooth Speaker", price: "$39", img: "https://cdn.pixabay.com/photo/2019/07/02/07/39/bluetooth-4311748_1280.jpg", desc: "Portable Bluetooth speaker with deep bass and 12-hour playtime." },
  { name: "Laptop Stand", price: "$24", img: "https://cdn.pixabay.com/photo/2021/06/13/08/15/laptop-6332544_1280.jpg", desc: "Ergonomic laptop stand for better posture and cooling." },
  { name: "USB-C Hub", price: "$34", img: "https://cdn.pixabay.com/photo/2020/01/30/15/28/smartphone-4805757_1280.jpg", desc: "Expand your connectivity with this multi-port USB-C hub." },
  { name: "Wireless Mouse", price: "$19", img: "https://cdn.pixabay.com/photo/2016/11/01/17/11/cp-1788949_1280.jpg", desc: "Smooth and precise wireless mouse for everyday use." },
  { name: "Keyboard", price: "$89", img: "https://cdn.pixabay.com/photo/2022/01/30/17/15/keyboard-6981763_1280.jpg", desc: "keyboard with customizable RGB lighting." },
  { name: "Portable SSD", price: "$99", img: "https://rukminim2.flixcart.com/image/750/900/xif0q/external-hard-drive/ssd/0/i/m/x6-500gb-portable-ssd-ct500x6ssd9-crucial-original-imahfhbpftghb2s4.jpeg?q=90&crop=false", desc: "Fast and compact portable SSD for all your storage needs." },
  { name: "Webcam", price: "$49", img: "https://cdn.pixabay.com/photo/2016/02/24/12/30/camera-1219748_1280.jpg", desc: "HD webcam for video calls and streaming." },
  { name: "Desk Lamp", price: "$29", img: "https://cdn.pixabay.com/photo/2015/12/05/23/16/office-1078869_1280.jpg", desc: "Adjustable LED desk lamp with touch controls." },
  { name: "Smart Plug", price: "$14", img: "https://cdn.pixabay.com/photo/2015/03/21/17/48/network-684009_1280.jpg", desc: "Control your devices remotely with this smart plug." },
  { name: "Action Camera", price: "$119", img: "https://cdn.pixabay.com/photo/2014/08/29/14/53/camera-431119_1280.jpg", desc: "Capture adventures in 4K with this rugged action camera." },
  { name: "VR Headset", price: "$199", img: "https://cdn.pixabay.com/photo/2021/12/20/12/45/woman-6882918_1280.jpg", desc: "Immersive VR headset for gaming and experiences." },
  { name: "Noise Cancelling Earbuds", price: "$79", img: "https://cdn.pixabay.com/photo/2019/07/14/16/08/desk-4337482_1280.jpg", desc: "Compact earbuds with active noise cancellation." },
  { name: "Smartphone", price: "$699", img: "https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_1280.jpg", desc: "Latest generation smartphone with stunning display and camera." },
  { name: "Tablet", price: "$399", img: "https://cdn.pixabay.com/photo/2015/06/24/15/45/hands-820272_1280.jpg", desc: "Lightweight tablet perfect for work and play." },
  { name: "Laptop", price: "$999", img: "https://cdn.pixabay.com/photo/2016/11/21/16/27/laptop-1846277_1280.jpg", desc: "Powerful laptop for professionals and students." },
  { name: "T-Shirt", price: "$15", img: "https://cdn.pixabay.com/photo/2025/05/20/10/57/t-shirt-9611374_1280.jpg", desc: "Comfortable cotton t-shirt in various colors." },
  { name: "Jeans", price: "$39", img: "https://cdn.pixabay.com/photo/2014/12/11/10/22/jeans-564073_1280.jpg", desc: "Stylish denim jeans for everyday wear." },
  { name: "Dress", price: "$49", img: "https://cdn.pixabay.com/photo/2021/03/22/16/07/woman-6115105_1280.jpg", desc: "Elegant dress for special occasions." },
 
];
const OFFERS = [
  { title: "50% OFF on Headphones", desc: "Get half price on select wireless headphones. Limited time only!" },
  { title: "Buy 1 Get 1 Free: Smart Plugs", desc: "Double the convenience for the price of one." },
  { title: "Summer Sale: 30% OFF on Laptops", desc: "Upgrade your tech for less this summer." },
  { title: "Free Shipping on Orders Over $100", desc: "No shipping charges for big orders!" },
];

// Email sending function
const sendEmail = async (subject, message) => {
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_omdvinn', // Replace with your EmailJS service ID
        template_id: 'template_g4zrkbl', // Replace with your EmailJS template ID
        user_id: 'Q69NXJuWEhW-VFBL4', // Replace with your EmailJS user ID
        template_params: {
          to_email: 'parmarshiven265@gmail.com',
          subject: subject,
          message: message
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
function Navbar({ onNav, onLogin, onSignup, user, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (navPage) => {
    onNav(navPage);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => onNav("home")}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/008/506/458/non_2x/shopping-trolley-line-icon-3d-illustration-free-png.png"
          alt="Logo"
          className="logo"
        />
        <span className="brand">SBazar</span>
      </div>

      {/* Desktop Navigation */}
      <div className="navbar-center desktop-nav">
        <button onClick={() => onNav("home")}>Home</button>
        <button onClick={() => onNav("products")}>Products</button>
        <button onClick={() => onNav("cart")}>Cart</button>
        <button onClick={() => onNav("about")}>About Us</button>
        <button onClick={() => onNav("contact")}>Contact</button>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="nav-user" style={{ marginRight: 10, fontWeight: 600 }}>
              {user.name}
            </span>
            <button className="nav-btn nav-btn-login" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="nav-btn" onClick={onSignup}>Sign Up</button>
            <button className="nav-btn nav-btn-login" onClick={onLogin}>Login</button>
          </>
        )}
        {/* Mobile Menu Icon */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="brand">SBazar</span>
              <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
                ✕
              </button>
            </div>
            <div className="mobile-menu-items">
              <button onClick={() => handleNavClick("home")}>🏠 Home</button>
              <button onClick={() => handleNavClick("products")}>🛍️ Products</button>
              <button onClick={() => handleNavClick("cart")}>🛒 Cart</button>
              <button onClick={() => handleNavClick("about")}>ℹ️ About Us</button>
              <button onClick={() => handleNavClick("contact")}>📞 Contact</button>
            </div>
            <div className="mobile-menu-auth" style={{ marginTop: "auto" }}>
              {user ? (
                <button
                  className="mobile-auth-btn logout"
                  style={{ width: "100%" }}
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    className="mobile-auth-btn"
                    style={{ width: "100%" }}
                    onClick={() => {
                      onSignup();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </button>
                  <button
                    className="mobile-auth-btn login"
                    style={{ width: "100%" }}
                    onClick={() => {
                      onLogin();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection({ onShopNow }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text-content">
          <h1>Welcome to SBazar</h1>
          <p>
            From Cart to Doorstep, Effortlessly<br />
            Enjoy a smooth shopping experience with instant access to top brands, daily essentials, and exclusive offers.
          </p>
          <button className="hero-btn" onClick={onShopNow}>Shop Now</button>
        </div>
        <div className="hero-image-container">
          <img
            src="https://cdn.pixabay.com/photo/2020/06/04/17/35/garment-racks-5259773_1280.jpg"
            alt="Shopping"
            className="hero-img"
          />
        </div>
      </div>
    </section>
  );
}
function TestimonialsCarousel() {
  const testimonials = [
    {
      name: "Priya S.",
      text: "ShopEase made my shopping experience so smooth and enjoyable! Fast delivery and great prices.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Rahul M.",
      text: "I love the variety of products. The customer service is top-notch!",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Aisha K.",
      text: "The offers and discounts are amazing. I always find what I need.",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "John D.",
      text: "Great quality and fast shipping. Highly recommended!",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Sneha P.",
      text: "Easy returns and excellent support. My go-to online store.",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((idx - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((idx + 1) % testimonials.length);
  return (
    <section className="testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="carousel">
        <button className="carousel-btn" onClick={prev}>&lt;</button>
        <div className="testimonial-card">
          <img src={testimonials[idx].img} alt={testimonials[idx].name} className="testimonial-img" />
          <p className="testimonial-text">"{testimonials[idx].text}"</p>
          <span className="testimonial-name">{testimonials[idx].name}</span>
        </div>
        <button className="carousel-btn" onClick={next}>&gt;</button>
      </div>
      <div style={{marginTop: 8}}>
        {testimonials.map((_, i) => (
          <span key={i} style={{
            display: "inline-block",
            width: 10, height: 10, borderRadius: "50%",
            background: idx === i ? "#007bff" : "#ccc",
            margin: "0 4px"
          }} />
        ))}
      </div>
    </section>
  );
}

function SaleBannerSection({ onViewOffers }) {
  return (
    <section className="sale-banner-section">
      <div className="sale-banner-content">
        <h2>Big Summer Sale!</h2>
        <p>
          Up to <span className="sale-highlight">50% OFF</span> on select products.<br />
          Limited time only. Don't miss out!
        </p>
        <button className="sale-btn" onClick={onViewOffers}>View Offers</button>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    { icon: "🚚", title: "Free Shipping", desc: "On all orders above $50" },
    { icon: "🔒", title: "Secure Payments", desc: "100% secure payment processing" },
    { icon: "💬", title: "24/7 Support", desc: "We're here to help anytime" },
    { icon: "↩️", title: "Easy Returns", desc: "Hassle-free 7-day returns" },
    { icon: "🎁", title: "Gift Wrapping", desc: "Beautiful gift wrapping available for all products" },
    { icon: "🌱", title: "Eco-Friendly Packaging", desc: "We use sustainable, eco-friendly packaging" },
  ];
  return (
    <section className="services-section">
      <h2>Why Shop With Us?</h2>
      <div className="services-list">
        {services.map((s, i) => (
          <div className="service-card" key={i}>
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Home({ onShopNow, onViewOffers }) {
  return (
    <div>
      <HeroSection onShopNow={onShopNow} />
      <TestimonialsCarousel />
      <SaleBannerSection onViewOffers={onViewOffers} />
      <ServicesSection />
    </div>
  );
}

function OffersPage({ onBack }) {
  return (
    <section className="cart-page" style={{maxWidth: 600, margin: "2rem auto", background: "rgba(26,34,80,0.7)", borderRadius: 18, padding: "2rem 1rem", boxShadow: "0 2px 12px rgba(94,160,255,0.08)"}}>
      <button className="buy-btn" style={{marginBottom: 24}} onClick={onBack}>Back</button>
      <h2 style={{textAlign: "center", marginBottom: 24}}>Current Offers</h2>
      {OFFERS.map((offer, i) => (
        <div key={i} style={{background: "#fff", color: "#222", borderRadius: 10, padding: "1rem", marginBottom: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.08)"}}>
          <h3 style={{margin: 0, color: "#007bff"}}>{offer.title}</h3>
          <p style={{margin: "0.5rem 0 0 0"}}>{offer.desc}</p>
        </div>
      ))}
    </section>
  );
}

function ProductDetailModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1); // <-- Move this above the conditional
  if (!product) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <img src={product.img} alt={product.name} style={{width: "100%", maxWidth: 250, borderRadius: 12, marginBottom: 16}} />
        <h2>{product.name}</h2>
        <p style={{color: "#007bff", fontWeight: 600, fontSize: 18}}>{product.price}</p>
        <p style={{margin: "1rem 0"}}>{product.desc}</p>
        <div style={{display: "flex", alignItems: "center", marginBottom: 16, gap: 8}}>
          <button className="buy-btn" style={{padding: "0.3rem 1rem"}} onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
          <span style={{fontWeight: 600, fontSize: 18}}>{qty}</span>
          <button className="buy-btn" style={{padding: "0.3rem 1rem"}} onClick={() => setQty(q => q + 1)}>+</button>
        </div>
        <button className="buy-btn" onClick={() => { onAddToCart(product, qty); onClose(); }}>Add to Cart</button>
        <button className="buy-btn" style={{background: "#ccc", color: "#222", marginLeft: 10}} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
function Products({ onProductClick, onAddToCart }) {
  const [showQtyIdx, setShowQtyIdx] = useState(null);
  const [quantities, setQuantities] = useState(Array(PRODUCTS.length).fill(0)); // Changed from 1 to 0
  const productListRef = useRef();

  // Hide + - when clicking outside any product
  React.useEffect(() => {
    function handleClick(e) {
      if (productListRef.current && !productListRef.current.contains(e.target)) {
        setShowQtyIdx(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleQtyChange = (idx, delta) => {
    setQuantities(qs => {
      const newQs = [...qs];
      newQs[idx] = Math.max(0, newQs[idx] + delta); // Changed from 1 to 0
      return newQs;
    });
  };

  const handleAdd = (p, i) => {
    setShowQtyIdx(i);
    onAddToCart(p, quantities[i] || 1); // Use 1 if quantity is 0
  };

  return (
    <section className="products">
      <h2 style={{textAlign: "center"}}>Our Products</h2> {/* Added textAlign: "center" */}
      <div className="product-list" ref={productListRef}>
        {PRODUCTS.map((p, i) => (
          <div
            className="product-card"
            key={i}
            style={{cursor: "pointer"}}
          >
            <img src={p.img} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="product-price">{p.price}</p>
            {showQtyIdx === i && (
              <div style={{display: "flex", alignItems: "center", gap: 8, margin: "0.5rem 0"}}>
                <button className="buy-btn" style={{padding: "0.2rem 0.8rem"}} onClick={() => handleQtyChange(i, -1)}>-</button>
                <span style={{fontWeight: 600, fontSize: 16}}>{quantities[i]}</span> {/* This will show 0 initially */}
                <button className="buy-btn" style={{padding: "0.2rem 0.8rem"}} onClick={() => handleQtyChange(i, 1)}>+</button>
              </div>
            )}
            <button className="buy-btn" onClick={() => handleAdd(p, i)}>{showQtyIdx === i ? "Add More" : "Add to Cart"}</button>
            <button className="buy-btn" style={{marginTop: 6, background: "#ccc", color: "#222"}} onClick={() => onProductClick(i)}>Details</button>
          </div>
        ))}
      </div>
    </section>
  );
}
function CartPopup({ show }) {
  if (!show) return null;
  return (
    <div style={{
      position: "fixed",
      top: 30,
      right: 30,
      background: "#23263a",
      color: "#fff",
      padding: "1rem 2rem",
      borderRadius: 12,
      boxShadow: "0 2px 12px rgba(94,160,255,0.18)",
      zIndex: 2000,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontWeight: 500,
      fontSize: 18,
      animation: "fadeIn 0.5s"
    }}>
      <span role="img" aria-label="cart" style={{fontSize: 24}}>🛒</span>
      Product added to cart!
    </div>
  );
}

function CartPage({ cart, onRemove, onOrderNow, showPopup }) {
  const total = cart.reduce((sum, item) => sum + Number(item.price.replace(/[^0-9.]/g, "")) * (item.qty || 1), 0);
  return (
    <section className="cart-page" style={{maxWidth: 700, margin: "2rem auto", background: "rgba(26,34,80,0.7)", borderRadius: 18, padding: "2rem 1rem", boxShadow: "0 2px 12px rgba(94,160,255,0.08)"}}>
      <div style={{textAlign: "center", fontSize: 32, marginBottom: 10}}>
        <span role="img" aria-label="star" style={{color: "#FFD700"}}>⭐</span>
      </div>
      <h2 style={{textAlign: "center", marginBottom: "2rem"}}>Your Cart</h2>
      <CartPopup show={showPopup} />
      {cart.length === 0 ? (
        <p style={{textAlign: "center"}}>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, i) => (
            <div key={i} style={{display: "flex", alignItems: "center", marginBottom: 18, background: "#181c2a", borderRadius: 12, padding: "1rem"}}>
              <img src={item.img} alt={item.name} style={{width: 70, height: 70, objectFit: "contain", borderRadius: 8, marginRight: 18}} />
              <div style={{flex: 1}}>
                <h3 style={{margin: 0, color: "#fff", fontWeight: 500}}>{item.name}</h3>
                <p style={{margin: "0.3rem 0", color: "#5ea0ff", fontWeight: 600}}>{item.price}</p>
                <p style={{margin: 0, color: "#bfc2d5", fontSize: 14}}>{item.desc}</p>
                <div style={{marginTop: 6, color: "#fff"}}>Quantity: <b>{item.qty || 1}</b></div>
              </div>
              <button className="buy-btn" style={{background: "#e74c3c", marginLeft: 10}} onClick={() => onRemove(i)}>Remove</button>
            </div>
          ))}
          <div style={{textAlign: "right", fontWeight: 600, color: "#fff", fontSize: 18, marginTop: 24}}>
            Total: ${total.toFixed(2)}
          </div>
          <div style={{textAlign: "center", marginTop: 32}}>
            <button className="buy-btn" style={{fontSize: 18, padding: "0.8rem 2.5rem"}} onClick={onOrderNow}>Order Now</button>
          </div>
        </div>
      )}
    </section>
  );
}

function CheckoutPage({ onPlaceOrder, onBack }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "card"
  });
  return (
    <section
      className="cart-page"
      style={{
        maxWidth: 500,
        margin: "2rem auto",
        background: "rgba(26,34,80,0.7)",
        borderRadius: 18,
        padding: "2rem 1rem",
        boxShadow: "0 2px 12px rgba(94,160,255,0.08)",
        position: "relative"
      }}
    >
      <button
        className="buy-btn"
        style={{
          marginBottom: 24,
          marginTop: 0,
          marginLeft: 0,
          display: "block"
        }}
        onClick={onBack}
      >
        Back
      </button>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Checkout</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          onPlaceOrder(form);
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          required
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          required
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />
        <select
          value={form.payment}
          onChange={e => setForm({ ...form, payment: e.target.value })}
          style={{
            marginBottom: 16,
            width: "100%",
            padding: "0.5rem",
            borderRadius: 4
          }}
        >
          <option value="card">Credit/Debit Card</option>
          <option value="upi">UPI</option>
          <option value="cod">Cash on Delivery</option>
        </select>
        <button
          className="buy-btn"
          type="submit"
          style={{ width: "100%", fontSize: 18 }}
        >
          Place Order
        </button>
      </form>
    </section>
  );
}

function ThankYouPage({ onBackHome }) {
  return (
    <section className="cart-page" style={{maxWidth: 500, margin: "2rem auto", background: "rgba(26,34,80,0.7)", borderRadius: 18, padding: "2rem 1rem", boxShadow: "0 2px 12px rgba(94,160,255,0.08)", textAlign: "center"}}>
      <h2 style={{fontSize: "2.2rem", color: "#5ea0ff", marginBottom: 24}}>Thank You for Shopping!</h2>
      <p style={{fontSize: 18, color: "#fff"}}>Your order has been placed successfully.<br />We appreciate your business.</p>
      <button className="buy-btn" style={{marginTop: 24}} onClick={onBackHome}>Back to Home</button>
    </section>
  );
}

function AuthModal({ type, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  return (
    <div className="modal-overlay" style={{alignItems: "center", justifyContent: "center"}} onClick={onClose}>
      <div className="modal-content" style={{maxWidth: 350, margin: "auto"}} onClick={e => e.stopPropagation()}>
        <h2>{type === "login" ? "Login" : "Sign Up"}</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="auth-form"
        >
          {type === "signup" && (
            <input
              type="text"
              placeholder="Name"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <button className="buy-btn" type="submit">{type === "login" ? "Login" : "Sign Up"}</button>
        </form>
        <button className="buy-btn" style={{background: "#ccc", color: "#222", marginTop: 10}} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function SuccessPage({ type, onBack }) {
  return (
    <section className="cart-page" style={{maxWidth: 500, margin: "2rem auto", background: "rgba(26,34,80,0.7)", borderRadius: 18, padding: "2rem 1rem", boxShadow: "0 2px 12px rgba(94,160,255,0.08)", textAlign: "center"}}>
      <h2 style={{fontSize: "2.2rem", color: "#5ea0ff", marginBottom: 24}}>
        {type === "signup" ? "Successfully Signed Up!" : "Successfully Logged In!"}
      </h2>
      <p style={{fontSize: 18, color: "#fff"}}>
        {type === "signup" ? "Your account has been created." : "You are now logged in."}
      </p>
      <button className="buy-btn" style={{marginTop: 24}} onClick={onBack}>Back</button>
    </section>
  );
}

function AboutUs() {
  return (
    <section
      className="about"
      style={{
        maxWidth: 900,
        margin: "2rem auto",
        background: "rgba(255,255,255,0.97)",
        borderRadius: 18,
        padding: "2.5rem 2rem",
        boxShadow: "0 2px 16px rgba(94,160,255,0.10)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ fontSize: "2.5rem", color: "#1a2250", marginBottom: 0, textAlign: "center" }}>About Us</h2>
      <div style={{ fontSize: "2rem", fontWeight: 700, color: "#007bff", marginBottom: 18, textAlign: "center" }}>SBazar</div>
      <img
        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
        alt="Business Team"
        className="about-img"
        style={{
          borderRadius: 16,
          maxWidth: 350,
          width: "100%",
          boxShadow: "0 2px 12px rgba(94,160,255,0.10)",
          margin: "0 auto 32px auto",
          display: "block"
        }}
      />
      <div
        style={{
          maxWidth: 700,
          width: "100%",
          textAlign: "center",
          background: "rgba(255,255,255,0.85)",
          borderRadius: 16,
          padding: "2rem 1.5rem",
          boxShadow: "0 2px 8px rgba(94,160,255,0.08)",
          color: "#000", // PURE BLACK TEXT
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 600, margin: "18px 0 8px 0" }}>🌟 About Brand</div>
        <p style={{ fontSize: 17, margin: "0 0 12px 0" }}>
          <b>KBZ Kurti</b> positions itself as "The Modern Ethnic" fashion boutique. Launched in 2020 by Abdul Wahid, the brand merges India's architectural and cultural heritage with contemporary styles. Their goal? To offer modern, culturally rich ethnic wear that's stylish yet rooted in tradition.<br />
          <a href="https://kbzkurti.com" target="_blank" rel="noopener noreferrer">kbzkurti.com</a>
        </p>
        <div style={{ fontSize: 22, fontWeight: 600, margin: "18px 0 8px 0" }}>📖 Brand History</div>
        <p style={{ fontSize: 17, margin: "0 0 12px 0" }}>
          Founded in 2020 by Abdul Wahid.<br />
          Inspired by a passion to redefine modern ethnic wear in India.<br />
          Combines traditional craftsmanship (like intricate embroidery and premium fabrics) with contemporary design sensibilities.<br />
          <a href="https://kbzkurti.com" target="_blank" rel="noopener noreferrer">kbzkurti.com</a>
        </p>
        <div style={{ fontSize: 22, fontWeight: 600, margin: "18px 0 8px 0" }}>🎯 Mission</div>
        <p style={{ fontSize: 17, margin: "0 0 12px 0" }}>
          To revive and celebrate India's diverse fashion legacy.<br />
          Each piece is crafted to convey the cultural richness and artistic brilliance of India.<br />
          Emphasis on thoughtful pricing and premium craftsmanship, making modern ethnic attire accessible globally.<br />
          <a href="https://kbzkurti.com" target="_blank" rel="noopener noreferrer">kbzkurti.com</a>
        </p>
        <div style={{ fontSize: 22, fontWeight: 600, margin: "18px 0 8px 0" }}>🌍 Vision</div>
        <p style={{ fontSize: 17, margin: "0 0 12px 0" }}>
          To build a global resonance for Indian ethnic wear.<br />
          Envisions a world where "The Modern Ethnic" fashion unites people across borders, blending traditional splendor with contemporary elegance.<br />
          <a href="https://kbzkurti.com" target="_blank" rel="noopener noreferrer">kbzkurti.com</a>
        </p>
        <div style={{ fontSize: 22, fontWeight: 600, margin: "18px 0 8px 0" }}>👗 What They Offer</div>
        <p style={{ fontSize: 17, margin: "0 0 12px 0" }}>
          A curated range including:<br />
          Fusion wear, Festive collections, Maternity outfits, Everyday ethnic wear<br />
          <b>Known for:</b> Premium fabrics, Intricate embroidery, Vibrant color palettes<br />
          <b>Target audience:</b> Stylish, culturally connected individuals seeking fusion fashion.<br />
          <a href="https://kbzkurti.com" target="_blank" rel="noopener noreferrer">kbzkurti.com</a> | <a href="https://kitbazar.in" target="_blank" rel="noopener noreferrer">kitbazar.in</a>
        </p>
        <div style={{ fontSize: 22, fontWeight: 600, margin: "18px 0 8px 0" }}>🛍️ Brand Experience</div>
        <p style={{ fontSize: 17, margin: "0 0 12px 0" }}>
          Though the "About Us" page does not dive into logistics, it implies:<br />
          Pan‑India shipping, Cash-on-delivery options, Potential physical presence via KBZ stores (though further details aren't provided)<br />
          <a href="https://kaprabazar.com" target="_blank" rel="noopener noreferrer">kaprabazar.com</a> | <a href="https://pkbazar.in" target="_blank" rel="noopener noreferrer">pkbazar.in</a> | <a href="https://kcbazar.com" target="_blank" rel="noopener noreferrer">kcbazar.com</a> | <a href="https://kbzkurti.com" target="_blank" rel="noopener noreferrer">kbzkurti.com</a> | <a href="https://mydukaan.io" target="_blank" rel="noopener noreferrer">mydukaan.io</a>
        </p>
        <div style={{ fontSize: 22, fontWeight: 600, margin: "18px 0 8px 0" }}>💡 Summary</div>
        <p style={{ fontSize: 17, margin: "0 0 12px 0" }}>
          KBZ Kurti (often referred to as "KBZ" or "KBazar") is an Indian ethnic-wear brand started in 2020. Its identity lies in harmonizing India's rich traditional design elements with modern fashion trends. With a clear goal to revive cultural craftsmanship and make it globally appealing, they offer a thoughtfully curated product line aiming for accessible luxury.
        </p>
      </div>
    </section>
  );
}
function Contact({ onMessageSent }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <p>
        Have questions or need support? Reach out to us!
      </p>
      <form className="contact-form" onSubmit={e => { 
        e.preventDefault(); 
        const message = `New message from ${form.name} (${form.email}): ${form.message}`;
        sendEmail('New Contact Form Submission', message);
        onMessageSent(); 
      }}>
        <input type="text" placeholder="Your Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email Address" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <textarea placeholder="Your Message" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
        <button type="submit" className="send-btn">Send Message</button>
      </form>
      <img
        src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=80"
        alt="Contact"
        className="contact-img"
      />
    </section>
  );
}

function MessageSentPage({ onBack }) {
  return (
    <section className="cart-page" style={{maxWidth: 500, margin: "2rem auto", background: "rgba(26,34,80,0.7)", borderRadius: 18, padding: "2rem 1rem", boxShadow: "0 2px 12px rgba(94,160,255,0.08)", textAlign: "center"}}>
      <h2 style={{fontSize: "2.2rem", color: "#5ea0ff", marginBottom: 24}}>Message Sent Successfully!</h2>
      <p style={{fontSize: 18, color: "#fff"}}>Thank you for contacting us. We will get back to you soon.</p>
      <button className="buy-btn" style={{marginTop: 24}} onClick={onBack}>Back</button>
    </section>
  );
}

function MyOrdersPage({ orders, onBack }) {
  return (
    <section className="cart-page" style={{maxWidth: 700, margin: "2rem auto", background: "rgba(26,34,80,0.7)", borderRadius: 18, padding: "2rem 1rem", boxShadow: "0 2px 12px rgba(94,160,255,0.08)"}}>
      <button className="buy-btn" style={{marginBottom: 24}} onClick={onBack}>Back</button>
      <h2 style={{textAlign: "center", marginBottom: 24}}>My Orders</h2>
      {orders.length === 0 ? (
        <p style={{textAlign: "center", color: "#fff"}}>No orders yet.</p>
      ) : (
        orders.map((order, idx) => (
          <div key={idx} style={{background: "#fff", color: "#222", borderRadius: 10, padding: "1rem", marginBottom: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.08)"}}>
            <div style={{fontWeight: 600, marginBottom: 8}}>Order #{idx + 1} - {order.date}</div>
            <ul style={{margin: 0, padding: 0, listStyle: "none"}}>
              {order.items.map((item, i) => (
                <li key={i} style={{marginBottom: 4}}>
                  {item.name} x {item.qty} - {item.price}
                </li>
              ))}
            </ul>
            <div style={{marginTop: 8, fontWeight: 600}}>Total: ${order.total.toFixed(2)}</div>
            <div style={{marginTop: 4, fontSize: 14, color: "#007bff"}}>Status: {order.status}</div>
          </div>
        ))
      )}
    </section>
  );
}


function PrivacyPolicy({ onBack }) {
  return (
    <section className="cart-page" style={{maxWidth: 800, margin: "2rem auto", background: "rgba(26,34,80,0.7)", borderRadius: 18, padding: "2rem 1rem", boxShadow: "0 2px 12px rgba(94,160,255,0.08)"}}>
      <button className="buy-btn" style={{marginBottom: 24}} onClick={onBack}>Back</button>
      <div style={{background: "#fff", color: "#222", borderRadius: 10, padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)"}}>
        <h1 style={{textAlign: "center", color: "#007bff", marginBottom: "2rem"}}>🔐 Privacy Policy for SBazar</h1>
        <p style={{fontWeight: "bold", marginBottom: "1rem"}}>Effective Date: April 2023</p>
        <p style={{fontWeight: "bold", marginBottom: "2rem"}}>Last Updated: March 2024</p>
        <p style={{marginBottom: "1.5rem"}}>
          At SBazar, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website [sbazar.com] or use our services.
        </p>
        <h2 style={{color: "#007bff"}}>1. Information We Collect</h2>
        <ul>
          <li><b>Personal Information:</b> Name, email, phone number, address, payment details.</li>
          <li><b>Account Details:</b> Username, password.</li>
          <li><b>Transaction Information:</b> Purchase history, cart data, order preferences.</li>
          <li><b>Device & Usage Data:</b> IP address, browser type, device info, pages visited.</li>
        </ul>
        <h2 style={{color: "#007bff"}}>2. How We Use Your Information</h2>
        <ul>
          <li>Process and fulfill your orders.</li>
          <li>Send order updates, confirmations, and promotions.</li>
          <li>Provide customer support and improve our services.</li>
          <li>Personalize your shopping experience.</li>
          <li>Ensure security and prevent fraud.</li>
        </ul>
        <h2 style={{color: "#007bff"}}>3. How We Share Your Information</h2>
        <ul>
          <li>Trusted service providers (payment gateways, delivery partners).</li>
          <li>Legal authorities, if required by law.</li>
          <li>Marketing platforms (with your consent only).</li>
        </ul>
        <h2 style={{color: "#007bff"}}>4. Cookies and Tracking</h2>
        <p>We use cookies to improve your browsing experience, remember your preferences, and analyze website traffic. You can disable cookies in your browser settings.</p>
        <h2 style={{color: "#007bff"}}>5. Data Security</h2>
        <p>We implement industry-standard security measures to protect your data. However, no online transmission is 100% secure.</p>
        <h2 style={{color: "#007bff"}}>6. Your Rights</h2>
        <ul>
          <li>Access and update your data.</li>
          <li>Request deletion of your personal data.</li>
          <li>Opt-out of marketing emails (via unsubscribe link).</li>
        </ul>
        <h2 style={{color: "#007bff"}}>7. Children's Privacy</h2>
        <p>Our services are not intended for children under the age of 13. We do not knowingly collect personal data from minors.</p>
        <h2 style={{color: "#007bff"}}>8. Policy Updates</h2>
        <p>We may update this Privacy Policy occasionally. Updates will be posted on this page with the "Last Updated" date.</p>
        <h2 style={{color: "#007bff"}}>9. Contact Us</h2>
        <p>📧 Email: support@sbazar.com<br/>📞 Phone: +91-8383800021</p>
      </div>
    </section>
  );
}

function TermsAndConditions({ onBack }) {
  return (
    <section className="cart-page" style={{maxWidth: 800, margin: "2rem auto", background: "rgba(26,34,80,0.7)", borderRadius: 18, padding: "2rem 1rem", boxShadow: "0 2px 12px rgba(94,160,255,0.08)"}}>
      <button className="buy-btn" style={{marginBottom: 24}} onClick={onBack}>Back</button>
      <div style={{background: "#fff", color: "#222", borderRadius: 10, padding: "2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)"}}>
        <h1 style={{textAlign: "center", color: "#007bff", marginBottom: "2rem"}}>📄 Terms and Conditions – SBazar</h1>
        <p style={{fontWeight: "bold", marginBottom: "1rem"}}>Effective Date: April 2023</p>
        <p style={{fontWeight: "bold", marginBottom: "2rem"}}>Last Updated: March 2024</p>
        <p>Please read these Terms and Conditions (\"Terms\", \"Terms and Conditions\") carefully before using the SBazar website (www.sbazar.com) operated by SBazar.</p>
        <p>By accessing or using the website, you agree to be bound by these Terms. If you do not agree with any part of the terms, you may not use our services.</p>
        <h2 style={{color: "#007bff"}}>1. Use of the Website</h2>
        <ul>
          <li>You must be at least 18 years old to use this site.</li>
          <li>You agree to use the website only for lawful purposes.</li>
          <li>You shall not misuse the website for fraudulent or unlawful activities.</li>
        </ul>
        <h2 style={{color: "#007bff"}}>2. Account Registration</h2>
        <ul>
          <li>You are responsible for maintaining the confidentiality of your account and password.</li>
          <li>You agree to provide accurate and current information.</li>
          <li>We reserve the right to suspend or terminate your account if any information is found to be false or misleading.</li>
        </ul>
        <h2 style={{color: "#007bff"}}>3. Product Information and Pricing</h2>
        <ul>
          <li>All product prices are listed in INR and are subject to change without prior notice.</li>
          <li>We strive to ensure all product details and pricing are accurate, but errors may occur.</li>
          <li>In the event of an incorrect price or description, we reserve the right to cancel or refuse the order.</li>
        </ul>
        <h2 style={{color: "#007bff"}}>4. Orders and Payments</h2>
        <ul>
          <li>Once an order is placed, it cannot be cancelled or modified unless stated otherwise.</li>
          <li>We accept multiple payment methods including credit/debit cards, UPI, and COD (if available).</li>
          <li>Payment must be completed to confirm the order.</li>
        </ul>
        <h2 style={{color: "#007bff"}}>5. Shipping and Delivery</h2>
        <ul>
          <li>Delivery timelines are estimated and may vary due to factors beyond our control.</li>
          <li>Shipping charges (if any) will be mentioned at checkout.</li>
          <li>We are not responsible for delays caused by courier services or natural events.</li>
        </ul>
        <h2 style={{color: "#007bff"}}>6. Returns and Refunds</h2>
        <ul>
          <li>Return and refund policies are clearly mentioned on our Returns Policy page.</li>
          <li>Items must be returned unused and in original packaging.</li>
          <li>Refunds are issued only after product inspection and approval.</li>
        </ul>
        <h2 style={{color: "#007bff"}}>7. Intellectual Property</h2>
        <ul>
          <li>All content on SBazar (logos, designs, text, images) is owned by SBazar or its licensors.</li>
          <li>Unauthorized use or reproduction of our content is strictly prohibited.</li>
        </ul>
        <h2 style={{color: "#007bff"}}>8. Limitation of Liability</h2>
        <ul>
          <li>SBazar is not liable for any indirect, incidental, or consequential damages from the use of our services.</li>
          <li>We do not guarantee uninterrupted or error-free access to the website.</li>
        </ul>
        <h2 style={{color: "#007bff"}}>9. Termination</h2>
        <p>We reserve the right to terminate or suspend access to our site immediately without notice, for conduct that violates these terms.</p>
        <h2 style={{color: "#007bff"}}>10. Changes to Terms</h2>
        <p>SBazar reserves the right to update or modify these Terms at any time. Any changes will be effective once posted on this page.</p>
        <h2 style={{color: "#007bff"}}>11. Governing Law</h2>
        <p>These Terms are governed by the laws of India. Any disputes arising shall be subject to the jurisdiction of courts located in [Your City/State].</p>
        <h2 style={{color: "#007bff"}}>12. Contact Us</h2>
        <p>📧 Email: support@sbazar.com<br/>📞 Phone: +91-8383800021</p>
      </div>
    </section>
  );
}


function Footer({ onPrivacy, onTerms }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <span className="brand">SBazar</span> &copy; {new Date().getFullYear()} All rights reserved.
        </div>
        <div>
          <button className="footer-link" onClick={onPrivacy} style={{background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline'}}>Privacy Policy</button> |{" "}
          <button className="footer-link" onClick={onTerms} style={{background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline'}}>Terms of Service</button>
        </div>
      </div>
    </footer>
  );
}


function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [showDetail, setShowDetail] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [user, setUser] = useState(null); // user: { name, email }
  const [authSuccess, setAuthSuccess] = useState(null); // null | 'login' | 'signup'
  const [offersPage, setOffersPage] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [orders, setOrders] = useState([
    // Example order for demo
    {
      date: "2024-06-01",
      items: [
        { name: "Wireless Headphones", qty: 1, price: "$99" },
        { name: "Smart Watch", qty: 2, price: "$149" }
      ],
      total: 99 + 2 * 149,
      status: "Delivered"
    }
  ]);


  const [myOrdersPage, setMyOrdersPage] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setPage("home");
  };

  const handleAddToCart = (product, qty = 1) => {
    setCart((prev) => {
      // If product already in cart, increase qty
      const idx = prev.findIndex(item => item.name === product.name);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = {...updated[idx], qty: (updated[idx].qty || 1) + qty};
        return updated;
      }
      return [...prev, {...product, qty}];
    });
    setShowCartPopup(true);
    setTimeout(() => setShowCartPopup(false), 1200);
  };

  const handleRemoveFromCart = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleOrderNow = () => {
    setCheckout(true);
  };

  const handlePlaceOrder = (form) => {
    // Send order details to email
    const orderDetails = {
      customer: form,
      items: cart,
      total: cart.reduce((sum, item) => sum + Number(item.price.replace(/[^0-9.]/g, "")) * (item.qty || 1), 0),
      date: new Date().toISOString()
    };
    
    const emailSubject = `New Order Placed by ${form.name}`;
    const emailMessage = `
      New Order Details:
      Customer: ${form.name} (${form.email})
      Phone: ${form.phone}
      Address: ${form.address}
      Payment Method: ${form.payment}
      
      Order Items:
      ${cart.map(item => `- ${item.name} x ${item.qty} @ ${item.price}`).join('\n')}
      
      Total: $${orderDetails.total.toFixed(2)}
    `;
    
    sendEmail(emailSubject, emailMessage);

    setCheckout(false);
    setOrderPlaced(true);
    // Save order to orders
    setOrders(prev => [
      {
        date: new Date().toISOString().slice(0, 10),
        items: cart.map(item => ({ name: item.name, qty: item.qty, price: item.price })),
        total: orderDetails.total,
        status: "Processing"
      },
      ...prev
    ]);
    setCart([]);
  };

  const handleBackHome = () => {
    setOrderPlaced(false);
    setPage("home");
  };

const handleAuthSubmit = (type, data) => {
  // Send auth data to email
  const emailSubject = type === 'login' ? 'New User Login' : 'New User Signup';
  const emailMessage = `
    ${type === 'signup' ? 'New user signed up:' : 'User logged in:'}
    Name: ${data.name || 'Not provided'}
    Email: ${data.email}
  `;
  
  sendEmail(emailSubject, emailMessage);

  setUser({
    name: data.name || data.email.split('@')[0],
    email: data.email
  });
  setAuthSuccess(type);

  // CLOSE the modal after login/signup
  if (type === "login") setShowLogin(false);
  if (type === "signup") setShowSignup(false);
};

  const handleNav = (navPage) => {
    if (navPage === "myorders") setMyOrdersPage(true);
    else setPage(navPage);
  };

  let PageComponent;
  if (showPrivacy) PageComponent = <PrivacyPolicy onBack={() => setShowPrivacy(false)} />;
  else if (showTerms) PageComponent = <TermsAndConditions onBack={() => setShowTerms(false)} />;
  else if (orderPlaced) PageComponent = <ThankYouPage onBackHome={handleBackHome} />;
  else if (checkout) PageComponent = <CheckoutPage onPlaceOrder={handlePlaceOrder} onBack={() => setCheckout(false)} />;
  else if (messageSent) PageComponent = <MessageSentPage onBack={() => { setMessageSent(false); setPage("home"); }} />;
  else if (authSuccess) PageComponent = <SuccessPage type={authSuccess} onBack={() => { setAuthSuccess(null); setPage("home"); }} />;
  else if (offersPage) PageComponent = <OffersPage onBack={() => setOffersPage(false)} />;
  else if (myOrdersPage) PageComponent = <MyOrdersPage orders={orders} onBack={() => setMyOrdersPage(false)} />;
  else if (page === "home") PageComponent = <Home onShopNow={() => setPage("products")} onViewOffers={() => setOffersPage(true)} />;
  else if (page === "products") PageComponent = <Products onProductClick={setShowDetail} onAddToCart={handleAddToCart} />;
  else if (page === "cart") PageComponent = <CartPage cart={cart} onRemove={handleRemoveFromCart} onOrderNow={handleOrderNow} showPopup={showCartPopup} />;
  else if (page === "about") PageComponent = <AboutUs />;
  else if (page === "contact") PageComponent = <Contact onMessageSent={() => setMessageSent(true)} />;

  return (
    <div>
      <Navbar
        onNav={handleNav}
        onLogin={() => setShowLogin(true)}
        onSignup={() => setShowSignup(true)}
        user={user}
        onLogout={handleLogout}
      />
      <main>{PageComponent}</main>

      <Footer 
        onPrivacy={() => setShowPrivacy(true)} 
        onTerms={() => setShowTerms(true)} 
      />
      
      {showDetail !== null && (
        <ProductDetailModal
          product={PRODUCTS[showDetail]}
          onClose={() => setShowDetail(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      
      {showLogin && (
        <AuthModal
          type="login"
          onClose={() => setShowLogin(false)}
          onSubmit={(data) => handleAuthSubmit("login", data)}
        />
      )}
      
      {showSignup && (
        <AuthModal
          type="signup"
          onClose={() => setShowSignup(false)}
          onSubmit={(data) => handleAuthSubmit("signup", data)}
        />
      )}
    </div>
  );
}

export default App;