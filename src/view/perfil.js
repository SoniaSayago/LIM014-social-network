import { signout, user } from '../controller/controller-auth.js'

export default (dataCurrentUser) => {
    const userObject = user();
    const viewPerfil = `
    <section class="profile-content">
    <div class="profile-information">
      <div class="cover-page">
      </div>
      <label id="select-cover" for="select-cover-photo">
        <input type="file" id="select-cover-photo" class="hide" accept="image/jpeg, image/png, image/gif">
        <span class="edit-cover"><i class="fas fa-camera edit-photo-btn"><span class="tooltiptext">Selecciona cover photo</span></i></span>
      </label>
      <div class="profile-photo">
        <img class="photo" src="${userObject.photoURL}">
      </div>   
  </div>
  </section>`

    // COD QUE PERMITE LAS VISTAS: VISTA DE REGISTRO
    const divElement = document.createElement('div');
    const userId = user().uid;
    divElement.classList.add('profile-container');
    divElement.innerHTML = viewPerfil;
    document.getElementById('header').classList.remove('hide');
}




//PRUEBA COMENTADA
// const logout = document.querySelector('#logout')
// logout.addEventListener('click', e => {
//     e.preventDefault();
//     signout().then(() => {
//             console.log('sign out');
//         })
//         .then(() => {
//             window.location.hash = '#/login';
//             document.getElementById('header').classList.add('hide');
//         })

// })