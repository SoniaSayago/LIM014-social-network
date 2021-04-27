import { components } from '../view/index.js';

export const changeTmp = (hash) => {
    // console.log(hash)
    const id = hash.split('/')[1];
    const sectionMain = document.getElementById('container');
    sectionMain.innerHTML = '';

    switch (hash) {
        case '':
        case '#':
        case '#/':
            { return sectionMain.appendChild(components.home()); }
        case '#/login':
        case '#/register':
        case '#/perfil':
            { return sectionMain.appendChild(components[id]()); }
        default:
            return sectionMain.appendChild(components.different())
    }
};