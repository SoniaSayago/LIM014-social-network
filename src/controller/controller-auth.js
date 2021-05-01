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
export const signinForEmail = (email, password) => {
    const auth = firebase.auth();
    return auth.signInWithEmailAndPassword(email, password);
};

//Signout
export const signout = () => {
    const auth = firebase.auth();
    return auth.signOut();
};
