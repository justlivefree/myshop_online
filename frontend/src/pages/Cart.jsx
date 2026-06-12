import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { submitOrder } from '../utils/api';
import { formatPrice } from '../utils/format';
import useTranslation from '../utils/useTranslation';
import './Cart.css';

const Cart = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalDiscount } = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [locationUser, setLocationUser] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const subtotal = getTotalPrice();
  const discount = getTotalDiscount();
  const total = subtotal;

  const handleCheckout = async (e) => {
    e.preventDefault();
    const outOfStockItems = cart.filter(item => item.stock === 0);
    if (outOfStockItems.length > 0) {
      setError(t.cart.outOfStockWarning);
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await submitOrder({
        customerName,
        customerPhone,
        locationUser,
        items: cart
      });
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to submit order');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="cart-empty">
        <div className="empty-container">
          <div className="empty-icon">Success</div>
          <h2>{t.cart.successTitle}</h2>
          <p>{t.cart.successDesc}</p>
          <Link to="/" className="btn btn-primary">
            {t.cart.continueShopping}
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-container">
          <div className="empty-icon">Cart</div>
          <h2>{t.cart.empty}</h2>
          <p>{t.cart.emptyDesc}</p>
          <Link to="/" className="btn btn-primary">
            {t.cart.continueShopping}
          </Link>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <div className="container">
            <h1>{t.cart.checkoutTitle}</h1>
          </div>
        </div>

        <div className="cart-content container">
          <div className="checkout-form-wrapper">
            <form className="checkout-form" onSubmit={handleCheckout}>
              <div className="form-group">
                <label htmlFor="name">{t.cart.nameLabel}</label>
                <input
                  id="name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t.cart.namePlaceholder}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">{t.cart.phoneLabel}</label>
                <input
                  id="phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={t.cart.phonePlaceholder}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="locationUser">{t.cart.locationLabel}</label>
                <input
                  id="locationUser"
                  type="text"
                  value={locationUser}
                  onChange={(e) => setLocationUser(e.target.value)}
                  placeholder={t.cart.locationPlaceholder}
                  required
                />
              </div>

              {error && <p className="form-error">{error}</p>}

              <div className="checkout-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? t.cart.processing : t.cart.confirmOrder}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCheckout(false)}
                >
                  {t.cart.backToCart}
                </button>
              </div>
            </form>

            <div className="checkout-summary">
              <h3>{t.cart.orderSummary}</h3>
              <div className="summary-row">
                <span>{t.cart.orderElements}</span>
                <span>{cart.length}</span>
              </div>
              <div className="summary-row">
                <span>{t.cart.total}</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="container">
          <h1>{t.cart.title}</h1>
          <p>{cart.length} {t.cart.itemsInCart}</p>
        </div>
      </div>

      <div className="cart-content container">
        <div className="cart-grid">
          <div className="cart-items-section">
            <button
              className="btn-clear-cart"
              onClick={clearCart}
            >
              {t.cart.clearCart}
            </button>

            <div className="cart-items-list">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="cart-item"
                >
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="item-details">
                    <Link to={`/product/${item.id}`} className="item-name">
                      {item.name}
                    </Link>
                    <p className="item-category">{item.category}</p>
                    {item.discount > 0 && (
                      <span className="item-discount">Save -{item.discount}%</span>
                    )}
                    {item.stock > 0 && item.stock <= 5 && (
                      <span className="item-stock-warning">Atigi {item.stock} dona qoldi</span>
                    )}
                    {item.stock === 0 && (
                      <span className="item-stock-out">Mahsulot tugagan</span>
                    )}
                  </div>

                  <div className="item-controls">
                    <div className="quantity-group">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.id, Number.parseInt(event.target.value, 10), item.stock)}
                        className="qty-input"
                        disabled={item.stock === 0}
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.stock)}
                        className="qty-btn"
                        disabled={item.stock > 0 && item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>

                    <div className="item-price">
                      <span className="price">
                        {formatPrice((item.discountedPrice || item.price) * item.quantity)}
                      </span>
                      {item.discount > 0 && (
                        <span className="original">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    className="btn-remove"
                    onClick={() => removeFromCart(item.id)}
                    title="Savatdan olib tashlash"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="order-summary">
            <h2>{t.cart.orderSummary}</h2>

            <div className="summary-section">
              <div className="summary-row">
                <span>{t.cart.total}</span>
                <span className="amount">{formatPrice(total)}</span>
              </div>

              {discount > 0 && (
                <div className="summary-row discount">
                  <span>{t.cart.discount}</span>
                  <span className="amount">-{formatPrice(discount)}</span>
                </div>
              )}


              <div className="summary-row shipping">
                <span>{t.cart.shipping}</span>
                <span className="amount free">{t.cart.free}</span>
              </div>
            </div>

            <div className="summary-total">
              <span>{t.cart.price}</span>
              <span className="total-amount">{formatPrice(subtotal)}</span>
            </div>

            {cart.some(item => item.stock === 0) && (
              <div className="stock-error-banner">
                {t.cart.outOfStockWarning}
              </div>
            )}

            <button
              className={`btn-checkout ${cart.some(item => item.stock === 0) ? 'btn-disabled' : ''}`}
              onClick={cart.some(item => item.stock === 0) ? undefined : () => setShowCheckout(true)}
              disabled={cart.some(item => item.stock === 0)}
            >
              {t.cart.placeOrder}
            </button>

            <button
              className="btn-continue-shopping"
              onClick={() => navigate('/')}
            >
              {t.cart.continueShopping}
            </button>

            <div className="benefits">
              <div className="benefit">
                <span className="icon">OK</span>
                <span>{t.cart.secure}</span>
              </div>
              <div className="benefit">
                <span className="icon">OK</span>
                <span>{t.cart.freeReturns}</span>
              </div>
              <div className="benefit">
                <span className="icon">OK</span>
                <span>{t.cart.fastDelivery}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
