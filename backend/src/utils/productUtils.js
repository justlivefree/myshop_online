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
  if (!image) return '/images/lemaleparfume.webp';
  // Strip old hardcoded localhost URLs → relative path
  if (image.startsWith('http://localhost') || image.startsWith('https://localhost')) {
    const url = new URL(image);
    return url.pathname;
  }
  return image;
};

export const formatProduct = (product) => ({
  ...product,
  image: resolveImage(product.image),
  discountedPrice: calculateDiscountedPrice(Number(product.price), product.discount),
});

export const formatProducts = (products) => products.map(formatProduct);
