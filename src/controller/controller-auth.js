// ---------------------------------------------AQUI COMANDOS DE FIREBASE AUTORIZATION----------------------------------------

// sign in con google
export const signInForGoogle = () => {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
}