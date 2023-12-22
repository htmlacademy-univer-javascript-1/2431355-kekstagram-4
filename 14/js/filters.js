import { debounce, shuffleArray } from './util.js';
import { photos } from './main.js';
import { renderPhotos, removePhotos } from './pictures.js';

const RANDOM_PICTURES_COUNT = 10;

const filtersForm = document.querySelector('.img-filters__form');
let activeBtn = document.querySelector('.img-filters__button--active');

const filters = {
  'filter-default': () => photos.slice(),
  'filter-random': () => shuffleArray(photos.slice()).slice(0, RANDOM_PICTURES_COUNT),
  'filter-discussed': () => photos.slice().sort((first, second) => second.comments.length - first.comments.length ),
};

const applyFilters = (id) =>{
  removePhotos();
  renderPhotos(filters[id]());
};

const toogleButtons = (evt) => {
  activeBtn.classList.remove('img-filters__button--active');
  activeBtn = evt.target;
  activeBtn.classList.add('img-filters__button--active');
};

const onFilterFormClick = debounce((evt) => {
  evt.preventDefault();
  if(evt.target.type === 'button'){
    applyFilters(evt.target.id);
    toogleButtons(evt);
  }
});

const initializeFilters = () => {
  filtersForm.addEventListener('click', onFilterFormClick);
};

export {initializeFilters};
