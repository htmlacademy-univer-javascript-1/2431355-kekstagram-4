const fragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content.querySelector('a');

const renderPhoto = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('img').src = picture.url;
  pictureElement.querySelector('img').alt = picture.description;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  pictureElement.dataset.id = picture.id;

  fragment.append(pictureElement);
};

const renderPhotos = (pictures) => {

  const pictureContainer = document.querySelector('.pictures');
  pictures.forEach((picture) => {
    renderPhoto(picture);
  });

  pictureContainer.append(fragment);
};

export {renderPhotos};
