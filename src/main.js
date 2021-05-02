// Este es el punto de entrada de tu aplicacion
import { changeTmp } from './view-controler/router.js';
// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");





const init = () => {
    window.location.hash = '#/login';
    changeTmp(window.location.hash);
    window.addEventListener('hashchange', () => changeTmp(window.location.hash));

};

window.addEventListener('load', init);