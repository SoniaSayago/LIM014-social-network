import { components } from '../view/index.js';
console.log('components: ', components.login());

export const changeTmp = (hash) => {
  console.log('hash: ', hash);
  const id = hash.split('/')[1];
  console.log('id: ', id);
  
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';

  switch (hash) {
    case '#/':
    { return sectionMain.appendChild(components.home()); }
    case '#/login':
      return sectionMain.appendChild(components.login());
    case '#/recover':
    case '#/comunidad':
    case '#/register':
    case '#/perfil':
      { return sectionMain.appendChild(components[id]()); }
    default:
      return sectionMain.appendChild(components.different());
  }
};