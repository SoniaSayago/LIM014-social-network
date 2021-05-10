import { signout, user } from '../controller/controller-auth.js';

export default () => {
  const userObject = user();
  const viewComunidad = `
    <div class= 'bigContainer'>
        <div class='bigContainer_userInfo'> 
            <img class=userPhoto src='${userObject.photoURL}'> &nbsp; &nbsp;&nbsp; &nbsp;
            <div><p class='boldName'> ${userObject.displayName} </p> </div> <br><br>
        </div>
        <div class='bigContainer_postsInfo' >

            <section class='post'>
                <textarea id='postText' class='bigContainer_postsInfo_textArea'id='user_post' placeholder='Que quieres publicar hoy?' name='comment' cols='40' rows='4'></textarea>
                <div class='btn-group'>
                    <button id='postButton'class='smallButton' type='button'><img src='./icons/send.svg' class='send'> &nbsp;Publicar</button>
                </div>
            </section>

        </div>
    </div>
 
    `;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewComunidad;
  document.getElementById('header').classList.remove('hide');

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
  const postButton = divElement.querySelector('#postButton');
  const postText = divElement.querySelector('#postText').value;
  postButton.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(postText);
  });

  const fs = firebase.firestore();
  const postList = document.querySelector('.post');
  const setupPosts = (data) => {
    if (data.lenght) {
      let html = '';
      data.forEach((doc) => {
        const post = doc.data();
        // console.log(post);
        const li = ` <li class = 'list-group-item' > 
                    <h5>${post.title}<h5>
                    <p>${post.description}</p>
                    < /li>`;
        html += li;
      });
      postList.innerHTML = html;
    } else postList.innerHTML = '<p class="text-center">Login to see Posts</p>';
  };
  // auth.onAuthStateChanged(user => { // escuche si mi usuario sigue activo;
  //     if (user) {
  //         fs.collection('posts')
  //             .get()
  //             .then((snapshot) => {
  //                 setupPosts(snapshot.docs)
  //             })
  //     } else {
  //         setupPosts([])
  //     }
  // })

  return divElement;
};
