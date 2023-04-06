import {isEscapeKey, cleanStringDoubleSpaces} from './util.js';
import {onChangeScaleClick, setDefaultScale} from './scaling.js';
import {onEffectChange, setDefaultEffect} from './effects.js';
import {sendRequest} from './requests.js';

const TAGS_VALIDATE_ERROR_TEXT = 'Неверно указаны хэш-теги';
const MAX_TAGS_QUANTITY = 5;
const TAG_VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const SEND_DATA_URL = 'https://28.javascript.pages.academy/kekstagram';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imageEditorDialog = document.querySelector('.img-upload__overlay');
const pageBody = document.querySelector('body');
const closeButton = imageEditorDialog.querySelector('.img-upload__cancel');
const hashTags = imageEditorDialog.querySelector('.text__hashtags');
const comment = imageEditorDialog.querySelector('.text__description');
const changeScaleElement = imageEditorDialog.querySelector('.img-upload__scale');
const effectsElement = imageEditorDialog.querySelector('.effects');
const submitButton = imageEditorDialog.querySelector('.img-upload__submit');
let connectionErrorShown = false;
let sendDataSucessShown = false;
let formData = undefined;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const containUniqueTags = (tags) => {
  const tagsInLowerCase = tags.map((tag) => tag.toLowerCase());
  return tagsInLowerCase.length === new Set(tagsInLowerCase).size;
};

const isValidTag = (tag) => TAG_VALID_SYMBOLS.test(tag);

const validateHashTags = (value) => {
  if (!value) {
    return true;
  }
  const tags = cleanStringDoubleSpaces(value.trim()).split(' ');
  return tags.every(isValidTag) && tags.length <= MAX_TAGS_QUANTITY && containUniqueTags(tags);

};

pristine.addValidator(
  hashTags,
  validateHashTags,
  TAGS_VALIDATE_ERROR_TEXT
);

const isTextFieldInFocus = () => document.activeElement === hashTags || document.activeElement === comment;

const onMouseClick = (evt) => {
  if (connectionErrorShown) {
    const errorElemenet = document.querySelector('.error__inner');
    if (!evt.composedPath().includes(errorElemenet)) {
      closeErrorBlock();
    }
  } else if (sendDataSucessShown) {
    const successElemenet = document.querySelector('.success__inner');
    if (!evt.composedPath().includes(successElemenet)) {
      closeSuccessBlock();
      closeImageEditor();
    }
  }
};

const onDocumentKeydown = (evt) => {
  if (!isEscapeKey(evt)) {
    return;
  }
  if (connectionErrorShown) {
    closeErrorBlock();
  } else if (sendDataSucessShown) {
    closeSuccessBlock();
    closeImageEditor();
  } else if (!isTextFieldInFocus()) {
    closeImageEditor();
  }
};

function closeErrorBlock() {
  const errorElemenet = document.querySelector('.error');
  pageBody.removeChild(errorElemenet);
  document.removeEventListener('click', onMouseClick);
  connectionErrorShown = false;
}

function closeSuccessBlock() {
  const successElemenet = document.querySelector('.success');
  pageBody.removeChild(successElemenet);
  document.removeEventListener('click', onMouseClick);
  sendDataSucessShown = false;
}

const onTryAgainButtonClick = () => {
  closeErrorBlock();
};

const onOkButtonClick = () => {
  closeSuccessBlock();
  closeImageEditor();
};

const showConnectionError = () => {
  connectionErrorShown = true;
  submitButton.disabled = false;
  const errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  const errorElement = errorTemplate.cloneNode(true);
  pageBody.appendChild(errorElement);

  const tryAgainButton = errorElement.querySelector('.error__button');
  tryAgainButton.addEventListener('click', onTryAgainButtonClick);
  document.addEventListener('click', onMouseClick);
};

const showSuccessMessage = () => {
  sendDataSucessShown = true;
  const sucсessTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  const sucсessElement = sucсessTemplate.cloneNode(true);
  pageBody.appendChild(sucсessElement);
  const okButton = sucсessElement.querySelector('.success__button');
  okButton.addEventListener('click', onOkButtonClick);
  document.addEventListener('click', onMouseClick);
};

function saveNewPost() {
  const options = {
    method: 'POST',
    body: formData,
  };
  sendRequest(SEND_DATA_URL, showSuccessMessage, showConnectionError, options);
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    submitButton.disabled = true;
    formData = new FormData(evt.target);
    saveNewPost();
  }
};

function closeImageEditor () {
  imageEditorDialog.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeImageEditor);
  document.removeEventListener('keydown', onDocumentKeydown);
  form.removeEventListener('submit', onFormSubmit);
  changeScaleElement.removeEventListener('click', onChangeScaleClick);
  effectsElement.removeEventListener('change', onEffectChange);

  setDefaultScale();
  setDefaultEffect();
  submitButton.disabled = false;
  form.reset();
  pristine.validate();
}

const openImageEditor = () => {
  imageEditorDialog.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  setDefaultScale();

  closeButton.addEventListener('click', closeImageEditor);
  document.addEventListener('keydown', onDocumentKeydown);
  changeScaleElement.addEventListener('click', onChangeScaleClick);
  effectsElement.addEventListener('change', onEffectChange);
  form.addEventListener('submit', onFormSubmit);
};

const OnFileUploadChange = () => {
  const fileInputElement = document.querySelector('.img-upload__start input[type=file]');
  const previewImageElement = document.querySelector('.img-upload__preview img');

  const file = fileInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    previewImageElement.src = URL.createObjectURL(file);

    const filterImagesPreview = document.querySelectorAll('.effects__preview');
    filterImagesPreview.forEach((filterImage) => {
      filterImage.style.backgroundImage = `url(${previewImageElement.src})`;
    });
    openImageEditor();
  }
};

uploadFile.addEventListener('change', OnFileUploadChange);
