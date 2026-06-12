import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const fetchProducts = (params = {}) => {
  return api.get('/products', { params });
};

export const fetchProductById = (id) => {
  return api.get(`/products/${id}`);
};

export const fetchProductsByCategory = (category) => {
  return api.get(`/products/category/${category}`);
};

export const fetchDiscountedProducts = () => {
  return api.get('/products/discounted');
};

export const searchProducts = (query) => {
  return api.get('/products/search', { params: { q: query } });
};

export const sortProducts = (params = {}) => {
  return api.get('/products/sort', { params });
};

export const fetchFeaturedProducts = () => {
  return api.get('/products/featured');
};

export const submitOrder = (orderData) => {
  return api.post('/orders', orderData);
};

export const fetchOrders = () => {
  return api.get('/orders');
};

export const updateOrderStatus = (id) => {
  return api.patch(`/orders/${id}/status`);
};

export const createProduct = (formData) => {
  return api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateProduct = (id, formData) => {
  return api.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

export const fetchDashboardStats = () => {
  return api.get('/orders/stats');
};

export default api;
