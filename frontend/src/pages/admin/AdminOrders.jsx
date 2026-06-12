import React, { useEffect, useState } from 'react';
import { fetchOrders, updateOrderStatus } from '../../utils/api';
import { formatPrice } from '../../utils/format';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await fetchOrders();
      setOrders(res.data.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeliver = async (orderId) => {
    try {
      await updateOrderStatus(orderId);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: 'topshirildi' } : o
        )
      );
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const filtered = orders.filter((o) => {
    if (filter === 'pending') return o.status !== 'topshirildi';
    if (filter === 'delivered') return o.status === 'topshirildi';
    return true;
  });

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-orders">
      <div className="admin-page-header">
        <div>
          <h1>Buyurtmalar</h1>
          <p>{orders.length} ta buyurtma</p>
        </div>
      </div>

      <div className="admin-filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Hammasi ({orders.length})
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Kutilmoqda ({orders.filter((o) => o.status !== 'topshirildi').length})
        </button>
        <button
          className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`}
          onClick={() => setFilter('delivered')}
        >
          Topshirildi ({orders.filter((o) => o.status === 'topshirildi').length})
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>Buyurtmalar topilmadi</p>
        </div>
      ) : (
        <div className="orders-list">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="order-card"
            >
              <div className="order-card-header">
                <div>
                  <span className="order-id">Buyurtma #{order.id}</span>
                  <span className="order-date">
                    {new Date(order.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="order-total">{formatPrice(order.total)}</div>
              </div>

              <div className="order-status-row">
                <span className={`status-badge ${order.status === 'topshirildi' ? 'delivered' : 'pending'}`}>
                  {order.status === 'topshirildi' ? 'Topshirildi' : 'Kutilmoqda'}
                </span>
                {order.status !== 'topshirildi' && (
                  <button
                    className="btn-deliver"
                    onClick={() => handleDeliver(order.id)}
                  >
                    Topshirildi deb belgilash
                  </button>
                )}
              </div>

              <div className="order-customer-info">
                <p><strong>Mijoz:</strong> {order.customer_name}</p>
                <p><strong>Telefon:</strong> {order.customer_phone}</p>
                <p><strong>Manzil:</strong> {order.location_user}</p>
              </div>

              <div className="order-items-list">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item-row">
                    <img src={item.image} alt={item.name} className="order-item-img" />
                    <div className="order-item-details">
                      <span className="order-item-name">{item.name}</span>
                      <span className="order-item-qty">x{item.quantity}</span>
                    </div>
                    <div className="order-item-price">
                      {formatPrice(item.discounted_price || item.price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
