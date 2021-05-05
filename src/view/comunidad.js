import { signout } from '../controller/controller-auth.js'

export default () => {
    const viewComunidad = `
    <h1> Comunidadkk </h1>
    <div class= "bigContainer">
    <div class="leftContainer"><svg width="121" height="124" viewBox="0 0 121 124" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect width="121" height="124" fill="url(#pattern0)"/>
    <defs>
    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlink:href="#image0" transform="translate(-0.0123967) scale(0.00142332)"/>
    </pattern>
    
    </defs>
    </svg>
    
    <div> <p> Gustos e intereses</p></div>
    </div>
    <div class="middleContainer"></div>
    <div class="rightContainer"></div>
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
        // const fs = firebase.firestore();
        // const postList = document.querySelector('.post');
        // const setupPosts = data => {
        //     if (data.lenght) {
        //         let html = '';
        //         data.forEach(doc => {
        //             const post = doc.data()
        //             console.log(post)
        //             const li = ` <li class = "list-group-item" > 
        //             <h5>${post.title}<h5>
        //             <p>${post.description}</p>
        //             < /li>`;
        //             html += li;
        //         });
        //         postList.innerHTML = html;
        //     } else
        //         postList.innerHTML = '<p class="text-center">Login to see Posts</p>';

    // }
    // auth.onAuthStateChanged(user => {
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

    // return divElement;

}