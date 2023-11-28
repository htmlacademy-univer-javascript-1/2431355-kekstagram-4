const commentTemplate = document.querySelector('#comments').content.querySelector('li');


const picturesContainer = document.querySelector('.pictures');

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.big-picture__social .likes-count');
const postComments = document.querySelector('.social__comments');
const pictureCaption = bigPicture.querySelector('.big-picture__social .social__caption');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const pictureCloseButton = document.querySelector('#picture-cancel');
const loadComments = document.querySelector('.comments-loader');

const COMMENTS_STEP = 5;
let currentComments = [];
let viewCommentsCount;

const createComment = (comment) => {
  const currentComment = commentTemplate.cloneNode(true);
  currentComment.querySelector('.social__picture').src = comment.avatar;
  currentComment.querySelector('.social__picture').alt = comment.name;
  currentComment.querySelector('.social__text').textContent = comment.message;
  return(currentComment);
};

const createComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((element) => {
    fragment.append(createComment(element));
  });
  // postComments.append(fragment);
  return fragment;
};
const renderComments = () => {
  postComments.innerHTML = '';
  viewCommentsCount = Math.min(viewCommentsCount, currentComments.length);
  const commentsSelected = currentComments.slice(0, viewCommentsCount);

  if (currentComments.length <= COMMENTS_STEP || viewCommentsCount >= currentComments.length) {
    loadComments.classList.add('hidden');
  }
  else {
    loadComments.classList.remove('hidden');
  }
  bigPictureCommentsCount.textContent = `${viewCommentsCount} из ${currentComments.length} комментариев`;
  postComments.append(createComments(commentsSelected));
};

const onLoadCommentsButtonClick = (evt) => {
  evt.preventDefault();
  viewCommentsCount += COMMENTS_STEP;
  renderComments();
};

const renderBigPicture = (data) =>{
  bigPictureImage.src = data.url;
  likesCount.textContent = data.likes;
  pictureCaption.textContent = data.description;
  bigPictureCommentsCount.textContent = data.comments.length;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  loadComments.removeEventListener('click', onLoadCommentsButtonClick);
};

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const hideStatisticsElements = (picture) => {
  picture.querySelector('.picture__comments').classList.add('hidden');
  picture.querySelector('.picture__likes').classList.add('hidden');
};

const showImageAndComments = (data) => {
  renderBigPicture(data);
  renderComments(data.comments);
};

const showBigPicture = (data, picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  currentComments = data.comments.slice();
  viewCommentsCount = COMMENTS_STEP;

  hideStatisticsElements(picture);
  showImageAndComments(data);

  document.addEventListener('keydown', onDocumentKeyDown);
  pictureCloseButton.addEventListener('click', closeBigPicture);
  loadComments.addEventListener('click', onLoadCommentsButtonClick);
};

const initializePictures = (pictures) => {
  picturesContainer.addEventListener('click', (evt) =>{
    evt.preventDefault();
    const currentPicture = evt.target.closest('[data-id]');
    if(!currentPicture){
      return;
    }
    const pictureData = pictures.find((picture) => picture.id === +currentPicture.dataset.id);
    showBigPicture(pictureData, currentPicture);
  });
};

export {initializePictures};
