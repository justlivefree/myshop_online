import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getDiscountedProducts,
  searchProducts,
  sortProducts,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/featured', getFeaturedProducts);
router.get('/discounted', getDiscountedProducts);
router.get('/search', searchProducts);
router.get('/sort', sortProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
