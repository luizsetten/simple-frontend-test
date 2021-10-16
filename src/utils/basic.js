// string
export const removeNonDigitsFromString = (s) => {
  if (!s) return s;
  return s.replace(/\D/g, '');
};
