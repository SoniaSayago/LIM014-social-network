import { user } from '../controller/controller-auth.js';

export const itemPost = (objPost) => {
    console.log('postttttt');
    const userObject = user.uid;
    const userId = user();
    const postElement = document.createElement('div');
    postElement.innerHTML = `
  <div class= 'mainpost'>
    <div class='user-post'>
      <div class="${(userObject !== objPost.userId) ? 'hide' : 'show menu'}">
      <i class="fas fa-ellipsis-v" "btn-menu-post"><i>
      <ul id= "menu-post-content" class="menu-post-content">
        <li id="edit-post" class="edit-post"><i class="fas fa-edit select"></i>Editar><li>
        <li id="delete-post" class="delete-post"><i class="fas fa-trash-alt select"></i>Borrar><li>
      </ul>
    </div>
    <img class='avatar-post' src='${userId.photoURL}'/>
    <p class='name'>${userId.displayName}</p>
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
    </div>
  </div>
  `;
    document.getElementById('header').classList.remove('hide');
    return postElement;
}