// Este es el punto de entrada de tu aplicacion
import { changeTmp } from './router.js';

// función que permite mostrar las vistas del usario
const init = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      changeTmp(window.location.hash);
    } else {
      window.location.hash = '#/login';
    }
  });
  window.addEventListener('hashchange', () => changeTmp(window.location.hash));
};

// función que muestra la vista al momento de recargar
window.addEventListener('load', init);
