import {EFFECTS_OPTIONS} from './effects-options.js';

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');

let choosenOption = EFFECTS_OPTIONS.none;

const OnSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();

  imagePreviewElement.style.filter = choosenOption === EFFECTS_OPTIONS.none
    ? imagePreviewElement.style.filter = choosenOption.filter
    : `${choosenOption.filter}(${sliderValue}${choosenOption.unit})`;

  effectValueElement.value = sliderValue;
};

const hideSlider = () => {
  sliderContainerElement.classList.add('hidden');
};

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  const targetValue = evt.target.value;
  choosenOption = EFFECTS_OPTIONS[targetValue];
  imagePreviewElement.className = `effects__preview--${targetValue}`;
  if (choosenOption === EFFECTS_OPTIONS.none) {
    hideSlider();
  } else {
    sliderContainerElement.classList.remove('hidden');
  }
  sliderElement.noUiSlider.updateOptions(choosenOption);
};

const setDefaultEffect = () => {
  sliderElement.noUiSlider.updateOptions(EFFECTS_OPTIONS.none);
};

noUiSlider.create(sliderElement, choosenOption);
sliderElement.noUiSlider.on('update', OnSliderUpdate);
hideSlider();

export {onEffectChange};
export {setDefaultEffect};
