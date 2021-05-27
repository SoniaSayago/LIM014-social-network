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
      Photo = '../img/default-avatar.png';
      Name = 'User';
  }
  return db.collection('users').doc(user.uid).set({
      username: Name,
      email: user.email,
      photo: Photo,
      photoCover: '../img/default-cover.jpg',
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
  return db.collection('posts').add({
      userId: UserId,
      date: new Date().toLocaleString('en-ES'),
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
  db.collection('posts').orderBy('date', 'desc')
      .onSnapshot((querySnapshot) => {
          const posts = [];
          querySnapshot.forEach((doc) => {
              posts.push({ id: doc.id, ...doc.data() });
          });
          callback(posts);
      });
};

// ------ BASE DE DATOS CLOUD DE COMENTARIO---------

const addComment = (UserId, idPost, Comment) => {
  const db = firebase.firestore();
  return db.collection('posts').doc(idPost).collection('comment').add({
      userId: UserId,
      date: new Date().toLocaleString('en-ES'),
      comment: Comment,
  });
};

// -------------------------- GET ALL BD COMMENT ------------------
const getComment = (idPost, callback) => {
  const db = firebase.firestore();
  db.collection(`posts/${idPost}/comment`).orderBy('date', 'desc')
      .onSnapshot((querySnapshot) => {
          const comment = [];
          querySnapshot.forEach((doc) => {
              comment.push({ id: doc.id, ...doc.data() });
          });
          callback(comment);
      });
};

// ------------- -- actualizar posts ---------
const updatePost = (idPost, updatePublication) => {
  const db = firebase.firestore();
  return db.collection('posts').doc(idPost).update({
      publication: updatePublication,
  });
};

// ---------------actualizar  privacidad----------------------
const updatePrivacy = (id, privacy) => {
  const db = firebase.firestore();
  return db.collection('posts').doc(id).update({ privacy });
};
// ---------------- actualizar likes -------------------------
const updateLikes = (id, likes) => {
  const db = firebase.firestore();
  return db.collection('posts').doc(id).update({ likes });
};

// --------------- actualizar foto de perfil -------------------------
const updatePhotoProfile = (userId, photo) => {
  const db = firebase.firestore();
  return db.collection('users').doc(userId).update({ photo });
};

// ------------------- actualizar foto de portada -----------------
const updatePhotoCover = (userId, photoCover) => {
  const db = firebase.firestore();
  return db.collection('users').doc(userId).update({ photoCover });
};

// ----------------- actualizar comentarios ----------------------
const updateComment = (idPost, idComment, comment) => {
  const db = firebase.firestore();
  return db.collection(`posts/${idPost}/comment`).doc(idComment).update({ comment });
};

// ---------------------------------UPDATE PHOTO PROFILE------------------------------------
export const updatephotoProfile = (userId, photo) => {
  const db = firebase.firestore();
  return db.collection('users').doc(userId).update({ photo });
};
// ----------------------------------UPDATE PHOTO COVER ------------------------------------
export const updatephotoCover = (userId, photoCover) => {
  const db = firebase.firestore();
  return db.collection('users').doc(userId).update({ photoCover });
};

// --------------------- ELIMINAR POST -----------------
const deletePost = (idPost) => {
  const db = firebase.firestore();
  return db.collection('posts').doc(idPost).delete();
};

// --------------------- ELIMINAR COMMENT ----------------
const deleteComment = (idPost, idComment) => {
  const db = firebase.firestore();
  return db.collection(`posts/${idPost}/comment`).doc(idComment).delete();
};

export {
  deleteComment,
  addComment,
  updatePhotoProfile,
  updatePhotoCover,
  updateComment,
  getComment,
  deletePost,
  updatePost,
  getDataUser,
  sendDataCurrentUser,
  getPosts,
  addPost,
  updateCurrentUser,
  updatePrivacy,
  updateLikes,
};
