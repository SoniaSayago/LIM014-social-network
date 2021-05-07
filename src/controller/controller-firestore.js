// ------------------------SEND USER INFORMATION TO CLUD FIRESTORE --------------------------
const sendDataCurrentUser = (user) => {
    const db = firebase.firestore();
    let Photo;
    let Name;
    if (user.photoURL != null && user.displayName != null) {
        Photo = user.photoURL;
        Name = user.displayName;
    } else {
        Photo = '../src/img/default-avatar.png';
        Name = 'User';
    }
    return db.collection('users').doc(user.uid).set({
        username: Name,
        email: user.email,
        photo: Photo,
        photoCover: '../src/img/default-cover.jpg',
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

// ---------------------------------------------AQUI COMANDOS DE FIREBASE CLOUD----------------------------------------// Firebase configuration inicial
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
const auth = firebase.auth();
const fs = firebase.firestore();

export { getDataUser, sendDataCurrentUser };