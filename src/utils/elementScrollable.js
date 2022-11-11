export const canScrollToLeft = (element) => {
  return element.scrollLeft > 0;
};

export const canScrollToRight = (element) => {
  const { scrollWidth, clientWidth, scrollLeft } = element;
  return scrollWidth - clientWidth !== scrollLeft;
};
