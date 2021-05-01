import { signout } from '../controller/controller-auth.js'

export default () => {
    const viewComunidad = `
    <h1> Comunidad </h1>
    `
    const divElement = document.createElement('div')
    divElement.innerHTML = viewComunidad;
    document.getElementById('header').classList.remove('hide');

    const logout = document.querySelector('#logout')
    logout.addEventListener('click', e => {
        e.preventDefault();
        signout().then( () => {
            console.log('sign out');
        })
        .then(() => {
            window.location.hash = '#/login';
            document.getElementById('header').classList.add('hide');
        })
        
    })

    return divElement;
}