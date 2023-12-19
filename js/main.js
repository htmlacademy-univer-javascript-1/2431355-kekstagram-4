import { photos } from './data.js';
import { createPictures } from './pictures.js';
import './big-picture.js';
import { initForm } from './form.js';
import './validate-form.js';
import './effects.js';

createPictures(photos);
initForm();
