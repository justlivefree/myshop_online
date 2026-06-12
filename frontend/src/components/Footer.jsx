import React from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '../utils/useTranslation';
import './Footer.css';
import InstagramIcon from './images/instagram-logo-facebook-2-svgrepo-com.svg';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-grid">
          <div className="footer-section footer-brand">
            <span className="footer-kicker">Signature House</span>
            <h3 className="footer-title">{t.footer.brand}</h3>
            <p className="footer-description">
              {t.footer.brandDesc}
            </p>
            <div className="social-links">
              <a href="#" aria-label="Instagram">
                <img src={InstagramIcon} alt="Instagram" className="social-icon" />
              </a>
              <a href="#" aria-label="Pinterest">PI</a>
              <a href="#" aria-label="TikTok">TT</a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">{t.footer.collections}</h4>
            <ul className="footer-links">
              <li><Link to="/">{t.footer.home}</Link></li>
              <li><Link to="/mens">{t.footer.menFragrances}</Link></li>
              <li><Link to="/womens">{t.footer.womenFragrances}</Link></li>
              <li><Link to="/cart">{t.footer.shoppingCart}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">{t.footer.company}</h4>
            <ul className="footer-links">
              <li><Link to="/about">{t.footer.aboutUs}</Link></li>
              <li><Link to="/contact">{t.footer.contact}</Link></li>
              <li><Link to="/about">{t.footer.craftsmanship}</Link></li>
              <li><Link to="/contact">{t.footer.support}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">{t.footer.stayUpdated}</h4>
            <p className="footer-newsletter-text">
              {t.footer.newsletterDesc}
            </p>
            <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                required
              />
              <button type="submit">{t.footer.join}</button>
            </form>
            <div className="footer-note">
              {t.footer.footerNote}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; {currentYear} JPG Perfumes. {t.footer.rights}</p>
          </div>
          <div className="footer-bottom-right">
            <Link to="/contact">Privacy</Link>
            <span className="separator">•</span>
            <Link to="/contact">Terms</Link>
            <span className="separator">•</span>
            <Link to="/contact">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
