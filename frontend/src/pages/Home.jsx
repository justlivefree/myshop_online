import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFeaturedProducts, fetchDiscountedProducts } from '../utils/api';
import { formatPrice } from '../utils/format';
import useTranslation from '../utils/useTranslation';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const [featured, discounted] = await Promise.all([
          fetchFeaturedProducts(),
          fetchDiscountedProducts()
        ]);

        setFeaturedProducts(featured.data.data);
        setDiscountedProducts(discounted.data.data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-background">
          <div className="hero-gradient" ></div>
          <div className="hero-glow hero-glow-one"></div>
          <div className="hero-glow hero-glow-two"></div>
          <svg
            className="hero-decoration"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="container hero-shell">
          <div className="hero-content">
            <div className="hero-label">
              {t.home.heroLabel}
            </div>

            <h3 className="hero-title">
              {t.home.heroTitle}
            </h3>

            <p className="hero-description">
              {t.home.heroDesc}
            </p>

            <div className="hero-buttons">
              <a
                href="#featured"
                className="btn btn-primary"
              >
                {t.home.shopNow}
              </a>
              <a
                href="#about"
                className="btn btn-secondary"
              >
                {t.home.learnMore}
              </a>
            </div>

            <div className="hero-metrics">
              <div className="hero-metric">
                <strong>30+</strong>
                <span>{t.home.metricProducts}</span>
              </div>
              <div className="hero-metric">
                <strong>24h</strong>
                <span>{t.home.metricFast}</span>
              </div>
              <div className="hero-metric">
                <strong>100%</strong>
                <span>{t.home.metricPremium}</span>
              </div>
            </div>
          </div>

          <aside className="hero-showcase">
            <div className="showcase-card">
              <div className="showcase-badge">{t.home.showcaseEditor}</div>
              <h3>{t.home.showcaseTitle}</h3>
              <p>{t.home.showcaseDesc}</p>
              <div className="showcase-price-row">
                <span className="showcase-price">{formatPrice(109.99)}</span>
                <span className="showcase-discount">-25%</span>
              </div>
              <Link to="/product/5" className="showcase-link">{t.home.showcaseOffer}</Link>
            </div>
            <div className="showcase-mini-card">
              <span>{t.home.thisWeek}</span>
              <strong>{t.home.specialOffers}</strong>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="featured"
        className="featured-section"
      >
        <div className="container">
          <div className="section-header">
            <span className="section-kicker">{t.home.featuredKicker}</span>
            <h2>{t.home.featuredTitle}</h2>
            <p>{t.home.featuredDesc}</p>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="promo-banner">
        <div className="container">
          <div className="promo-content">
            <span className="section-kicker promo-kicker">{t.home.promoKicker}</span>
            <h2>{t.home.promoTitle}</h2>
            <p>{t.home.promoDesc}</p>
            <a
              href="#discounted"
              className="btn btn-outline"
            >
              {t.home.viewDiscounts}
            </a>
          </div>
        </div>
      </section>

      <section
        id="discounted"
        className="discounted-section"
      >
        <div className="container">
          <div className="section-header">
            <span className="section-kicker">{t.home.discountedKicker}</span>
            <h2>{t.home.discountedTitle}</h2>
            <p>{t.home.discountedDesc}</p>
          </div>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="products-grid">
              {discountedProducts.slice(0, 6).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section
        id="about"
        className="about-preview"
      >
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-kicker">{t.home.aboutKicker}</span>
              <h2>{t.home.aboutTitle}</h2>
              <p>
                {t.home.aboutText1}
              </p>
              <p>
                {t.home.aboutText2}
              </p>
              <Link to="/about" className="btn btn-primary">
                {t.home.readMore}
              </Link>
            </div>

            <div className="about-image">
              <div className="image-placeholder">
                <div className="image-copy">
                  <span>Crafted Identity</span>
                  <strong>Luxury that feels intentional on every screen size.</strong>
                </div>
                <svg viewBox="0 0 300 400" fill="none">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#f1d27a', stopOpacity: 0.6 }} />
                      <stop offset="100%" style={{ stopColor: '#131313', stopOpacity: 0.2 }} />
                    </linearGradient>
                  </defs>
                  <rect width="300" height="400" fill="url(#grad1)" />
                  <path d="M 100 50 L 150 20 L 200 50 L 200 150 Q 150 180 100 150 L 100 50 Z" stroke="#d4af37" strokeWidth="2" fill="none" />
                  <circle cx="220" cy="88" r="26" stroke="#d4af37" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
