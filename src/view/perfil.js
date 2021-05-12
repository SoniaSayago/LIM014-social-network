import { signout, user } from '../controller/controller-auth.js';

export default () => {
  // COD QUE PERMITE LAS VISTAS: VISTA DE REGISTRO
  const userObject = user();
  const viewPerfil = `
    <section class="profile-content">
    <div class="profile-information">
      <div class="cover-page">
        <img class="cover-photo" src="${userObject.photoCover}">
      </div>
      <label id="select-cover" for="select-cover-photo">
        <input type="file" id="select-cover-photo" class="hide" accept="image/jpeg, image/png, image/gif">
        <span class="edit-cover"><i class="fas fa-camera edit-photo-btn"><span class="tooltiptext">Selecciona cover photo</span></i></span>
      </label>
      <div class="profile-photo">
        <img class="photo" src="${userObject.photo}">
      </div>
      <label id="select-profile" for="select-photo-profile">
        <input type="file" id="select-photo-profile" class="hide" accept="image/jpeg, image/png, image/gif">
        <span class="edit-photo"><i class="fas fa-camera edit-photo-btn"><span class="tooltiptext">Selecciona foto de perfil</span></i></span>
      </label>
      <div class="user-information">
      <span class = "edit-info" id="btn-editProfile"><i class="fas fa-edit"><span class="tooltiptext">Editar información</span></i></span>
        <h2 class="user-name">${userObject.username}</h2>
        <h3>About me</h3>
        <div class="container-grid">
          <div><i class="fas fa-envelope"></i><span>${userObject.email}</span></div>
          <div><i class="fas fa-birthday-cake"></i><span>${userObject.birthday}</span></div>
          <div><i class="fas fa-mobile-alt"></i><span>${userObject.phone}</span></div>
          <div><i class="fas fa-map-marker-alt"></i><span>${userObject.country}</span></div>
          <div class="item6"><i class="far fa-id-badge"></i><span>${userObject.description}</span></div>
        </div>
      </div>
    </div>
  </section>

  <section class ="container-user-post">
  </section>

  <div class="modal-container">
    <section class="modal-settings">
      <header class="modalHeader">
        <button type="button" class="btn-modalClose"><i class="fa fa-close"></i></button>
        <h3 class="modalTitle">Editar perfil</h2>
        <hr>
      </header>
      <form class="editProfile">
        <div class="grupo">
          <label  for="usernameEdit">Nombres:</label>
          <input type="text" id="usernameEdit" value="${userObject.username}">
        </div>
        <div class="grupo">
          <label  for="emailEdit">Correo:</label>
          <input type="text" id="emailEdit" disabled value="${userObject.email}">
        </div>
        <div class="grupo">
          <label  for="phoneEdit">Celular:</label>
          <input type="text" id="phoneEdit" value="${userObject.phone}">
        </div>
        <div>
          <label  for="birthdayEdit">Fecha de nacimiento:</label>
          <input type="date" id="birthdayEdit" value="${userObject.birthday}">
        </div>
        <div class="grupo">
          <label  for="countryEdit">País:</label>
          <input type="text" id="countryEdit" value="${userObject.country}">
        </div>
        <div class="grupo">
          <label  for="descriptionEdit">Descripción:</label>
          <textarea id="descriptionEdit">${userObject.description}</textarea>
        </div>
        <button type="submit" class="btn-update">Actualizar</button>
      </form>
    </section>
  </div>`;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewPerfil;
  document.getElementById('header').classList.remove('hide');
};

// PRUEBA COMENTADA
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