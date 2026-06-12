import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchProductById } from '../utils/api';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import useTranslation from '../utils/useTranslation';
import './ProductDetails.css';

const ProductDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const response = await fetchProductById(id);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, addQuantity: quantity });
  };

  const handleQuantityChange = (value) => {
    const nextQuantity = Number.parseInt(value, 10);
    if (nextQuantity > 0 && (!product?.stock || nextQuantity <= product.stock)) {
      setQuantity(nextQuantity);
    }
  };

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Mahsulot topilmadi</h2>
        <button onClick={() => navigate('/')}>Bosh sahifaga qaytish</button>
      </div>
    );
  }

  return (
    <div className="product-details">
      <button className="btn-back" onClick={() => navigate(-1)}>
        {t.product.back}
      </button>

      <div className="container">
        <div className="details-grid">
          <div className="details-image">
            <div className="image-container">
              <img src={product.image} alt={product.name} />
              {product.discount > 0 && (
                <div className="discount-badge">-{product.discount}%</div>
              )}
            </div>
          </div>

          <div className="details-info">
            <div className="product-header">
              <p className="product-category">{product.category}</p>
              <h1 className="product-title">{product.name}</h1>
            </div>

            <div className="product-rating-section">
              <div className="stars">★★★★★</div>
              <span className="reviews">(48 {t.product.reviews})</span>
            </div>

            <div className="price-section">
              {product.discount > 0 ? (
                <>
                  <div className="original-price">{formatPrice(product.price)}</div>
                  <div className="discounted-price">
                    {formatPrice(product.discountedPrice || product.price)}
                  </div>
                  <div className="savings">
                    {t.product.savings} {formatPrice(product.price - product.discountedPrice)}
                  </div>
                </>
              ) : (
                <div className="price">{formatPrice(product.price)}</div>
              )}
              <div className={`stock-info ${product.stock === 0 ? 'out-of-stock' : product.stock <= 5 ? 'low-stock' : ''}`}>
                {product.stock === 0 ? (
                  'Mahsulot tugagan'
                ) : (
                  <>Omborda: <strong>{product.stock} dona</strong></>
                )}
              </div>
            </div>

            <div className="description-section">
              <h3>{t.product.description}</h3>
              <p>{product.description}</p>
            </div>

            <div className="features-section">
              <h3>{t.product.features}</h3>
              <ul className="features-list">
                <li>{t.product.feature1}</li>
                <li>{t.product.feature2}</li>
                <li>{t.product.feature3}</li>
                <li>{t.product.feature4}</li>
                <li>{t.product.feature5}</li>
              </ul>
            </div>

            <div className="actions-section">
              <div className="quantity-control">
                <label htmlFor="quantity">{t.product.quantity}</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={product.stock || 1}
                  value={quantity}
                  onChange={(event) => handleQuantityChange(event.target.value)}
                  disabled={product.stock === 0}
                />
                {product.stock > 0 && (
                  <span className="stock-hint">{t.product.max} {product.stock}</span>
                )}
              </div>

              <button
                className={`btn-add-to-cart ${product.stock === 0 ? 'btn-disabled' : ''}`}
                onClick={product.stock > 0 ? handleAddToCart : undefined}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? t.product.outOfStock : t.product.addToCart}
              </button>

              <button
                className="btn-wishlist"
              >
                {t.product.wishlist}
              </button>
            </div>

            <div className="shipping-info">
              <div className="shipping-item">
                <span className="icon">Quti</span>
                <span>{t.product.freeShipping}</span>
              </div>
              <div className="shipping-item">
                <span className="icon">Qaytish</span>
                <span>{t.product.returnPolicy}</span>
              </div>
              <div className="shipping-item">
                <span className="icon">Xavfsiz</span>
                <span>{t.product.securePayment}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="related-section">
        <div className="container">
          <h2>{t.product.relatedTitle}</h2>
          <div className="related-placeholder">
            <p>
              {t.product.relatedText} <Link to="/mens">{t.product.men}</Link> va <Link to="/womens">{t.product.women}</Link> {t.product.toplamlarini}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
