// Este es el punto de entrada de tu aplicacion

import { changeTmp } from './view-controller/index.js';

const init = () => {
    changeTmp(window.location.hash);
    window.addEventListener('hashchange', () => changeTmp(window.location.hash));
};

window.addEventListener('load', init);