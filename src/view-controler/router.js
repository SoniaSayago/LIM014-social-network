import { components } from '../view/index.js';

export const changeTmp = (hash) => {
    // const id = hash.split('/')[1];
    const sectionMain = document.getElementById('container');
    sectionMain.innerHTML = '';

    switch (hash) {
        case '#/':
            { return sectionMain.appendChild(components.home()); }
        case '#/Login': 
            { return sectionMain.appendChild(components.login()); }
        case '#/Comunidad': 
            { return sectionMain.appendChild(components.comunidad()); }
        case '#/Register': 
            { return sectionMain.appendChild(components.register()); }
        case '#/Perfil': 
            { return sectionMain.appendChild(components.perfil()); }
        //     { return sectionMain.appendChild(components[id]()); }
        default:
            return sectionMain.appendChild(components.different())
    }
};