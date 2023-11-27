const commentTemplate = document.querySelector('#comments').content.querySelector('li');

const picturesContainer = document.querySelector('.pictures');

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.big-picture__social .likes-count');
const pictureCaption = bigPicture.querySelector('.big-picture__social .social__caption');
const bigPictureCommentsCount = bigPicture.querySelector('.big-picture__social .comments-count');
const pictureCloseButton = document.querySelector('#picture-cancel');

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

  const postComments = document.querySelector('.social__comments');
  postComments.innerHTML = '';
  postComments.append(fragment);

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
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
  document.removeEventListener('keydown', onDocumentKeyDown)
}

const onDocumentKeyDown = (evt) => {
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
  createComments(data.comments);
};

const showBigPicture = (data, picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  hideStatisticsElements(picture);
  showImageAndComments(data);

  document.addEventListener('keydown', onDocumentKeyDown)
  pictureCloseButton.addEventListener('click', closeBigPicture)
}

const initPictures = (pictures) => {
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

export {initPictures};
