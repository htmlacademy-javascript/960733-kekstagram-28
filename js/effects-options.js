const Options = {
  NONE: {
    filter: 'none',
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    unit: '',
    connect: 'lower'
  },
  CHROME: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    unit: '',
    connect: 'lower'
  },
  SEPIA: {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    unit: '',
    connect: 'lower'
  },
  MARVIN: {
    filter: 'invert',
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    unit: '%',
    connect: 'lower'
  },
  PHOBOS: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    unit: 'px',
    connect: 'lower'
  },
  HEAT: {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1,
    unit: '',
    connect: 'lower'
  }
};

export {Options};
