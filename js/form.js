import {isEscapeKey, cleanStringDoubleSpaces} from './util.js';

const TAGS_VALIDATE_ERROR_TEXT = 'Неверно указаны хэш-теги';
const MAX_TAGS_QUANTITY = 5;
const TAG_VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imageEditorDialog = document.querySelector('.img-upload__overlay');
const pageBody = document.querySelector('body');
const closeButton = imageEditorDialog.querySelector('.img-upload__cancel');
const hashTags = imageEditorDialog.querySelector('.text__hashtags');
const comment = imageEditorDialog.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const containUniqueTags = (tags) => {
  const tagsInLowerCase = tags.map((tag) => tag.toLowerCase());
  return tagsInLowerCase.length === new Set(tagsInLowerCase).size;
};

const isValidTag = (tag) => TAG_VALID_SYMBOLS.test(tag);

const ValidateHashTags = (value) => {
  const tags = cleanStringDoubleSpaces(value.trim()).split(' ');
  return tags.every(isValidTag) && tags.length <= MAX_TAGS_QUANTITY && containUniqueTags(tags);

};

pristine.addValidator(
  hashTags,
  ValidateHashTags,
  TAGS_VALIDATE_ERROR_TEXT
);

const isTextFieldInFocus = () => document.activeElement === hashTags || document.activeElement === comment;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldInFocus()) {
    closeImageEditor();
  }
};

const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

function closeImageEditor () {

  imageEditorDialog.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeImageEditor);
  document.removeEventListener('keydown', onDocumentKeydown);
  form.removeEventListener('submit', onFormSubmit);

  form.reset();
}

const openImageEditor = () => {
  // Отобразим форму редактирования публикации.
  imageEditorDialog.classList.remove('hidden');
  // Исключим прокрутку позади модального окна.
  pageBody.classList.add('modal-open');
  // Закрытие формы на крестик.
  closeButton.addEventListener('click', closeImageEditor);
  // Закрытие формы на ESC.
  document.addEventListener('keydown', onDocumentKeydown);

  // Добавим валидацию перед отправкой формы.
  form.addEventListener('submit', onFormSubmit);
};

const OnFileUploadChange = () => openImageEditor();

uploadFile.addEventListener('change', OnFileUploadChange);
