import {
  signInWithEmail,
  signInWithGoogle,
  signInWithFacebook,
} from './services/aut.services.js';
import {
  sendDataCurrentUser,
  getDataUser,
} from './services/firestore.services.js';

// FUNCIÓN QUE AYUDA AL USUARIO RECURRENTE LOGEARSE CON SU CORREO REGISTRADO
const submitForm = (signInForm, divElement) => {
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = divElement.querySelector('#email').value;
    const password = divElement.querySelector('#password').value;
    const error = divElement.querySelector('#error-message');
    if (email === ' ' || password === '') {
      error.textContent = 'Formulario vacío, rellenar los campos';
    } else {
      signInWithEmail(email, password)
        .then((data) => {
          if (data.user.emailVerified === true) {
            window.location.hash = '#/comunidad';
          } else {
            error.textContent = 'Cuenta no verificada, por favor revise su email';
          }
        })
        .catch((err) => {
          switch (err.message) {
            case 'There is no user record corresponding to this identifier. The user may have been deleted.':
              error.textContent = 'El correo que ingresaste no pertenece a ninguna cuenta';
              break;
            case 'The password is invalid or the user does not have a password.':
              error.textContent = 'La contraseña no es correcta. Compruébala.';
              break;
            default:
              error.textContent = 'Los datos ingresados son incorrectos, vuelve a ingresarlos';
          }
        });
    }
  });
};

export default () => {
  const viewLogin = `<section class= 'sectionHome' >
    <div class='introContainer hideHome'>
      <h3 class='textHomeH3'>Si aún no encuentras la respuesta, es porque solo haz buscado en lugares comunes...</h3><br>
      <h1 class='textHomeH1'>¡CONECTA CON TU FUTURO!</h1><br><br>
      <img src='./img/homeIziChoice.svg' alt='' class='imageHome'>
    </div>    
    <section class= 'sectionLogin' > 
    <div class='squareLogin'>      
      <div class='logoContainer'>
        <figure class='figureLogin'>
            <img src='./img/iziChoice.png' alt='' class='logoLogin'>
        </figure>       
        <p>quien soy, quien quiero ser</p>
      </div><br>
      <div class= 'formContainer my-2'>
        <p class= 'registerContainer'>¡Bienvenid@ a un mundo de posibilidades!</p><br>
        <form id='loginForm'>
        <div class='form'>
          <div class=label'>
          <span class='material-icons'>mail_outline</span>
              <input type='email' id='email' placeholder='Email' class='inputEmail my-1'> <br>
          </div>
          <div class=label'>
          <span class='material-icons'>vpn_key</span>
            <input type='password' id='password' placeholder='Contraseña' pattern='[a-zA-Z0-9]{6,20}' class='inputPassword'></br> 
           </div>
          <div class='registerContainer'><br>
           <p>Recupera tu <a href='#/recover'> contraseña aquí</a></p>
          </div><br>
          <p id = 'error-message' class = 'error-message'></p>
          <button id='btn-ingresar' type='submit' class='btn-ingresar my-2'>Iniciar Sesión</button>
        </div>
        <p class='registerContainer'>o ingresa con...</p><br>
        <div class='option'>
        <img src='./icons/facebook.svg' class='facebook' id='btn-facebook'> &nbsp; &nbsp;
        <img src='./icons/google.svg' class='gmail' id='btn-google' >
        </div> <br>
      </form>
    </div><br>
    <div class='registerContainer'>
      <p>¿Eres nuevo? <a href='#/register'>Registrate aqui</a></p>
    </div>  
  </div> 
  </section></section>`;

  const divElement = document.createElement('div');
  divElement.classList.add('mainDivHome');
  divElement.innerHTML = viewLogin;

  const signInForm = divElement.querySelector('#loginForm');
  submitForm(signInForm, divElement);

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
