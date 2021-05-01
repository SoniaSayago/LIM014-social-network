// ---------------------------------------------AQUI COMANDOS DE FIREBASE AUTORIZATION----------------------------------------

// sign in con Google
export const signInForGoogle = () => {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
};

// Signup with Email
export const signupForEmail = (email, password) => {
    const auth = firebase.auth();
    return auth.createUserWithEmailAndPassword(email, password);
};

// Signin
