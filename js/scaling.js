const STEP = 25;
const DEFAULT = 100;
const MIN = 25;
const MAX = 100;

const controlValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

const scaleImage = (percent) => {
  imagePreviewElement.style.transform = `scale(${percent / 100})`;
  controlValueElement.value = `${percent}%`;
};

const onIncreaseScaleClick = () => {
  const scalePercent = parseInt(controlValueElement.value, 10);
  let newScalePercent = scalePercent + STEP;
  newScalePercent = newScalePercent > MAX ? MAX : newScalePercent;
  scaleImage(newScalePercent);
};

const onDecreaseScaleClick = () => {
  const scalePercent = parseInt(controlValueElement.value, 10);
  let newScalePercent = scalePercent - STEP;
  newScalePercent = newScalePercent < MIN ? MIN : newScalePercent;
  scaleImage(newScalePercent);
};

const setDefaultScale = () => scaleImage(DEFAULT);

export {onIncreaseScaleClick};
export {onDecreaseScaleClick};
export {setDefaultScale};
