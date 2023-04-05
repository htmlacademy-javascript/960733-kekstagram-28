import {isEscapeKey} from './util.js';

const COMMENTS_TO_SHOW = 5;

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

  postCommentsCounter.innerHTML = `${commentsQuantity} из <span class="comments-count">${postComments.length}</span> комментариев`;

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

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', closePostModal);

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

  while (postCommentsContainer.firstChild) {
    postCommentsContainer.removeChild(postCommentsContainer.firstChild);
  }

  postComments = comments;
  commentsQuantity = 0;
  showMoreComments();

  pageBody.classList.add('modal-open');
  fullPostDialog.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closePostModal);
  postCommentsLoader.addEventListener('click', showMoreComments);
};

const onSmallImageClick = (evt, posts) => {
  const elementParent = evt.target.closest('a');

  if (!elementParent) {
    return;
  }
  if (isSmallPostImage(elementParent)) {
    const postId = elementParent.dataset.pictureId;
    const postData = posts[postId];
    openPostModal(postData);
  }
  evt.preventDefault();
};

export {onSmallImageClick};
