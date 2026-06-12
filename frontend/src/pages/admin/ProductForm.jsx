import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById, createProduct, updateProduct } from '../../utils/api';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    category: 'men',
    price: '',
    discount: '',
    stock: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      const loadProduct = async () => {
        try {
          const res = await fetchProductById(id);
          const p = res.data.data;
          setFormData({
            name: p.name,
            category: p.category,
            price: p.price.toString(),
            discount: p.discount.toString(),
            stock: p.stock.toString(),
            description: p.description || '',
          });
          if (p.image) setPreview(p.image);
        } catch (err) {
          setError('Mahsulotni yuklashda xatolik');
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('category', formData.category);
      fd.append('price', formData.price);
      fd.append('discount', formData.discount || '0');
      fd.append('stock', formData.stock || '0');
      fd.append('description', formData.description);
      if (imageFile) fd.append('image', imageFile);

      if (isEdit) {
        await updateProduct(id, fd);
      } else {
        await createProduct(fd);
      }
      navigate('/admin/products');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Saqlashda xatolik yuz berdi');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-product-form">
      <div className="admin-page-header">
        <h1>{isEdit ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot'}</h1>
      </div>

      <form
        className="product-form"
        onSubmit={handleSubmit}
      >
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Nomi *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Mahsulot nomi"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategoriya *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="men">Erkaklar</option>
              <option value="women">Ayollar</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Narx (so'm) *</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="discount">Chegirma (%)</label>
            <input
              id="discount"
              name="discount"
              type="number"
              min="0"
              max="100"
              value={formData.discount}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Ombor soni</label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Rasm</label>
            <input
              id="image"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
            />
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Tavsif</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mahsulot tavsifi..."
            rows={5}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Saqlanmoqda...' : isEdit ? 'Saqlash' : 'Yaratish'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/products')}
          >
            Bekor qilish
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
