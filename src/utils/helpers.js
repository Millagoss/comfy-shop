export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

export const getUniqueValues = (products, param) => {
  let uniqueVaues = [];

  if (products.length > 0) {
    uniqueVaues = products.map((product) => product[param]);

    if (param === 'colors') {
      uniqueVaues = uniqueVaues.flat();
    }
  }
  return ['all', ...new Set(uniqueVaues)];
};
