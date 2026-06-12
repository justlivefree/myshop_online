import React, { useState } from 'react';
import useTranslation from '../utils/useTranslation';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>{t.contact.heroTitle}</h1>
          <p>{t.contact.heroDesc}</p>
        </div>
      </section>

      <div className="contact-content container">
        <div className="contact-grid">
          <div className="contact-form-section">
            <h2>{t.contact.formTitle}</h2>

            {submitted && (
              <div className="success-message">
                {t.contact.successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">{t.contact.nameLabel}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder={t.contact.namePlaceholder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t.contact.emailLabel}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder={t.contact.emailPlaceholder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">{t.contact.subjectLabel}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder={t.contact.subjectPlaceholder}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t.contact.messageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder={t.contact.messagePlaceholder}
                  rows="5"
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-submit"
              >
                {t.contact.sendBtn}
              </button>
            </form>
          </div>

          <div className="contact-info-section">
            <h2>{t.contact.infoTitle}</h2>
            <p>{t.contact.infoDesc}</p>

            <div className="contact-methods">
              {t.contact.methods.map((method, index) => (
                <div
                  key={index}
                  className="contact-method"
                >
                  <div className="method-icon">{['Email', 'Phone', 'Visit', 'Hours'][index]}</div>
                  <div>
                    <h4>{method.title}</h4>
                    <p>{method.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq-section">
              <h3>{t.contact.faqTitle}</h3>
              <div className="faq-items">
                <div className="faq-item">
                  <h4>{t.contact.faq1q}</h4>
                  <p>{t.contact.faq1a}</p>
                </div>
                <div className="faq-item">
                  <h4>{t.contact.faq2q}</h4>
                  <p>{t.contact.faq2a}</p>
                </div>
                <div className="faq-item">
                  <h4>Are your fragrances authentic?</h4>
                  <p>{t.contact.faq3a}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="contact-footer">
        <div className="container">
          <h2>{t.contact.showroomTitle}</h2>
          <p>{t.contact.showroomDesc}</p>
          <div className="map-placeholder">
            <p>{t.contact.mapComing}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
