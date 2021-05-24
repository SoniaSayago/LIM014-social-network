// ---------------------AQUI COMANDOS DE FIREBASE STORAGE ---------------------------------------

// Guardamos  imágenes en Storage
export const sendImgToStorage = (refPath, file) => firebase.storage().ref(refPath).put(file);
