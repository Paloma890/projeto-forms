export const formatNumber = (number: string): string => {
  return number.slice(0, -4) + "-" + number.slice(-4)
};
