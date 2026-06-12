import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import AdminProducts from './AdminProducts';
import ProductForm from './ProductForm';
import AdminOrders from './AdminOrders';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('adminAuth') === 'true'
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Admin2003' && password === 'Toxir203.') {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Login yoki parol noto\'g\'ri');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <h1>Admin Panel</h1>
          <p className="admin-login-subtitle">JPG Perfumes Boshqaruv Tizimi</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="username">Login</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Login"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Parol</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parol"
                required
              />
            </div>
            {loginError && <p className="login-error">{loginError}</p>}
            <button type="submit" className="btn btn-primary">Kirish</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>JPG Admin</h2>
        </div>
        <nav className="admin-nav">
          <Link
            to="/admin"
            className={`admin-nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className={`admin-nav-link ${location.pathname.includes('/admin/products') ? 'active' : ''}`}
          >
            Mahsulotlar
          </Link>
          <Link
            to="/admin/orders"
            className={`admin-nav-link ${location.pathname === '/admin/orders' ? 'active' : ''}`}
          >
            Buyurtmalar
          </Link>
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-link">Asosiy sayt</Link>
          <button
            className="admin-logout-btn"
            onClick={() => { localStorage.removeItem('adminAuth'); setIsAuthenticated(false); }}
          >
            Chiqish
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
