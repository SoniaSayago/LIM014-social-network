import {
  createUser,
  sendEmail,
  signInWithGoogle,
  signInWithFacebook,
} from './services/aut.services.js';

import {
  sendDataCurrentUser,
  getDataUser,
} from './services/firestore.services.js';

export default () => {
  const viewRegister = `
  <div class= 'backgroundRegisterHead'>
    <figure class='figureLogin'>
    <a href='#/login' target='_blank'><img src='./img/iziChoice.png' alt='' class='smallLogo'></a>
     </figure></div></br></br>
  </div>
   <div class= 'whiteBackground'>    
   <div class= 'formBackground'> 
   
    <div class='initialP'><p>Crea tu cuenta con</p></div>
    <div class= imagesContainer>
    <div class='option'>
    <img src='./icons/facebook-azul.svg' class='facebook' id='btn-facebook'>  &nbsp; &nbsp;
    <img src='./icons/google-azul.svg' class='gmail' id='btn-google'>       
    </div> <br>
    </div>
    <div class= 'formContainer'>
    <p>ó registrate fácilmente con tus datos:</p></br></br>
        <div class ='formDiv'>
            <form id='registerForm'>
                <label class='registerForm1Label'>Nombres y Apellidos</label></br>
                <input class='registerForm1Input' type='text' id='name' placeholder='Nombres y Apellidos' required> <br></br>
                <label class='registerForm1Label' >Email</label></br>
                <input class='registerForm1Input'  type='text' id='email' placeholder='Email' required> <br></br>
                <label class='registerForm1Label' >Contraseña</label></br>
                <input class='registerForm1Input'  type='password' id='password' placeholder='Contraseña' pattern='[a-zA-Z0-9]{6,20}' required></br></br>
                <input  class='terms' type='checkbox' required> <label> Acepta términos y condiciones.</label> </br> </br>
                <p id = 'error-message'></p><br><br>
                <button class= 'bigButton' type='submit' >Enviar</button> <br><br>
            </form>
        </div>
        <div class='goLoginContainer'>
        <p>¿Ya tienes una cuenta? <a href='#/login'>Inicia sesión</a></p>
      </div>  
    </div> 
    </div>
    </div>
    </div>`;
    // COD QUE PERMITE LAS VISTAS: VISTA DE REGISTRO
  const divElement = document.createElement('div');
  divElement.classList.add('mainDiv');
  divElement.innerHTML = viewRegister;

  // COD PERMITE HACER EL REGISTRO DE USUARIO NUEVO
  const signupForm = divElement.querySelector('#registerForm');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // cancela el evento de reinicio del formulario
    const email = divElement.querySelector('#email').value; // .value porque son inputs
    const password = divElement.querySelector('#password').value;
    const error = divElement.querySelector('#error-message');
    // FUNCIÓN QUE PERMITE AUTENTIFICAR USUARIO NUEVO CON EMAIL
    createUser(email, password) // es una función q creamos en base a Firebase
      .then(() => {
        sendEmail() // PERMITE QUE SE ENVIE EL CORREO DE AUT AL USUARIO
          .then(() => {
            error.classList.add('successful-message');
            error.textContent = 'Por favor revise su bandeja de entrada para verificar su cuenta';
          })
          .catch((err) => {
            error.classList.add('error-message');
            error.textContent = err.message;
          });
        signupForm.reset();
      })
      .catch((err) => {
        error.classList.remove('successful-message');
        error.classList.add('error-message');
        switch (err.message) {
          case 'The email address is already in use by another account.':
            error.textContent = 'La dirección de correo electrónico ya está siendo utilizada por otra cuenta.';
            break;
          default:
            error.textContent = 'Los datos son incorrectos, verifica nuevamente';
        }
        setTimeout(() => {
          error.textContent = ' ';
        }, 4000);
      });
  });

  /* ---------------------------regarding DOM manipulation for login with google---------------- */
  const btnGoogle = divElement.querySelector('#btn-google');
  btnGoogle.addEventListener('click', () => {
    signInWithGoogle().then((response) => {
      getDataUser(response.user.uid).then((doc) => {
        if (doc.exists) {
          window.location.hash = '#/comunidad';
        } else {
          sendDataCurrentUser(response.user).then(() => {
            // if (doc.exists) {
            window.location.hash = '#/comunidad';
            // }
          });
        }
      });
    });
  });
  const btnFacebook = divElement.querySelector('#btn-facebook');
  btnFacebook.addEventListener('click', () => {
    signInWithFacebook().then((response) => {
      getDataUser(response.user.uid).then((doc) => {
        if (doc.exists) {
          window.location.hash = '#/comunidad';
        } else {
          sendDataCurrentUser(response.user).then(() => {
            window.location.hash = '#/comunidad';
            // }
          });
        }
      });
    });
  });

  return divElement;
};
