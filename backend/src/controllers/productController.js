import db from '../db.js';
import { formatProduct, formatProducts } from '../utils/productUtils.js';

export const getAllProducts = async (req, res) => {
  try {
    const { category, search, sort, discount, page = 1, limit = 12 } = req.query;

    let query = db('products').select('*');

    if (category && (category === 'men' || category === 'women')) {
      query = query.where('category', category);
    }

    if (search) {
      const searchTerm = `%${search.toLowerCase()}%`;
      query = query.where(function () {
        this.whereRaw('LOWER(name) LIKE ?', [searchTerm])
          .orWhereRaw('LOWER(description) LIKE ?', [searchTerm]);
      });
    }

    if (discount === 'true') {
      query = query.where('discount', '>', 0);
    }

    if (sort === 'asc') {
      query = query.orderBy('price', 'asc');
    } else if (sort === 'desc') {
      query = query.orderBy('price', 'desc');
    } else {
      query = query.orderBy('created_at', 'desc');
    }

    const countQuery = query.clone().clearSelect().clearOrder().count('id as total').first();

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;

    query = query.offset(startIndex).limit(limitNum);

    const [products, countResult] = await Promise.all([query, countQuery]);
    const total = parseInt(countResult.total);

    res.status(200).json({
      success: true,
      data: formatProducts(products),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching products' },
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db('products').where('id', id).first();

    if (!product) {
      return res.status(404).json({
        success: false,
        error: { message: 'Product not found' },
      });
    }

    res.status(200).json({
      success: true,
      data: formatProduct(product),
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching product' },
    });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (category !== 'men' && category !== 'women') {
      return res.status(400).json({
        success: false,
        error: { message: "Invalid category. Use 'men' or 'women'" },
      });
    }

    const products = await db('products')
      .where('category', category)
      .orderBy('created_at', 'desc');

    res.status(200).json({
      success: true,
      data: formatProducts(products),
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching category products:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching category products' },
    });
  }
};

export const getDiscountedProducts = async (req, res) => {
  try {
    const products = await db('products')
      .where('discount', '>', 0)
      .orderBy('discount', 'desc');

    res.status(200).json({
      success: true,
      data: formatProducts(products),
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching discounted products:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching discounted products' },
    });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        error: { message: 'Search query is required' },
      });
    }

    const searchTerm = `%${q.toLowerCase()}%`;
    const products = await db('products')
      .where(function () {
        this.whereRaw('LOWER(name) LIKE ?', [searchTerm])
          .orWhereRaw('LOWER(description) LIKE ?', [searchTerm]);
      })
      .orderBy('created_at', 'desc');

    res.status(200).json({
      success: true,
      data: formatProducts(products),
      count: products.length,
      query: q,
    });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error searching products' },
    });
  }
};

export const sortProducts = async (req, res) => {
  try {
    const { price, category, page = 1, limit = 12 } = req.query;

    if (!price || (price !== 'asc' && price !== 'desc')) {
      return res.status(400).json({
        success: false,
        error: { message: "Price parameter must be 'asc' or 'desc'" },
      });
    }

    let query = db('products').select('*');

    if (category && (category === 'men' || category === 'women')) {
      query = query.where('category', category);
    }

    query = query.orderBy('price', price);

    const countQuery = query.clone().clearSelect().clearOrder().count('id as total').first();

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;

    query = query.offset(startIndex).limit(limitNum);

    const [products, countResult] = await Promise.all([query, countQuery]);
    const total = parseInt(countResult.total);

    res.status(200).json({
      success: true,
      data: formatProducts(products),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
      sortedBy: price === 'asc' ? 'price_low_to_high' : 'price_high_to_low',
    });
  } catch (error) {
    console.error('Error sorting products:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error sorting products' },
    });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await db('products')
      .orderBy('discount', 'desc')
      .orderBy('created_at', 'desc')
      .limit(8);

    res.status(200).json({
      success: true,
      data: formatProducts(products),
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error fetching featured products' },
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category, price, discount, stock, description } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        error: { message: 'Name, category, and price are required' },
      });
    }

    if (category !== 'men' && category !== 'women') {
      return res.status(400).json({
        success: false,
        error: { message: "Category must be 'men' or 'women'" },
      });
    }

    const parsedPrice = parseFloat(Number(price).toFixed(2));
    const parsedDiscount = Math.min(100, Math.max(0, Math.round(Number(discount) || 0)));
    const parsedStock = Math.max(0, Math.round(Number(stock) || 0));

    if (isNaN(parsedPrice) || parsedPrice < 0 || parsedPrice > 9999999.99) {
      return res.status(400).json({
        success: false,
        error: { message: 'Price must be between 0 and 9,999,999.99' },
      });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const [product] = await db('products')
      .insert({
        name,
        category,
        price: parsedPrice,
        discount: parsedDiscount,
        stock: parsedStock,
        image,
        description: description || '',
      })
      .returning('*');

    res.status(201).json({
      success: true,
      data: formatProduct(product),
    });
  } catch (error) {
    console.error('Error creating product:', error.message);
    console.error('Full error:', error);
    res.status(500).json({
      success: false,
      error: { message: error.message || 'Error creating product' },
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, discount, stock, description } = req.body;

    const existing = await db('products').where('id', id).first();
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { message: 'Product not found' },
      });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (price !== undefined) updateData.price = parseFloat(Number(price).toFixed(2));
    if (discount !== undefined) updateData.discount = Math.min(100, Math.max(0, Math.round(Number(discount))));
    if (stock !== undefined) updateData.stock = Math.max(0, Math.round(Number(stock)));
    if (description !== undefined) updateData.description = description;
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const [product] = await db('products')
      .where('id', id)
      .update(updateData)
      .returning('*');

    res.status(200).json({
      success: true,
      data: formatProduct(product),
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error updating product' },
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await db('products').where('id', id).first();
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: { message: 'Product not found' },
      });
    }

    await db('products').where('id', id).del();

    res.status(200).json({
      success: true,
      data: { message: 'Product deleted successfully' },
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Error deleting product' },
    });
  }
};
