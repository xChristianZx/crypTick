export const numPadding = num => {
  return Number.parseFloat(num).toFixed(2);
};

export const currencyFormatting = num => {
  const usdFormatting = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  return usdFormatting.format(num);
};

export const marketCapFormatting = num => {
  const usdFormatting = new Intl.NumberFormat("en-US", {
    style: "decimal",
    currency: "USD",
    minimumFractionDigits: 0
  });
  return usdFormatting.format(num);
};
