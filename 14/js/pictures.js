import { showBigPhoto } from './big-picture.js';

const pictureContainer = document.querySelector('.pictures');
const pictureFragments = document.createDocumentFragment();
const picturesTemplate = document.querySelector('#picture').content.querySelector('a');

const removePhotos = () => {
  document.querySelectorAll('.picture').forEach((photo) => photo.remove());
};

const createPhoto = (picture) => {
  const currentPhoto = picturesTemplate.cloneNode(true);
  currentPhoto.querySelector('img').src = picture.url;
  currentPhoto.querySelector('img').alt = picture.description;
  currentPhoto.querySelector('.picture__comments').textContent = picture.comments.length;
  currentPhoto.querySelector('.picture__likes').textContent = picture.likes;

  const onPhotoClick = (evt) => {
    evt.preventDefault();
    showBigPhoto(picture);
  };
  currentPhoto.dataset.id = picture.id;
  currentPhoto.addEventListener('click', onPhotoClick);
  pictureFragments.append(currentPhoto);
};

const renderPhotos = (pictures) => {
  pictures.forEach((picture) => {
    createPhoto(picture);
  });
  pictureContainer.append(pictureFragments);
};

export {renderPhotos, removePhotos};
