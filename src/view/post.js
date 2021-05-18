/* eslint-disable indent */
import { user } from '../controller/controller-auth.js';
import {
    getDataUser,
    deletePost,
    updatePost,
    updatePrivacy,
    updateLikes,
} from '../controller/controller-firestore.js';

export const itemPost = (objPost) => {
    const userObject = user.uid;
    const userId = user();
    const reactionCounter = objPost.likes.length;
    const postElement = document.createElement('div');
    postElement.innerHTML = `
  <div class= 'mainpost'>
    <div class='user-post'>
        <div class="${userObject !== objPost.userId ? 'hide' : 'show menu-post'}">
        <i class="fas fa-ellipsis-v btn-menu-post"><i>
        <ul id="menu-post-content" class="menu-post-content">
          <li id="edit-post" class="edit-post"><i class="fas fa-edit select"></i>Editar><li>
          <li id="delete-post-${objPost.id}" class="delete-post"><i class="fas fa-trash-alt select"></i>Borrar><li>
        </ul>
        </div>
      <img class='avatar-post' src=''/>
      <p class='userName'>
        <span class = "username"></span>
        <span class = "tooltiptext">
          <img class="tooltipimg" src=""/>
          <strong class="nametooltip"></strong> <br>
          <i class="fas fa-birthday-cake"></i> &nbsp <span id="birthdayTooltip"></span><br>
          <i class="fas fa-map-marker-alt"></i> &nbsp <span id="countryTooltip"></span>
        </span>
      </p>
      
      <select id="privacy-option" class='${
  userObject === objPost.userId ? 'show fa' : 'hide'
}' id='privacy-option'>
        <option class='fa' value='public' ${
  objPost.privacy === 'public' ? 'selected' : ''
} title = 'Public'>&#xf57d; </option>
        <option class='fa' value='private' ${
  objPost.privacy === 'private' ? 'selected' : ''
} title = 'Private'>&#xf023; </option>
      </select>
      <time class="time-post">${objPost.date}</time>
    </div>
    <div class="content-post">
      <p class="text-post">${objPost.publication}</p>
      <div class = "hide edit-text-post">
        <textarea class="edit-text">${objPost.publication}</textarea>
        <div class = "edit-text-btns">
          <button type="button" class="btn-save-edit-${objPost.id}">Save</button>
          <button type="button" class="btn-cancel-edit">Cancel</button>
      </div>
    </div>
    <img id="post-img" class="post-img" src='${objPost.urlimg}'/>
    <div class="like-comment-container">
      <p class=""${
  reactionCounter === 0 ? 'hide' : 'count-like'
}" > ${reactionCounter} reactions" 
        <span class = "tooltiptext"><i class="far fa-heart"></i> ${objPost.likes.length} </span>
      </p>
      <p id = "count-comment" class="count-comment"></p>   
      <hr>
    <button type="button" id="btn-like" class="btn-like-plane ${objPost.likes.indexOf(userId) === -1 ? 'inactive-reaction' : 'active-reaction'}"><i class="far fa-heart"></i>Me gusta</button>
    <button type="button" id="btn-comment" class="btn-comment"><i class="fa fa-comment"></i>Comentar</button>
    </div>
    <section id ="container-comment" class="hide">
      <form class="div-comment formComment">
        <textarea class="comment" placeholder="Add a comment" required></textarea>
        <button type="submit" class="fas fa-paper-plane"></button>
      </form>
      <div id = "container-AllComment"></div>
    </section>
  </div>
</div>
  `;
    document.getElementById('header').classList.remove('hide');

    getDataUser(objPost.userId).then((doc) => {
        const avatarPost = postElement.querySelector('.avatar-post');
        const namePost = postElement.querySelector('.userName');
        const nametooltip = postElement.querySelector('.nametooltip');
        const tooltipimg = postElement.querySelector('.tooltipimg');
        const birthdayTooltip = postElement.querySelector('#birthdayTooltip');
        const countryTooltip = postElement.querySelector('#countryTooltip');
        avatarPost.src = doc.data().photo;
        namePost.textContent = doc.data().username;
        nametooltip.textContent = doc.data().username.toUpperCase();
        tooltipimg.src = doc.data().photo;
        birthdayTooltip.textContent = doc.data().birthday;
        countryTooltip.textContent = doc.data().country;
    });

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
    const editPost = postElement.querySelector('.edit-post');
    const editPublication = postElement.querySelector('#edit-text');
    const btnSaveEdit = postElement.querySelector(`.btn-save-edit-${objPost.id}`);
    const btnCancelEdit = postElement.querySelector('.btn-cancel-edit');
    // editar menu de post element
    editPost.addEventListener('click', () => {
        postElement.querySelector('.edit-text-post').classList.remove('hide');
        postElement.querySelector('.text-post').classList.add('hide');
    });
    // cancelar editar post
    btnCancelEdit.addEventListener('click', () => {
        postElement.querySelector('.edit-text-post').classList.remove('hide');
        postElement.querySelector('.text-post').classList.add('hide');
        editPublication.value = objPost.publication;
    });

    // update post element
    btnSaveEdit.addEventListener('click', () => {
        updatePost(objPost.id, editPublication.value);
    });

    // eliminar post element
    postElement
        .querySelector(`#delete-post-${objPost.id}`)
        .addEventListener('click', () => {
            deletePost(objPost.id);
        });

    // actualizar estatus de Privacidad
    const privacyStatus = postElement.querySelector('#privacy-option');
    privacyStatus.addEventListener('change', () => {
        updatePrivacy(objPost.id, privacyStatus.value);
    });

    // actualizar likes
    const likes = postElement.querySelector('#btn-like');
    likes.addEventListener('click', () => {
        const result = objPost.likes.indexOf(userId);
        if (result === -1) {
            objPost.likes.push(userId);
            updateLikes(objPost.id, objPost.likes);
        }
    });

    return postElement;
};