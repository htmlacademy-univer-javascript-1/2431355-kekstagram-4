import { renderPhotos } from './pictures.js';
import './big-picture.js';
import './validate-form.js';
import './effects.js';
import { openForm } from './form.js';
import { getData } from './api.js';
import { initializeFilters } from './filters.js';

let photos = [];

const onSuccess = (data) => {
  photos = data.slice();
  renderPhotos(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const onError = () =>{
  const errorMessage = document.createElement('div');
  errorMessage.style.position = 'absolute';
  errorMessage.style.left = 0;
  errorMessage.style.top = 0;
  errorMessage.style.right = 0;
  errorMessage.style.fontSize = '20px';
  errorMessage.style.backgroundColor = 'red';
  errorMessage.style.padding = '15px';
  errorMessage.style.textAlign = 'center';
  errorMessage.textContent = 'Ошибка при загрузке изображений';
  document.body.append(errorMessage);
};

getData(onSuccess, onError);
openForm();
initializeFilters();

export {photos};
