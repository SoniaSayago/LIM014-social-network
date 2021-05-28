/* eslint-disable indent */
import { signout, user } from './services/aut.services.js';
import { addPost, getPosts } from './services/firestore.services.js';
import { itemPost } from './post.js';
import { sendImgToStorage } from './services/storage.services.js';

export default () => {
    const viewComunidad = document.createElement('div');
    const userId = user().uid;
    const userObject = user();
    const defaultValue = {
        phone: 'Phone',
        birthday: 'yyyy-MM-dd',
        country: 'Country',
        description: 'Description',
    };
    viewComunidad.classList.add('another-container-home');
    viewComunidad.innerHTML = `
  <!-- Left column -->
  <div class = 'container-home'>
  <aside class='profile-section'>
    <div class='profile'>
    <img class='avatar' src='${userObject.photoURL}'/>
    <h2 id='name'> ${userObject.displayName}</h2>
    <hr>
    <p id='phone'><i class='fas fa-mobile-alt'></i> ${userObject.phone || defaultValue.phone}</p>
    <p id='city'><i class='fas fa-map-marker-alt'></i> ${userObject.country || defaultValue.country}</p>
    <p id='birthday'><i class='fas fa-birthday-cake'></i> ${userObject.birthday || defaultValue.birthday}</p>
    <a href='#/perfil' id='viewall'>Ver todo</a>
    </div>
    <!-- Interests -->
    <div class = 'interest'>
    <div class="containerInterest">
        <ul id="interest-list-comunidad">
        </ul>
    </div>
</div>
  </aside>
  
  <!-- Middle column -->
  <main class='home-section'>
    <!-- Post -->
    <div class='create-post'>
    <div class='user'>
      <img class='avatar-post' src='${userObject.photoURL}'/>
      <p class='name'>${userObject.displayName}</p>
    </div>
    <div class='content-newpost'>
      <form id = 'form-post'>
      <textarea class='text-newpost' id='text-newpost' placeholder='¿Qué quieres compartir hoy?' spellcheck='false' required></textarea>
      <i id = 'remove-img' style='display: none' class='fas fa-times-circle'></i>
      <img id='post-img' class='post-img' src=''/>
      <div class='buttons-bar'>
        <label for='upload-img'>
        <input type='file' accept='image/jpeg, image/png, image/gif' id='upload-img' class='upload-img'>
        <i class='far fa-file-image'><span class='tooltiptext'>Carga una imagen</span></i>
        </label>
        <select class='fa' id='privacy-option'>
        <option class='fa' value='public' title = 'Public'>&#xf57d; </option>
        <option class='fa' value='private' title = 'Private'>&#xf023; </option>
        </select>
        <button type='submit' id='btn-post' class='btn-post' ><i class='far fa-paper-plane'></i> Publicar</button>
      </div>
      </form>
    </div>
    </div>
    <section id='container-allPost'></section>
  </main>

  <!-- right column -->
  <aside class='right-section'>
    <!-- Events -->
    <div class='events'>
    <p>Publicidad</p>
    <img class='img-aside' src='./img/aside-anuncios.gif' title = 'anuncios' alt='anuncio'>
     <p class='img-aside-text'></p>
    <a href='https://orientacion.universia.net.co/carreras_universitarias.html' target='_blank'><button>Info</button></a>
    </div>
    <!-- About us -->
    <div class='aboutUs'>
    <ul>
      <li><a href='https://soniasayago.github.io/LIM014-social-network/' target='_blank'>Nosotros</a></li>
      <li><a href='https://soniasayago.github.io/LIM014-social-network/' target='_blank'>Ayuda</a></li>
      <li><a href='https://soniasayago.github.io/LIM014-social-network/' target='_blank'>Políticas de Privacidad</a></li>
      
    </ul>
    <p class='logo-aside'><img src='./img/iziChoice.svg'></p>
    <p class = 'copyright'>Copyright © 2021 All Rights Reserved.</p>
    <table class = 'github'>
      <tr>
      <th><a href='https://github.com/SoniaSayago' target='_blank'><i class='fab fa-github'><span class='tooltiptext'>Sonia Sayago</span></i></a></th>
      <th><a href='https://github.com/julissah' target='_blank'><i class='fab fa-github'><span class='tooltiptext'>Julissa Huamán</span></i></a></th>
      <th><a href='https://github.com/MariaCristinaTC' target='_blank'><i class='fab fa-github'><span class='tooltiptext'>Maria Cristina Tarazona</span></i></a></th>
      </tr>
      <tr>
      <td>S. Sayago</td>
      <td>J. Huaman</td>
      <td>MC. Tarazona</td>
      </tr>
    </table>
    </div>
  </aside> 
  <section class='modal-progress hide'>
  <div class='progress'>
    <progress value='0' max='100' id='uploader'>0%</progress>
    <p id='messageProgress'>0%</p>
  </div>
  </section>

  <i class="scrollUp fas fa-angle-up"></i>
  `;
    const divElement = document.createElement('div');
    divElement.innerHTML = viewComunidad;
    document.getElementById('header').classList.remove('hide');

    const closeModalButton = document.getElementById('modal-close-button');
    const btnCancelarBorrarPost = document.getElementById('btnCancelarBorrarPost');

    // la X para cancelar en vorrar post
    closeModalButton.addEventListener('click', () => {
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
    });
    // cancelar post a borrar
    btnCancelarBorrarPost.addEventListener('click', () => {
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
    });

    // División de carga de imagenes
    const postImg = viewComunidad.querySelector('#post-img');
    const removeImg = viewComunidad.querySelector('#remove-img');
    const uploadImg = viewComunidad.querySelector('#upload-img');
    // ************* Cargar imagen posteada *********************
    uploadImg.addEventListener('change', (e) => {
        // Creamos el objeto de la clase FileReader
        const reader = new FileReader();
        // Leemos el archivo subido y se lo pasamos a nuestro fileReader
        reader.readAsDataURL(e.target.files[0]);
        // Le decimos que cuando este listo ejecute el código interno
        reader.onload = () => {
            postImg.src = reader.result;
        };
        // mostramos el botón de remover imagen
        removeImg.removeAttribute('style');
    });

    /* ------------- Remove image post --------------------------*/
    removeImg.addEventListener('click', () => {
        postImg.src = '';
        uploadImg.value = '';
        removeImg.style.display = 'none';
    });

    // ************************** Log out **********************************
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        signout()
            .then(() => {
                // console.log('sign out');
            })
            .then(() => {
                window.location.hash = '#/login';
                document.getElementById('header').classList.add('hide');
            });
    });
    // ************************** Create Post **********************************
    const formPost = viewComunidad.querySelector('#form-post');
    formPost.addEventListener('submit', (e) => {
        e.preventDefault();
        postImg.src = '';
        removeImg.style.display = 'none';
        const fileImg = e.target.closest('#form-post').querySelector('input').files[0];
        const messageProgress = viewComunidad.querySelector('#messageProgress');
        const uploader = viewComunidad.querySelector('#uploader');
        const textPost = viewComunidad.querySelector('.text-newpost');
        const privacy = viewComunidad.querySelector('#privacy-option').value;
        const modalProgress = viewComunidad.querySelector('.modal-progress');
        // ************************ Enviar Imagen de Post a BD **********************************
        if (fileImg) {
            const refPath = `imgPost/${userId}/${fileImg.name}`;
            const uploadTask = sendImgToStorage(refPath, fileImg);
            uploadTask.on('state_changed', (snapshot) => {
                // Handle progress
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                modalProgress.classList.add('showModal');
                messageProgress.textContent = 'Tu post esta cargando... 🚀';
                uploader.value = progress;
            }, () => {
                // Handle unsuccessful uploads
            }, () => {
                // Cuando la carga es completada
                uploadTask.snapshot.ref.getDownloadURL()
                    .then((downloadURL) => {
                        addPost(userId, privacy, textPost.value, downloadURL)
                            .then(() => {
                                modalProgress.classList.remove('showModal');
                                formPost.reset();
                            });
                    });
            });
        } else {
            addPost(userObject.uid, privacy, textPost.value, '').then(() => {
                modalProgress.classList.remove('showModal');
                formPost.reset();
            });
        }
    });
    // ************************** View Post **********************************
    const containerAllPost = viewComunidad.querySelector('#container-allPost');
    getPosts((post) => {
        containerAllPost.innerHTML = '';
        post.forEach((objPost) => {
            if (objPost.privacy === 'public' || (objPost.privacy === 'private' && objPost.userId === userId)) {
                containerAllPost.appendChild(itemPost(objPost));
            }
        });
    });
    /* ----------------- Efecto Scroll up--------------------------------*/
    window.onscroll = () => {
        const currentScroll = document.documentElement.scrollTop;
        // desplazamiento desde la parte superior de la pagina
        if (currentScroll > 302) { // desplazamiento mayor a 300px mostrar botón
            divElement.querySelector('.scrollUp');
        } else { // desaparecer boton en menos de 300px
            divElement.querySelector('.scrollUp');
        }
    };
    // evento que me permite ir a top con click
    viewComunidad.querySelector('.scrollUp').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    });
    // intereses
    const interestList = viewComunidad.querySelector('#interest-list-comunidad');
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
    return viewComunidad;
};
