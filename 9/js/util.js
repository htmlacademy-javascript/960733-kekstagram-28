export const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const cleanStringDoubleSpaces = (str) => str.replace(/\s{2,}/g, ' ');
