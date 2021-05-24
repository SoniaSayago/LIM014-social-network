// Este es el punto de entrada de tu aplicacion
import { changeTmp } from './view-controler/router.js';

// función que permite mostrar las vistas del usario
const init = () => {
  window.location.hash = '#/login';
  changeTmp(window.location.hash);
  window.addEventListener('hashchange', () => changeTmp(window.location.hash));
};

// función que muestra la vista al momento de recargar
window.addEventListener('load', init);

// export const checkSesionActive = changeTmp => firebase.auth().onAuthStateChanged((user) => {
//     let route = '';
//     if (window.location.hash === '#/Login') route = '#/Login';
//     if (user) {
//       route = window.location.hash;
//     }
//     return ChangeView(route);
// }
