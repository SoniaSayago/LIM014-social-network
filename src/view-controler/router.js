import { components } from '../view/index.js';

export const changeTmp = (hash) => {
const id = hash.split('/')[1];
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';
  switch (hash) {
    case '#/':
    { return sectionMain.appendChild(components.home()); }
    case '#/login':
    case '#/recover':
    case '#/comunidad':
    case '#/register':
    case '#/perfil':
        { return sectionMain.appendChild(components[id]()); }
    default:
      return sectionMain.appendChild(components.different());
  }
};