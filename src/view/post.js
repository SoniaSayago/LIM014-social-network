import { user } from '../controller/controller-auth.js';
import { getDataUser } from '../controller/controller-firestore.js';

export const itemPost = (objPost) => {
  const userObject = user.uid;
  const userId = user();
  const postElement = document.createElement('div');
  postElement.innerHTML = `
  <div class= 'mainpost allpost'>
  <div class='user-post'>
    <div class="${(userObject !== objPost.userId) ? 'hide' : 'show menu'}">
    <i class="fas fa-ellipsis-v" "btn-menu-post"><i>
    <ul id= "menu-post-content" class="menu-post-content">
    <li id="edit-post-${objPost.id}" class="edit-post"><i class="fas fa-edit select"></i>Editar><li>
    <li id="delete-post-${objPost.id}" class="delete-post"><i class="fas fa-trash-alt select"></i>Borrar><li>
    </ul>
  </div>
  <img class='avatar-post' src=''/>
  <p class='userName'></p>
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
      <time class="time-post">${objPost.date}</time>
  </div>
  <img id="post-img" class="post-img" src='${objPost.urlimg}'/>
  <div class="like-comment-container">
     <p class="count-like" 
    <span class = "tooltiptext"><i class="far fa-heart"></i> ${objPost.likes.length} </span>
    </p>
    <p id = "count-comment" class="count-comment"></p>   
    <hr>
    <button type="button" id="btn-like" class="btn-like-plane ${(objPost.likes.indexOf(userId) === -1) ? 'inactive-reaction' : 'active-reaction'}"><i class="far fa-heart"></i>Me gusta</button>
    <button type="button" id="btn-comment" class="btn-comment"><i class="fa fa-comment"></i>Comentar</button>
  </div>

  </div>
  `;
  document.getElementById('header').classList.remove('hide');

  getDataUser(objPost.userId)
    .then((doc) => {
      const avatarPost = postElement.querySelector('.avatar-post');
      const namePost = postElement.querySelector('.userName');
      avatarPost.src = doc.data().photo;
      namePost.textContent = doc.data().username;
    });

  return postElement;
};
