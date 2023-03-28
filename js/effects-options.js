const EFFECTS_OPTIONS = {
  none: {
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
  chrome: {
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
  sepia: {
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
  marvin: {
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
  phobos: {
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
  heat: {
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

export {EFFECTS_OPTIONS};
