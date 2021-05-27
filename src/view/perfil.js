/* eslint-disable indent */
import { signout, user, updateCurrentUserPhoto } from './services/aut.services.js';
import {
  updateCurrentUser, updatePhotoCover, getPosts, updatePhotoProfile,
} from './services/firestore.services.js';
import { sendImgToStorage } from './services/storage.services.js';
import { itemPost } from './post.js';

export default () => {
    // COD QUE PERMITE LAS VISTAS: VISTA DE REGISTRO
    const viewPerfil = document.createElement('div');
    const userId = user().uid;
    const userObject = user();
    const defaultValue = {
        carrera: 'Universidad',
        phone: 'Celular',
        birthday: 'yyyy-MM-dd',
        country: 'País',
        description: 'Descripción',
        photoCover: '../img/default-cover.gif',
    };
    viewPerfil.classList.add('profile-container');
    viewPerfil.innerHTML = `
    <section class="profile-content">
    <div class="profile-information">
      <div class="cover-page">
        <img class="cover-photo" src="${userObject.photoCover || defaultValue.photoCover}">
      </div>
      <label id="select-cover" for="select-cover-photo">
        <input type="file" id="select-cover-photo" class="hide" accept="image/jpeg, image/png, image/gif">
        <span class="edit-cover"><i class="fas fa-camera edit-photo-btn"><span class="tooltiptext">Selecciona foto de portada</span></i></span>
      </label>
      <div class="profile-photo">
        <img class="photo" src="${userObject.photoURL}">
      </div>
      <label id="select-profile" for="select-photo-profile">
        <input type="file" id="select-photo-profile" class="hide" accept="image/jpeg, image/png, image/gif">
        <span class="edit-photo"><i class="fas fa-camera edit-photo-btn"><span class="tooltiptext">Selecciona foto de perfil</span></i></span>
      </label>
      <div class="user-information">
      <span class = "edit-info" id="btn-editProfile"><i class="fas fa-edit"><span class="tooltiptext">Editar información</span></i></span>
        <h2 class="user-name">${userObject.displayName}</h2>
        <h3>Acerca de mi</h3>
        <div class="container-grid">
        
          <div class="container-grid-item"><i class="fas fa-graduation-cap"></i></i><span>${userObject.carrera || defaultValue.carrera}</span></div>
          <div class="container-grid-item"><i class="fas fa-envelope"></i><span>${userObject.email || defaultValue.email}</span></div>
          <div class="container-grid-item"><i class="fas fa-birthday-cake"></i><span>${userObject.birthday || defaultValue.birthday}</span></div>
         
          
          <div class="container-grid-item"><i class="fas fa-mobile-alt"></i><span>${userObject.phone || defaultValue.phone}</span></div>
          <div class="container-grid-item"><i class="fas fa-map-marker-alt"></i><span>${userObject.country || defaultValue.country}</span></div>
          <div class="container-grid-item"><i class="far fa-id-badge"></i><span>${defaultValue.description}</span></div>
         
        </div>
        <div class="containerInterest">
      <form class="formInterest" id="formInterest">
        <input class="inputForm" type= "interest" name="interest" placeholder="Intereses">
        <button class="buttonAddForm" type="submit">Añadir</button>
      </form>
      <ul id="interest-list">
      </ul>
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
          <input type="text" id="usernameEdit" value="${userObject.displayName}">
        </div>
        <div class="grupo">
          <label  for="emailEdit">Correo:</label>
          <input type="text" id="emailEdit" disabled value="${userObject.email}">
        </div>
        <div class="grupo">
          <label  for="phoneEdit">Celular:</label>
          <input type="text" id="phoneEdit" value="${userObject.phone || defaultValue.phone}">
        </div>
        <div>
          <label  for="birthdayEdit">Fecha de nacimiento:</label>
          <input type="date" id="birthdayEdit" value="${userObject.birthday || defaultValue.birthday}">
        </div>
        <div class="grupo">
          <label  for="countryEdit">País:</label>
          <input type="text" id="countryEdit" value="${userObject.country || defaultValue.country}">
        </div>
        <div class="grupo">
          <label  for="descriptionEdit">Descripción:</label>
          <textarea id="descriptionEdit">${userObject.description || defaultValue.description}</textarea>
        </div>
        <button type="submit" class="btn-update">Actualizar</button>
      </form>
    </section>
  </div>

  <div class="modal-progress" id="modal-progress">
    <div class="progress">
      <progress value="0" max="100" id="uploader">0%</progress>
      <p id="messageProgress">0%</p>
    </div>
  </div>`;
    document.getElementById('header').classList.remove('hide');
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        signout()
            .then(() => {
                window.location.hash = '#/login';
                document.getElementById('header').classList.add('hide');
            });
    });

    // Changing cover photo
    const selectCoverPhoto = viewPerfil.querySelector('#select-cover-photo');
    selectCoverPhoto.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const refPath = `imgCover/${userId}/${file.name}`;
        const uploadTask = sendImgToStorage(refPath, file);
        const messageProgress = viewPerfil.querySelector('#messageProgress');
        const modalProgress = viewPerfil.querySelector('.modal-progress');
        const uploader = viewPerfil.querySelector('#uploader');
        uploadTask.on('state_changed', (snapshot) => {
            // Handle progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            modalProgress.classList.add('showModal');
            messageProgress.textContent = '¡Excelente opción 😊! Estamos cargando tu foto de portada... 😍';
            uploader.value = progress;
        }, () => {
            // Handle unsuccessful uploads
        }, () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => updatePhotoCover(userId, downloadURL))
                .then(() => window.location.reload());
        });
    });

    // Changing photo profile
    const selectPhotoProfile = viewPerfil.querySelector('#select-photo-profile');
    selectPhotoProfile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const refPath = `imgProfile/${userId}/${file.name}`;
        const uploadTask = sendImgToStorage(refPath, file);
        const messageProgress = viewPerfil.querySelector('#messageProgress');
        const modalProgress = viewPerfil.querySelector('.modal-progress');
        const uploader = viewPerfil.querySelector('#uploader');
        uploadTask.on('state_changed', (snapshot) => {
            // Handle progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            modalProgress.classList.add('showModal');
            messageProgress.textContent = '¡Te ves muy bien 😊! Estamos cargando tu foto de perfil... 😍';
            uploader.value = progress;
        }, () => {
            // Handle unsuccessful uploads
        }, () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                    updatePhotoProfile(userId, downloadURL)
                        .then(() => {
                            modalProgress.classList.remove('showModal');
                            return updateCurrentUserPhoto(downloadURL);
                        }).then(() => {
                            window.location.reload();
                        });
                });
        });
    });

    // Open modal edit user profile
    const formEditProfile = viewPerfil.querySelector('.editProfile');
    const modalContainer = viewPerfil.querySelector('.modal-container');
    const btnEditProfile = viewPerfil.querySelector('#btn-editProfile');
    btnEditProfile.addEventListener('click' || 'touch', () => {
        modalContainer.classList.add('showModal');
    });

    // Close modal edit user profile

    const btnModalClose = viewPerfil.querySelector('.btn-modalClose');
    btnModalClose.addEventListener('click' || 'touch', (e) => {
        e.preventDefault();
        modalContainer.classList.remove('showModal');
        formEditProfile.reset();
    });

    // Close modal click outside
    window.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modalContainer.classList.remove('showModal');
            formEditProfile.reset();
        }
    });

    // Submit modal edit user profile
    formEditProfile.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameEdit = viewPerfil.querySelector('#usernameEdit').value;
        const phoneEdit = viewPerfil.querySelector('#phoneEdit').value;
        const birthday = viewPerfil.querySelector('#birthdayEdit').value;
        const countryEdit = viewPerfil.querySelector('#countryEdit').value;
        const descriptionEdit = viewPerfil.querySelector('#descriptionEdit').value;
        updateCurrentUser(userId, usernameEdit, phoneEdit, birthday, countryEdit, descriptionEdit)
            .then(() => {
                window.location.reload();
            });
    });

    // Add post to container post
    const containerUserPost = viewPerfil.querySelector('.container-user-post');
    getPosts((post) => {
        containerUserPost.innerHTML = '';
        post.forEach((objPost) => {
            if (userId === objPost.userId) {
                containerUserPost.appendChild(itemPost(objPost));
            }
        });
    });
    // intereses
    const interestList = viewPerfil.querySelector('#interest-list');
    const form = viewPerfil.querySelector('#formInterest');
    // renderInterests interestList
    function renderInterestList(doc) {
        const li = document.createElement('li');
        const interest = document.createElement('span');
        const cross = document.createElement('div');
        li.setAttribute('data-id', doc.id);
        interest.textContent = doc.data().interest;
        cross.textContent = 'x';
        li.appendChild(interest);
        li.appendChild(cross);
        interestList.appendChild(li);

        // deleting interest data
        cross.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = e.target.parentElement.getAttribute('data-id');
            const db = firebase.firestore();
            db.collection('interests').doc(id).delete();
        });
    }

    // snapshot realtime for interestList
    const db = firebase.firestore();
    db.collection('interests').onSnapshot((snapshot) => {
        const changes = snapshot.docChanges();
        changes.forEach((change) => {
            if (change.type === 'added') {
                renderInterestList(change.doc);
            } else if (change.type === 'removed') {
                const li = interestList.querySelector(`[data-id=${change.doc.id}]`);
                interestList.removeChild(li);
            }
        });
    });

    // saving data
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        db.collection('interests').add({
            interest: form.interest.value,
        });
        form.interest.value = '';
    });

    return viewPerfil;
};
