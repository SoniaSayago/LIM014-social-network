/* eslint-disable indent */
import { user } from './services/aut.services.js';
import { itemComment } from './comment.js';
import {
    deletePost,
    updatePost,
    updatePrivacy,
    getComment,
    addComment,
    getDataUser,
    updateLikes,
} from './services/firestore.services.js';

export const itemPost = (objPost) => {
        const userObject = user().uid;
        let selectedPostId = null;
        const reactionLength = objPost.likes.length;
        const postElement = document.createElement('div');
        postElement.classList.add('allpost');
        postElement.innerHTML = `
    <div class= 'mainpost'>
      <div class='user-post'>
        <div class="${(userObject !== objPost.userId) ? 'hide' : 'show menu-post'}">
          <i class="fas fa-ellipsis-v btn-menu-post"></i>
          <ul id="menu-post-content" class="menu-post-content">
            <li id="edit-post" class="edit-post"><i class="fas fa-edit select"></i>Editar</li>
            <li id="delete-post-${objPost.id}" postId="${objPost.id}" class="delete-post"><i class="fas fa-trash-alt select"></i>Borrar</li>


          </ul>
        </div>
        <div class= "dataUserPost">
        <div class=" dataImgUsername">
          <img id='avatar-post' class='avatar-post' src=''/>
          <span class = "username"></span>
        </div>
        <p class='username hide'>
          <span class = "tooltiptext">
            <img class="tooltipimg" src=""/>
            <strong class="nametooltip"></strong> <br>
            <i class="fas fa-birthday-cake"></i> &nbsp <span id="birthdayTooltip"></span><br>
            <i class="fas fa-map-marker-alt"></i> &nbsp <span id="countryTooltip"></span>
          </span>
        </p>
        <select id="privacy-option" class='${(userObject === objPost.userId) ? 'show fa' : 'hide'}'>
          <option class='fa' value='public' ${(objPost.privacy === 'public') ? 'selected' : ''} title = 'Public'>&#xf57d; </option>
          <option class='fa' value='private' ${(objPost.privacy === 'private') ? 'selected' : ''} title = 'Private'>&#xf023; </option>
        </select>
        <time class="time-post">${objPost.date}</time>
        </div>
      </div>

    <div class="content-post">
      <p class="text-post">${objPost.publication}</p>
      <div class = "hide edit-text-post">
        <textarea class="edit-text">${objPost.publication}</textarea>
        <div class = "edit-text-btns">
          <button type="button" class="btn-save-edit-${objPost.id}">Guardar</button>
          <button type="button" class="btn-cancel-edit">Cancelar</button>
      </div>
    </div>
    <img id="post-img" class="post-img" src='${objPost.urlimg}'/>
    <div class="like-comment-container">
      <p class="resultLike ${(reactionLength === [] || reactionLength === 0) ? 'hide' : 'count-like'}" > ${reactionLength} reactions
        <span class = "tooltiptext"><i class="far fa-heart"></i> ${reactionLength}  </span>
      </p>
      <p id = "count-comment" class="${(reactionLength === 0) ? 'count-comment' : 'count-comment-right'}"></p>  
      <hr>

    </div>
    <div class="container-like-comment">
    <button type="button" id="btn-like" class="btn-like-plane }"><i class="far fa-heart"></i> Me gusta</button>
    <button type="button" id="btn-comment" class="btn-comment"><i class="fa fa-comment"></i>Comentar</button>
    </div>

    <section id ="container-comment" class="hide">
      <form class="div-comment formComment">
        <textarea class="comment" placeholder="¿Qué quieres comentar hoy?" required></textarea>
        <button type="submit" class="fas fa-paper-plane"></button>
      </form>
      <div id = "container-AllComment"></div>
    </section>
  </div>
</div>
  `;
        getDataUser(objPost.userId)
            .then((doc) => {
                const avatarPost = postElement.querySelector('#avatar-post');
                const username = postElement.querySelector('.username');
                const nametooltip = postElement.querySelector('.nametooltip');
                const tooltipimg = postElement.querySelector('.tooltipimg');
                const birthdayTooltip = postElement.querySelector('#birthdayTooltip');
                const countryTooltip = postElement.querySelector('#countryTooltip');
                avatarPost.src = doc.data().photo;
                username.textContent = doc.data().username;
                nametooltip.textContent = doc.data().username.toUpperCase();
                tooltipimg.src = doc.data().photo;
                birthdayTooltip.textContent = doc.data().birthday;
                countryTooltip.textContent = doc.data().country;
            });
        document.getElementById('header').classList.remove('hide');

        /* ---------------- Menu despegable --------------------------*/
        const btnMenu = postElement.querySelector('.btn-menu-post');
        btnMenu.addEventListener('click', () => {
            postElement.querySelector('#menu-post-content').classList.toggle('show');
        });
        // close menu click
        window.addEventListener('click', (e) => {
            if (e.target !== btnMenu) {
                postElement.querySelector('#menu-post-content').classList.remove('show');
            }
        });
        //  editar y eliminar menu-------------
        const editPost = postElement.querySelector('#edit-post');
        const editPublication = postElement.querySelector('.edit-text');
        const btnSaveEdit = postElement.querySelector(`.btn-save-edit-${objPost.id}`);
        const btnCancelEdit = postElement.querySelector('.btn-cancel-edit');
        // editar menu de post element
        editPost.addEventListener('click', () => {
            postElement.querySelector('.edit-text-post').classList.remove('hide');
            postElement.querySelector('.text-post').classList.add('hide');
        });
        // cancelar editar post
        btnCancelEdit.addEventListener('click', () => {
            postElement.querySelector('.edit-text-post').classList.add('hide');
            postElement.querySelector('.text-post').classList.remove('hide');
            editPublication.value = objPost.publication;
        });

        btnSaveEdit.addEventListener('click', () => {
            updatePost(objPost.id, editPublication.value);
        });

        // update post element
        btnSaveEdit.addEventListener('click', () => {
            updatePost(objPost.id, editPublication.value);
        });

        // eliminar post element
        postElement.querySelector(`#delete-post-${objPost.id}`)
            .addEventListener('click', () => {
                const modal = document.getElementById('myModal');
                // modal.classList.remove('hide');
                selectedPostId = objPost.id;
                postElement.querySelector('button-up');
                modal.style.display = 'flex';
            });
        document.querySelector('#btnBorrarPost')
            .addEventListener('click', () => {
                deletePost(selectedPostId);
            });

        // actualizar estatus de Privacidad
        const privacyStatus = postElement.querySelector('#privacy-option');
        privacyStatus.addEventListener('change', () => {
            updatePrivacy(objPost.id, privacyStatus.value);
        });

        // actualizar likes
        const likes = postElement.querySelector('#btn-like');
        likes.addEventListener('click', () => {
            const result = objPost.likes.indexOf(userObject);
            if (result === -1) {
                objPost.likes.push(userObject);
            } else {
                objPost.likes.splice(result, 1);
            }
            // validar que no se encuentre el user().uid
            // caso cuando no exita:
            // const testLike = objPost.likes.push(user().uid);
            // existe: eliminar elemento
            // console.log(testLike)
            updateLikes(objPost.id, objPost.likes);
            // comparar que el usuario no se repita(buscar que user(),id no este dentro del array)
            // eliminar elemento
            // splice para dislike
        });

        /* ------------Mostrar y ocultar comentario ------------------*/
        postElement.querySelector('#btn-comment').addEventListener('click', () => {
            postElement.querySelector('#btn-comment').classList.toggle('btn-comment-active');
            postElement.querySelector('#container-comment').classList.toggle('hide');
        });

        /* ---------------------- ADD POST (CLOUD FIRESTORE Post)------------------*/
        const formComment = postElement.querySelector('.formComment');
        formComment.addEventListener('submit', (e) => {
            const comment = postElement.querySelector('.comment').value;
            e.preventDefault();
            addComment(user().uid, objPost.id, comment)
                .then(() => {
                    formComment.reset();
                });
        });
        // ----------------------  (CONTENEDOR DE COMENTARIOS)------------------*/
        const containerAllComment = postElement.querySelector('#container-AllComment');
        const counterComment = postElement.querySelector('#count-comment');
        getComment(objPost.id, (comment) => {
                    containerAllComment.innerHTML = '';
                    comment.forEach((objComment) => {
                        containerAllComment.appendChild(itemComment(objComment, objPost.id));
                    });
                    counterComment.textContent = `${(comment.length !== 0) ? `${comment.length} comments` : ''}`;
      });
    return postElement;
};
