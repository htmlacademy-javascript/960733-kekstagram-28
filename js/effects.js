import {Options} from './effects-options.js';

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');

let choosenOption = Options.NONE;

const OnSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();

  imagePreviewElement.style.filter = choosenOption === Options.NONE
    ? imagePreviewElement.style.filter = choosenOption.filter
    : `${choosenOption.filter}(${sliderValue}${choosenOption.unit})`;

  effectValueElement.value = sliderValue;
};

const changeSliderVisibility = (visibility) => {
  if (visibility) {
    sliderContainerElement.classList.remove('hidden');
    return;
  }
  sliderContainerElement.classList.add('hidden');
};

const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  const targetValue = evt.target.value;
  choosenOption = Options[targetValue.toUpperCase()];
  imagePreviewElement.className = `effects__preview--${targetValue}`;
  changeSliderVisibility(choosenOption !== Options.NONE);
  sliderElement.noUiSlider.updateOptions(choosenOption);
};

const setDefaultEffect = () => {
  choosenOption = Options.NONE;
  sliderElement.noUiSlider.updateOptions(choosenOption);
  changeSliderVisibility(false);
};

noUiSlider.create(sliderElement, choosenOption);
sliderElement.noUiSlider.on('update', OnSliderUpdate);
changeSliderVisibility(false);

export {onEffectChange};
export {setDefaultEffect};
