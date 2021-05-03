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