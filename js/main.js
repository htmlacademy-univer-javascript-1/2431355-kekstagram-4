import { createPictures } from './pictures.js';
import './big-picture.js';
import './validate-form.js';
import './effects.js';
import { openForm } from './form.js';
import { loadData } from './api.js';

let pictures = [];

const onSuccess = (data) => {
  pictures = data.slice();
  createPictures(pictures);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

};

const onFail = () =>{
  const errorMessage = document.createElement('div');
  errorMessage.style.position = 'absolute';
  errorMessage.style.left = 0;
  errorMessage.style.top = 0;
  errorMessage.style.right = 0;

  errorMessage.style.fontSize = '20px';
  errorMessage.style.backgroundColor = '#e1375f';
  errorMessage.style.padding = '15px';

  errorMessage.style.textAlign = 'center';
  errorMessage.textContent = 'Ошибка при загрузке изображений';
  document.body.append(errorMessage);

};


loadData(onSuccess, onFail);
openForm();

// import { initForm } from './form.js';
// import { photos } from './data.js';
// createPictures(photos);
// initForm();
