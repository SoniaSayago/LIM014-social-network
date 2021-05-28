import { components } from './view/index.js';

export const changeTmp = (hash) => {
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';

  switch (hash) {
    case '#/login':
      return sectionMain.appendChild(components.login());
    case '#/recover':
      return sectionMain.appendChild(components.recover());
    case '#/comunidad':
      return sectionMain.appendChild(components.comunidad());
    case '#/register':
      return sectionMain.appendChild(components.register());
    case '#/perfil':
      return sectionMain.appendChild(components.perfil());
    default:
      return sectionMain.appendChild(components.different());
  }
};
