const fitForLength = (str, strLength) => str.length <= strLength;

const polindrom = (str) => {
  str = str.replaceAll(' ', '').toLowerCase();
  return str.split('').reverse().join('') === str;
};

const onlyDigits = (str) => str.replaceAll(/[^0-9]/g, '');

const customPad = (source, count, addition) => {
  if (source.length >= count) {
    return source;
  }
  const preffixLength = count - source.length;
  const sample = addition;

  addition = '';
  while (addition.length < preffixLength - sample.length) {
    addition += sample;
  }
  return sample.slice(0, preffixLength - addition.length) + addition + source;
};

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  let lastDigit = Number(num.toString().slice(-2));
  lastDigit = lastDigit > 20 ? Number(lastDigit.toString().slice(-1)) : lastDigit;
  if (lastDigit === 1) {
    return nominative;
  } else if (lastDigit > 4 || lastDigit === 0) {
    return genitivePlural;
  }
  return genitiveSingular;
};

export {fitForLength};
export {polindrom};
export {onlyDigits};
export {customPad};
export {numDecline};
