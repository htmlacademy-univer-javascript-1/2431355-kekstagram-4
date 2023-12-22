import { isEscKey } from './util.js';

const COMMENTS_STEP =  5;

const body = document.body;
const commentTemplate = document.querySelector('#comments').content.querySelector('li');
const bigPictureForm = document.querySelector('.big-picture');
const bigPictureImage = bigPictureForm.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureForm.querySelector('.big-picture__social .likes-count');
const bigPictureDescription = bigPictureForm.querySelector('.big-picture__social .social__caption');
const bigPictureCommentsCount = bigPictureForm.querySelector('.social__comment-count');
const socialComments = document.querySelector('.social__comments');
const closeButton = document.querySelector('#picture-cancel');
const commentLoader = document.querySelector('.comments-loader');

let currentComments = [];
let visiableCommentsCount;

const renderComment = (comment) =>{
  const currentComment = commentTemplate.cloneNode(true);
  currentComment.querySelector('.social__picture').src = comment.avatar;
  currentComment.querySelector('.social__picture').alt = comment.name;
  currentComment.querySelector('.social__text').textContent = comment.message;
  return currentComment;
};

const renderComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach((element) => {
    commentFragment.append(renderComment(element));
  });
  return commentFragment;
};

const createComments = () => {
  socialComments.innerHTML = '';
  visiableCommentsCount  = Math.min(visiableCommentsCount, currentComments.length);
  const commentsSelected = currentComments.slice(0, visiableCommentsCount);

  if (currentComments.length <= COMMENTS_STEP || visiableCommentsCount >= currentComments.length){
    commentLoader.classList.add('hidden');
  }
  else {
    commentLoader.classList.remove('hidden');
  }
  bigPictureCommentsCount.textContent = `${visiableCommentsCount} из ${currentComments.length} комментариев`;
  socialComments.append(renderComments(commentsSelected));
};

const onLoadNewComments = (evt) => {
  evt.preventDefault();
  visiableCommentsCount += COMMENTS_STEP;
  createComments();
};

const renderBigPhoto = (data) =>{
  bigPictureImage.src = data.url;
  bigPictureLikes.textContent = data.likes;
  bigPictureDescription.textContent = data.description;
  bigPictureCommentsCount.textContent = data.comments.length;
};

const closeBigPhoto = () => {
  bigPictureForm.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  commentLoader.removeEventListener('click', onLoadNewComments);
};

function onDocumentKeyDown (evt) {
  if(isEscKey(evt)){
    evt.preventDefault();
    closeBigPhoto();
  }
}

const displayImageAndComments = (data) => {
  renderBigPhoto(data);
  createComments();
};

const showBigPhoto = (photo) => {
  bigPictureForm.classList.remove('hidden');
  body.classList.add('modal-open');

  currentComments = photo.comments;
  currentComments.slice();
  visiableCommentsCount = COMMENTS_STEP;

  displayImageAndComments(photo);

  document.addEventListener('keydown', onDocumentKeyDown);
  closeButton.addEventListener('click', closeBigPhoto);
  commentLoader.addEventListener('click', onLoadNewComments);
};

export {showBigPhoto};
