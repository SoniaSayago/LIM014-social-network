import { signout } from '../controller/controller-auth.js'

export default () => {
    const viewComunidad = `
    <h1> Comunidad </h1>
    <div class= "postsContainer">
    <ul><li> </li>
    </ul>
    </div>
    `
    const divElement = document.createElement('div')
    divElement.innerHTML = viewComunidad;
    document.getElementById('header').classList.remove('hide');

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
    const fs = firebase.firestore();
    const postList = document.querySelector('.post');
    const setupPosts = data => {
        if (data.lenght) {
            let html = '';
            data.forEach(doc => {
                const post = doc.data()
                console.log(post)
                const li = ` <li class = "list-group-item" > 
                <h5>${post.title}<h5>
                <p>${post.description}</p>
                < /li>`;
                html += li;
            });
            postList.innerHTML = html;
        } else
            postList.innerHTML = '<p class="text-center">Login to see Posts</p>';

    }
    auth.onAuthStateChanged(user => {
        if (user) {
            fs.collection('posts')
                .get()
                .then((snapshot) => {
                    setupPosts(snapshot.docs)
                })
        } else {
            setupPosts([])
        }
    })

    return divElement;

}