export const getTotals = (cart) => {
  let totalAmount = 0;
  let totalCost = 0;
  for (let item of cart.values()) {
    const { amount, price } = item;
    totalAmount += amount;
    totalCost += amount * price;
  }
  return { totalAmount, totalCost };
};
