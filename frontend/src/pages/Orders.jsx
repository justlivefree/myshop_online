import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../utils/api';
import { formatPrice } from '../utils/format';
import useTranslation from '../utils/useTranslation';
import './Orders.css';

const Orders = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetchOrders();
        setOrders(
          res.data.data.map((o) => ({ ...o, status: o.status || 'topshirilmagan' }))
        );
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container">
          <p className="orders-loading">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="container">
          <p className="orders-error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <div className="container">
          <h1>{t.orders.title}</h1>
          <p>{orders.length} {t.orders.orderCount}</p>
        </div>
      </div>

      <div className="container">
        {orders.length === 0 ? (
          <div className="orders-empty">
            <h2>{t.orders.noOrders}</h2>
            <p>{t.orders.noOrdersDesc}</p>
            <Link to="/" className="btn btn-primary">{t.orders.browseProducts}</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order, index) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <span className="order-id">Order #{order.id}</span>
                    <span className="order-date">
                      {new Date(order.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="order-total">{formatPrice(order.total)}</div>
                </div>

                <div className="order-status-row">
                  <span className={`order-status-badge ${order.status === 'topshirildi' ? 'delivered' : 'pending'}`}>
                    {order.status === 'topshirildi' ? t.admin.delivered : t.admin.pending}
                  </span>
                </div>

                <div className="order-customer">
                  <span>Name: {order.customer_name}</span>
                  <span>Phone: {order.customer_phone}</span>
                  <span>Location: {order.location_user}</span>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="order-item-info">
                        <span className="order-item-name">{item.name}</span>
                        <span className="order-item-qty">Qty: {item.quantity}</span>
                      </div>
                      <div className="order-item-prices">
                        <span className="order-item-price">
                          {formatPrice(item.discounted_price || item.price)}
                        </span>
                        {item.discount > 0 && (
                          <span className="order-item-original">
                            {formatPrice(Number(item.price) * item.quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
