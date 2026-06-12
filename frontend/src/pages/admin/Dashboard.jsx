import React, { useEffect, useState } from 'react';
import { fetchDashboardStats, fetchOrders } from '../../utils/api';
import { formatPrice } from '../../utils/format';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.all([
          fetchDashboardStats(),
          fetchOrders(),
        ]);
        setStats(statsRes.data.data);
        setRecentOrders(ordersRes.data.data.slice(0, 5));
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Xush kelibsiz, Admin</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon products">M</div>
          <div className="stat-info">
            <span className="stat-value">{stats?.totalProducts || 0}</span>
            <span className="stat-label">Mahsulotlar</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">B</div>
          <div className="stat-info">
            <span className="stat-value">{stats?.totalOrders || 0}</span>
            <span className="stat-label">Buyurtmalar</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon revenue">UZS</div>
          <div className="stat-info">
            <span className="stat-value">{formatPrice(stats?.totalRevenue || 0)}</span>
            <span className="stat-label">Jami daromad</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">!</div>
          <div className="stat-info">
            <span className="stat-value">{stats?.pendingOrders || 0}</span>
            <span className="stat-label">Kutilayotgan</span>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h2>So'nggi buyurtmalar</h2>
        {recentOrders.length === 0 ? (
          <p className="empty-message">Hozircha buyurtmalar yo'q</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Mijoz</th>
                  <th>Telefon</th>
                  <th>Jami</th>
                  <th>Holat</th>
                  <th>Sana</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.customer_phone}</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>
                      <span className={`status-badge ${order.status === 'topshirildi' ? 'delivered' : 'pending'}`}>
                        {order.status === 'topshirildi' ? 'Topshirildi' : 'Kutilmoqda'}
                      </span>
                    </td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
