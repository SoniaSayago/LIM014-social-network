// ---------------------------------------------AQUI COMANDOS DE FIREBASE AUTORIZATION----------------------------------------

// sign in con Google
export const signInForGoogle = () => {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    return auth.signInWithPopup(provider);
};

// sign in con Facebook
export const signInForFacebook = () => {
    const auth = firebase.auth();
    const provider = new firebase.auth.FacebookAuthProvider();
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

// RECOVER PASSWORD
// Send link for recover password
export const sendRecoverPass = (emailAddress) => {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(emailAddress);
  };

  // --------------------------------------GET CURRENT USER------------------------------------
export const currentUser = () => firebase.auth().currentUser;