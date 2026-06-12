import dotenv from 'dotenv';
dotenv.config();

/**
 * Calculate discounted price
 * @param {number} price - Original price
 * @param {number} discount - Discount percentage
 * @returns {number} Discounted price
 */
export const calculateDiscountedPrice = (price, discount) => {
  if (!discount || discount === 0) return price;
  return parseFloat((price - (price * discount) / 100).toFixed(2));
};

const resolveImage = (image) => {
  if (!image || image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  const base = process.env.API_URL || 'http://localhost:5000';
  return `${base}${image}`;
};

export const formatProduct = (product) => ({
  ...product,
  image: resolveImage(product.image),
  discountedPrice: calculateDiscountedPrice(Number(product.price), product.discount),
});

export const formatProducts = (products) => products.map(formatProduct);
