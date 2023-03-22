import {createPosts} from './data.js';
import {onSmallImageClick} from './post-modal.js';
import './form.js';

const renderPosts = () => {
  const picturesElement = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const newPosts = createPosts();

  const postsFragment = document.createDocumentFragment();

  newPosts.forEach(({id, url, likes, comments}) => {
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
    onSmallImageClick(evt.target, newPosts);
  });
};

export {renderPosts};
