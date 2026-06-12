export const formatPrice = (price) => {
  const num = Number(price);
  if (isNaN(num)) return '0 so\'m';
  return `${num.toLocaleString('uz-UZ')} so'm`;
};
