import React from 'react';
import { Link } from 'react-router-dom';
import useTranslation from '../utils/useTranslation';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>{t.about.heroTitle}</h1>
          <p>{t.about.heroDesc}</p>
        </div>
      </section>

      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>{t.about.storyTitle}</h2>
              <p>{t.about.storyText1}</p>
              <p>{t.about.storyText2}</p>
              <p>{t.about.storyText3}</p>
            </div>

            <div className="story-stats">
              <div className="stat">
                <h3>30+</h3>
                <p>{t.about.years}</p>
              </div>
              <div className="stat">
                <h3>50M+</h3>
                <p>{t.about.customers}</p>
              </div>
              <div className="stat">
                <h3>100+</h3>
                <p>{t.about.fragrances}</p>
              </div>
              <div className="stat">
                <h3>150+</h3>
                <p>{t.about.countries}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2>{t.about.valuesTitle}</h2>

          <div className="values-grid">
            {t.about.values.map((value, index) => (
              <div
                key={index}
                className="value-card"
              >
                <div className="value-icon">{['Ex', 'Ar', 'Lu', 'Su'][index]}</div>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <h2>{t.about.craftTitle}</h2>

          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>{t.about.selection}</h3>
              <p>{t.about.selectionDesc}</p>
            </div>

            <div className="process-step">
              <div className="step-number">2</div>
              <h3>{t.about.creation}</h3>
              <p>{t.about.creationDesc}</p>
            </div>

            <div className="process-step">
              <div className="step-number">3</div>
              <h3>{t.about.testing}</h3>
              <p>{t.about.testingDesc}</p>
            </div>

            <div className="process-step">
              <div className="step-number">4</div>
              <h3>{t.about.bottling}</h3>
              <p>{t.about.bottlingDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>{t.about.ctaTitle}</h2>
            <p>{t.about.ctaDesc}</p>
            <Link to="/" className="btn btn-primary">
              {t.about.shopNow}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
