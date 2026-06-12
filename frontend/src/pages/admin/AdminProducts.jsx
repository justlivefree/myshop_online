import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../utils/api';
import { formatPrice } from '../../utils/format';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetchProducts({ limit: 100 });
      setProducts(res.data.data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`"${name}" mahsulotini o'chirishni xohlaysizmi?`)) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Mahsulotni o\'chirishda xatolik yuz berdi');
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-products">
      <div className="admin-page-header">
        <div>
          <h1>Mahsulotlar</h1>
          <p>{products.length} ta mahsulot</p>
        </div>
        <Link to="/admin/products/new" className="btn btn-primary">
          + Yangi mahsulot
        </Link>
      </div>

      <div className="admin-search-bar">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Mahsulot qidirish..."
        />
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Rasm</th>
              <th>Nomi</th>
              <th>Kategoriya</th>
              <th>Narx</th>
              <th>Chegirma</th>
              <th>Ombor</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="admin-product-thumb"
                  />
                </td>
                <td>{product.name}</td>
                <td>
                  <span className="category-badge">{product.category}</span>
                </td>
                <td>{formatPrice(product.price)}</td>
                <td>{product.discount > 0 ? `-${product.discount}%` : '-'}</td>
                <td>
                  <span className={`stock-badge ${product.stock === 0 ? 'out' : product.stock <= 5 ? 'low' : ''}`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="btn-edit"
                    >
                      Tahrirlash
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(product.id, product.name)}
                    >
                      O'chirish
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
