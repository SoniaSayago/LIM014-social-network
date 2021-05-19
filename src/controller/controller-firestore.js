/* eslint-disable indent */
// import { user } from "./controller-auth";

// ------------------------SEND USER INFORMATION TO CLUD FIRESTORE --------------------------
const sendDataCurrentUser = (user) => {
    const db = firebase.firestore();
    let Photo;
    let Name;
    if (user.photoURL != null && user.displayName != null) {
        Photo = user.photoURL;
        Name = user.displayName;
    } else {
        Photo = 'img/default-avatar.png';
        Name = 'User';
    }
    return db.collection('users').doc(user.uid).set({
        username: Name,
        email: user.email,
        photo: Photo,
        photoCover: 'img/default-cover.jpg',
        universidad: 'Universidad',
        phone: 'Phone',
        birthday: 'yyyy-MM-dd',
        country: 'Country',
        description: 'Description',
    });
};

// ------------------------GET USER INFORMATION TO CLUD FIRESTORE --------------------------
const getDataUser = (userId) => {
    const db = firebase.firestore();
    // .then(res => {
    //   console.log(res);
    // });
    return db.collection('users').doc(userId).get();
};

// ----------------------AQUI COMANDOS DE FIREBASE CLOUD-------------------
// Firebase configuration inicial
const firebaseConfig = {
    apiKey: 'AIzaSyAZMA3X4IF0Nr4ihwheiEDVhaKPDYzjbrU',
    authDomain: 'socialnetwork-c9540.firebaseapp.com',
    projectId: 'socialnetwork-c9540',
    storageBucket: 'socialnetwork-c9540.appspot.com',
    messagingSenderId: '168948973432',
    appId: '1:168948973432:web:a5e14449e8e799a58ad28d',
    measurementId: 'G-M384C4R7W4',
};
// Inicializar el aplicativo
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// ------------------------UPDATE USER INFORMATION TO CLUD FIRESTORE -----------------------
const updateCurrentUser = (
    userId,
    Username,
    Phone,
    Birthday,
    Country,
    Description,
) => {
    const db = firebase.firestore();
    return db.collection('users').doc(userId).update({
        username: Username,
        phone: Phone,
        birthday: Birthday,
        country: Country,
        description: Description,
    });
};
// ----------------------------------- CREATE BD POST --------------------------------------
const addPost = (UserId, Privacy, Publication, URLimg) => {
    const db = firebase.firestore();
    return db.collection('Post').add({
        userId: UserId,
        date: new Date().toLocaleString('es-ES'),
        privacy: Privacy,
        publication: Publication,
        urlimg: URLimg,
        likes: [],
        planes: [],
    });
};
// ------------------------------------- GET ALL BD POST -----------------------------------

const getPosts = (callback) => {
    const db = firebase.firestore();
    db.collection('Post')
        .orderBy('date', 'desc')
        .onSnapshot((querySnapshot) => {
            const post = [];
            querySnapshot.forEach((doc) => {
                post.push({ id: doc.id, ...doc.data() });
            });
            callback(post);
        });
};

//  editar Post ---
const updatePost = (idPost, updatePublication) => {
    const db = firebase.firestore();
    return db.collection('Post').doc(idPost).update({
        publication: updatePublication,
    });
};

// eliminar Post
const deletePost = (idPost) => {
    const db = firebase.firestore();
    return db.collection('Post').doc(idPost).delete();
};
// update privacidad
const updatePrivacy = (idPost, privacy) => {
    const db = firebase.firestore();
    return db.collection('Post').doc(idPost).update({ privacy });
};
// // actualizar likes
// const updateLikes = (idPost, likes) => {
//     // console.log(id);
//     const db = firebase.firestore();
//     return db.collection('Post').doc(idPost).update({ likes });
//     console.log(userId);
// };

export {
    deletePost,
    updatePost,
    getDataUser,
    sendDataCurrentUser,
    getPosts,
    addPost,
    updateCurrentUser,
    updatePrivacy,
    // updateLikes,
};