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

let postComments = [];
let commentsQuantity = 0;
const COMMENTS_TO_SHOW = 5;

const showMoreComments = () => {
  let avialableComments = commentsQuantity + COMMENTS_TO_SHOW;
  avialableComments = avialableComments > postComments.length ? avialableComments = postComments.length : avialableComments;

  for (let i = commentsQuantity; i < avialableComments; i++) {

    const newCommentImage = document.createElement('img');
    newCommentImage.src = postComments[i].avatar;
    newCommentImage.alt = postComments[i].name;
    newCommentImage.width = 35;
    newCommentImage.height = 35;
    newCommentImage.classList.add('social__picture');

    const newCommentMessage = document.createElement('p');
    newCommentMessage.textContent = postComments[i].message;
    newCommentMessage.classList.add('social__text');

    const newComment = document.createElement('li');
    newComment.appendChild(newCommentImage);
    newComment.appendChild(newCommentMessage);
    newComment.classList.add('social__comment');

    postCommentsContainer.appendChild(newComment);
  }

  commentsQuantity = avialableComments;

  // Выведем число отображенных комментариев.
  postCommentsCounter.textContent = `${commentsQuantity} из ${postComments.length} комментариев`;

  // Если выведены все комментарии, спрячем кнопку "загрузить ещё".
  if (commentsQuantity === postComments.length) {
    postCommentsLoader.classList.add('hidden');
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closePostModal();
  }
};

function closePostModal () {
  pageBody.classList.remove('modal-open');

  // Удалим обработчики закрытия модального окна.
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', closePostModal);

  // Удалим подписку на клик по "загрузить ещё комментарии", вернем отображение блока.
  postCommentsLoader.removeEventListener('click', showMoreComments);
  postCommentsLoader.classList.remove('hidden');

  fullPostDialog.classList.add('hidden');
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
  postComments = comments;
  commentsQuantity = 0;
  showMoreComments();

  // Исключим прокрутку позади модального окна
  pageBody.classList.add('modal-open');

  // Отображаем модальное окно.
  fullPostDialog.classList.remove('hidden');

  // Подписка на событие нажатия клавиши, чтобы закрыть по ESC.
  document.addEventListener('keydown', onDocumentKeydown);

  // Подписка на клик мышью для закрытия окна.
  closeButton.addEventListener('click', closePostModal);

  // Подписка на клик по "загрузить ещё комментарии"
  postCommentsLoader.addEventListener('click', showMoreComments);
};

const onSmallImageClick = (sourceElement, posts) => {
  const elementParent = sourceElement.closest('a');

  if (isSmallPostImage(elementParent)) {
    const postId = elementParent.querySelector('.picture__id').textContent;
    const postData = posts[postId - 1];
    openPostModal(postData);
  }
  sourceElement.preventDefault();
};

export {onSmallImageClick};
