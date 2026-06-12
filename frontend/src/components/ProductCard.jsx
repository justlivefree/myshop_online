import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (event) => {
    event.preventDefault();
    addToCart(product);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />

          {product.stock === 0 && (
            <div className="stock-badge out-of-stock">
              Tugagan
            </div>
          )}

          {product.stock > 0 && product.stock <= 5 && (
            <div className="stock-badge low-stock">
              {product.stock} dona qoldi
            </div>
          )}

          {product.discount > 0 && (
            <div className="discount-badge">
              -{product.discount}%
            </div>
          )}

          <div className="product-overlay">
            <button className="btn-view-details">Tafsilotlarni ko'rish</button>
          </div>
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>

          <div className="product-price">
            {product.discount > 0 ? (
              <>
                <span className="original-price">{formatPrice(product.price)}</span>
                <span className="discounted-price">
                  {formatPrice(product.discountedPrice || product.price)}
                </span>
              </>
            ) : (
              <span className="price">{formatPrice(product.price)}</span>
            )}
          </div>

          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="reviews">(48)</span>
          </div>
        </div>
      </Link>

      <button
        className={`btn-add-cart ${product.stock === 0 ? 'btn-disabled' : ''}`}
        onClick={product.stock > 0 ? handleAddToCart : undefined}
        disabled={product.stock === 0}
      >
        <svg className="cart-icon-btn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 2L6 6H4C2.9 6 2 6.9 2 8V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6H18L15 2M9 2H15M9 2L10 6H14L15 2" />
        </svg>
        {product.stock === 0 ? 'Tugagan' : 'Savatga qo\'shish'}
      </button>
    </div>
  );
};

export default ProductCard;
