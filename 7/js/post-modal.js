import {isEscapeKey} from './util.js';

const fullPostDialog = document.querySelector('.big-picture');
const postImage = fullPostDialog.querySelector('.big-picture__img').querySelector('img');
const postLikesCount = fullPostDialog.querySelector('.likes-count');
const postCommentsCount = fullPostDialog.querySelector('.comments-count');
const postCommentsContainer = fullPostDialog.querySelector('.social__comments');
const postDescription = fullPostDialog.querySelector('.social__caption');
const closeButton = fullPostDialog.querySelector('.big-picture__cancel');

const pageBody = document.querySelector('body');

const postCommentsCounter = fullPostDialog.querySelector('.social__comment-count');
const postCommentsLoader = fullPostDialog.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closePostModal();
  }
};

function closePostModal () {
  pageBody.classList.remove('modal-open');
  fullPostDialog.classList.add('hidden');

  // Удалим обработчики закрытия модального окна.
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', closePostModal);
}

const isSmallPostImage = (element) => element.matches('.picture');

const openPostModal = ({url, likes, description, comments}) => {
  postImage.src = url;
  postLikesCount.textContent = likes;
  postCommentsCount.textContent = comments.length;
  postDescription.textContent = description;

  // Удалим все существующие комментарии.
  while (postCommentsContainer.firstChild) {
    postCommentsContainer.removeChild(postCommentsContainer.firstChild);
  }

  // Вывод комментариев.
  comments.forEach((element) => {
    const newCommentImage = document.createElement('img');
    newCommentImage.src = element.avatar;
    newCommentImage.alt = element.name;
    newCommentImage.width = 35;
    newCommentImage.height = 35;
    newCommentImage.classList.add('social__picture');

    const newCommentMessage = document.createElement('p');
    newCommentMessage.textContent = element.message;
    newCommentMessage.classList.add('social__text');

    const newComment = document.createElement('li');
    newComment.appendChild(newCommentImage);
    newComment.appendChild(newCommentMessage);
    newComment.classList.add('social__comment');

    postCommentsContainer.appendChild(newComment);
  });

  // Спрячем загрузку новых комментариев
  postCommentsCounter.classList.add('hidden');
  postCommentsLoader.classList.add('hidden');

  // Исключим прокрутку позади модального окна
  pageBody.classList.add('modal-open');

  // Отображаем модальное окно.
  fullPostDialog.classList.remove('hidden');

  // Подписка на событие нажатия клавиши, чтобы закрыть по ESC.
  document.addEventListener('keydown', onDocumentKeydown);

  // Подписка на клик мышью.
  closeButton.addEventListener('click', () => {
    closePostModal();
  });
};

const onSmallImageClick = (sourceElement, posts) => {
  const elementParent = sourceElement.closest('a');

  if (isSmallPostImage(elementParent)) {
    const postId = elementParent.querySelector('.picture__id').textContent;
    const postData = posts[postId - 1];
    openPostModal(postData);
  }
};

export {onSmallImageClick};
