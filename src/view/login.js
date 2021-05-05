import { signInWithEmail, signInWithGoogle, signInWithFacebook } from '../controller/controller-auth.js';
import { sendDataCurrentUser, getDataUser } from '../controller/controller-firestore.js'


export default () => {
  const viewLogin = `<section class= 'sectionHome' >
    <div class='introContainer hideHome'>
      <h3 class='textHomeH3'>Si aún no encuentras la respuesta, es porque solo haz buscado en lugares comunes...</h3><br><br><br>+
      <h1 class='textHomeH1'>¡CONECTA CON TU FUTURO!</h1><br><br><br><br><br>
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
        <div class="form">
          <div class=label">
          <span class="material-icons">mail_outline</span>
              <input type='email' id='email' placeholder='Email' class='inputEmail my-1'> <br>
          </div>
          <div class=label">
          <span class="material-icons">vpn_key</span>
            <input type='password' id='password' placeholder='Contraseña' pattern="[a-zA-Z0-9]{6,20}" class='inputPassword'></br> 
           </div>
          <div class='registerContainer'><br>
           <p>Recupera tu <a href="#/recover"> contraseña aquí</a></p>
          </div><br><br>
          <p id = "error-message" class = "error-message"></p>
          <button id='btn-ingresar' type="submit" class='btn-ingresar my-2'>Iniciar Sesión</button>
        </div>
          <p class="registerContainer">o ingresa con...</p><br>
          <div class="option">
          <img src="./icons/facebook.svg" class="facebook" id="btn-facebook"> &nbsp; &nbsp;
          <img src="./icons/google.svg" class="gmail" id="btn-google" >
          </div> <br>
        </form>
      </div><br>
      <div class='registerContainer'>
        <p>¿Eres nuevo? <a href="#/register">Registrate aquí </a></p>
      </div>  
    </div> 
    </section></section>`;



  const divElement = document.createElement('div');
  divElement.classList.add('mainDivHome');
  divElement.innerHTML = viewLogin;

  const signInForm = divElement.querySelector('#loginForm');

  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = divElement.querySelector('#email').value;
    const password = divElement.querySelector('#password').value;
    const error = divElement.querySelector('#error');
    if (email === ' ' || password === '') {
      error.innerHTML = `<p> Formulario vacío, rellenar los campos
                      <span class="material-icons">priority_high
                      </span></p>`;
    } else {
      signInWithEmail(email, password)
        .then((data) => {
          if (data.user.emailVerified == true) {
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
          } else {
            error.textContent = `<p>Cuenta no verificada, por favor revise su email
                      <span class="material-icons">priority_high
                      </span></p>`;
          }
        })
        .catch((err) => {
          error.textContent = err.message;
          setTimeout(() => {
            error.textContent = '';
          }, 5000);
        });
    };

  })
  /* ---------------------------regarding DOM manipulation for login with google---------------- */
  const btnGoogle = divElement.querySelector('#btn-google');
  btnGoogle.addEventListener('click', () => {
    signInWithGoogle()
      .then((response) => {
        console.log('response: ', response);

        getDataUser(currentUser().uid)
          .then((doc) => {
            if (doc.exists) {
              window.location.hash = '#/comunidad';
            } else {
              sendDataCurrentUser(currentUser())
                .then(() => {
                  if (doc.exists) {
                    window.location.hash = '#/comunidad';
                  };
                }
                )
            };
          })
      }).catch();
=======
    const signinForm = divElement.querySelector('#loginForm');
    signinForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = divElement.querySelector('#email').value;
        const password = divElement.querySelector('#password').value;

        signinForEmail(email, password)
            .then(userCredential => {
                if (userCredential.user.emailVerified) {
                    window.location.hash = '#/comunidad';
                } else {
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

      signInWithFacebook()
        .then(() => {
          getDataUser(currentUser().uid)
            .then((doc) => {
              if (doc.exists) {
                window.location.hash = '#/comunidad';
              } else {
                sendDataCurrentUser(currentUser())
                  .then(() => {
                    if (doc.exists) {
                      window.location.hash = '#/comunidad';
                    };
                  }
                  )
              };
            });
        });
    })
  })
  return divElement;
}

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
