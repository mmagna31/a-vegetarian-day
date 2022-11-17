export const truncate = (value, numChar = 0) => {
  return numChar !== 0 && value.length > numChar
    ? `${value.slice(0, numChar)}...`
    : value;
};
