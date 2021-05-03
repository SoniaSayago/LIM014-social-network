import { signinForEmail , signInForGoogle , signInForFacebook } from '../controller/controller-auth.js'

export default () => {
    const viewLogin = `<section class= 'sectionHome' >
    <div class='introContainer hideHome'>
      <h3 class='textHomeH3'>Si aún no encuentras la respuesta, es porque solo haz buscado en lugares comunes...</h3><br>
      <h1 class='textHomeH1'>¡CONECTA CON TU FUTURO!</h1><br><br><br>
      <img src="./img/homeIziChoice.svg" alt="" class='imageHome'>
    </div>    
    <section class= 'sectionLogin' > 
    <div class='squareLogin'>      
      <div class='logoContainer'>
        <figure class="figureLogin">
            <img src="./img/iziChoice.png" alt="" class='logoLogin'>
        </figure>       
        <p>quien soy, quien quiero ser</p>
      </div><br>
      <div class= 'formContainer my-2'>
        <p class= 'registerContainer'>¡Bienvenid@ a un mundo de posibilidades!</p><br>
        <form id='loginForm'>
          <input type='email' id='email' placeholder='Email' class='inputEmail my-1'> <br>
          <input type='password' id='password' placeholder='Contraseña' class='inputPassword'></br> 
          <div class='registerContainer'><br>
           <p>Recuperar<a href="#/recover"> contraseña</a></p>
          </div>
          <button id='btn-ingresar' type="submit" class='btn-ingresar my-2'>Iniciar Sesión</button>
          <div>
          <p class="registerContainer">o ingresa con...</p><br>
          <div class="option">
          <img src="./icons/facebook.svg" class="facebook" id="btn-facebook"> &nbsp; &nbsp;
          <img src="./icons/google.svg" class="gmail" id="btn-google">       
          </div> <br>
        </form>
      </div><br>
      <div class='registerContainer'>
        <p>¿No tienes cuenta? <a href="#/register">Registrate</a></p>
      </div>  
    </div> 
    </section></section>`;
    const divElement = document.createElement('div');
    divElement.classList.add('mainDivHome');
    divElement.innerHTML = viewLogin;

    const signinForm = divElement.querySelector('#loginForm');
    signinForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = divElement.querySelector('#email').value;
      const password = divElement.querySelector('#password').value;

      signinForEmail(email,password)
        .then(userCredential => {
          if (userCredential.user.emailVerified) {
          window.location.hash = '#/comunidad';
          }
          else {
            alert('Por favor revise su bandeja de entrada para verificar su cuenta')
          }
          signinForm.reset();
          console.log('hi', email);
        })
        // .then(() => {
        //   window.location.hash = '#/comunidad';
        // });
    })
    
      /* ---------------------------regarding DOM manipulation for login with google---------------- */
  const btnGoogle = divElement.querySelector('#btn-google');
  btnGoogle.addEventListener('click', () => {
    signInForGoogle()
      .then(() => {
        getDataUser(currentUser().uid)
          .then((doc) => {
            if (doc.exists) {
              window.location.hash = '#/comunidad';
            } else {
              sendDataCurrentUser(currentUser())
                .then(() => {
                  window.location.hash = '#/comunidad';
                });
            }
          });
      });
  });

  const btnFacebook = divElement.querySelector('#btn-facebook');
  btnFacebook.addEventListener('click', () => {
    signInForFacebook()
      .then(() => {
        getDataUser(currentUser().uid)
          .then((doc) => {
            if (doc.exists) {
              window.location.hash = '#/comunidad';
            } else {
              sendDataCurrentUser(currentUser())
                .then(() => {
                  window.location.hash = '#/comunidad';
                });
            }
          });
      });
  });
    return divElement;    
};


