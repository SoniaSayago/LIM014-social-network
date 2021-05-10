import { signout, user } from '../controller/controller-auth.js'
export default () => {
    const viewPerfil = `
    `
    const divElement = document.createElement('div')
    divElement.innerHTML = viewPerfil;
    return divElement;

}


const logout = document.querySelector('#logout')
logout.addEventListener('click', e => {
    e.preventDefault();
    signout().then(() => {
            console.log('sign out');
        })
        .then(() => {
            window.location.hash = '#/login';
            document.getElementById('header').classList.add('hide');
        })

})