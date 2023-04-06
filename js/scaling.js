const STEP = 25;
const DEFAULT = 100;
const PERCENT_DIVIDER = 100;
const MIN = 25;
const MAX = 100;

const controlValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

const scaleImage = (percent) => {
  imagePreviewElement.style.transform = `scale(${percent / PERCENT_DIVIDER})`;
  controlValueElement.value = `${percent}%`;
};

const onChangeScaleClick = (evt) => {
  if (!evt.target.matches('.scale__control')) {
    return;
  }
  const scalePercent = parseInt(controlValueElement.value, 10);
  let newScalePercent = DEFAULT;
  if (evt.target.matches('.scale__control--smaller')) {
    newScalePercent = scalePercent - STEP;
    newScalePercent = newScalePercent < MIN ? MIN : newScalePercent;
  } else if (evt.target.matches('.scale__control--bigger')) {
    newScalePercent = scalePercent + STEP;
    newScalePercent = newScalePercent > MAX ? MAX : newScalePercent;
  }
  scaleImage(newScalePercent);
};

const setDefaultScale = () => scaleImage(DEFAULT);

export {onChangeScaleClick};
export {setDefaultScale};
