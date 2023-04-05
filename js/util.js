export const isEscapeKey = (evt) => evt.key === 'Escape';

export const cleanStringDoubleSpaces = (str) => str.replace(/\s{2,}/g, ' ');

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
