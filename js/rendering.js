import {createPosts} from './data.js';

const picturesElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const newPosts = createPosts();

const postsFragment = document.createDocumentFragment();

newPosts.forEach(({url, likes, comments}) => {
  const newElement = pictureTemplate.cloneNode(true);
  newElement.querySelector('.picture__img').src = url;
  newElement.querySelector('.picture__likes').textContent = likes;
  newElement.querySelector('.picture__comments').textContent = comments.length;
  postsFragment.appendChild(newElement);
});

picturesElement.appendChild(postsFragment);
