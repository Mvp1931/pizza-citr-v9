const Intlf = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const priceConverter = (price) => Intlf.format(price);
export const useCurrency = (price) => {
  return priceConverter(price);
};
