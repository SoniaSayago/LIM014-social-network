// ---------------------------------AQUI COMANDOS DE FIREBASE AUTORIZATION--------------
// ----------------- LOG IN  -----------------------
// Iniciar sesión con credenciales creadas con Email
export const signInWithEmail = (email, password) => {
  const auth = firebase.auth();
  return auth.signInWithEmailAndPassword(email, password);
};

// Inicia sesión con Google
export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

// Inicia sesión con Facebook
export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

// ----------------- REGISTRARSE -------------
// Crear usuario
export const createUser = (email, password) => {
  const auth = firebase.auth();
  return auth.createUserWithEmailAndPassword(email, password);
};
// Enviar email de verificaciòn para la cuenta creada.
export const sendEmail = () => {
  const user = firebase.auth().currentUser;
  return user.sendEmailVerification();
};

// --------------------- SIGN OUT -----------------------
// Desconectar - cerrar sesión
export const signout = () => {
  const auth = firebase.auth();
  return auth.signOut();
};

// -------------------------- RECOVER PASSWORD --------------
// Enviar link al email registrado para recuperar contraseña
export const sendRecoverPass = (emailAddress) => {
  const auth = firebase.auth();
  return auth.sendPasswordResetEmail(emailAddress);
};

// --------------------------------------GET CURRENT USER------------------------------------
export const user = () => firebase.auth().currentUser;

export const currentUser = () => firebase.auth().currentUser;

export const updateCurrentUserPhoto = (photoURL) => firebase.auth().currentUser.updateProfile({
  photoURL,
});
