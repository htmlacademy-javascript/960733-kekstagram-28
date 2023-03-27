import {onSmallImageClick} from './post-modal.js';
import {sendRequest} from './requests.js';
import './form.js';

const SOURCE_DATA_URL = 'https://28.javascript.pages.academy/kekstagram/data';
const ERROR_SHOW_TIME = 7000;

const renderPosts = (posts) => {
  const picturesElement = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const postsFragment = document.createDocumentFragment();

  posts.forEach(({id, url, likes, comments}) => {
    const newElement = pictureTemplate.cloneNode(true);
    newElement.querySelector('.picture__img').src = url;
    newElement.querySelector('.picture__likes').textContent = likes;
    newElement.querySelector('.picture__comments').textContent = comments.length;

    // Запишем идентификатор записи в dataset.
    newElement.dataset.pictureId = id;

    postsFragment.appendChild(newElement);
  });

  picturesElement.appendChild(postsFragment);

  picturesElement.addEventListener('click', (evt) => {
    onSmallImageClick(evt.target, posts);
  });
};

const showConnectionError = (errorDescription) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = '100';
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '0';
  errorContainer.style.top = '0';
  errorContainer.style.right = '0';
  errorContainer.style.padding = '10px 3px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'red';
  errorContainer.textContent = `Ошибка получения данных. ${errorDescription}`;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

const loadPosts = () => {
  sendRequest(SOURCE_DATA_URL, renderPosts, showConnectionError);
};

export {loadPosts};
