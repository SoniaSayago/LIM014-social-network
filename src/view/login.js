import { signinForEmail } from '../controller/controller-auth.js'

export default () => {
    const viewLogin = `<section class= 'sectionHome' >
    <div class='introContainer hideHome'>
      <h3 class='textHomeH3'>Si aún no encuentras la respuesta, es porque solo haz buscado en lugares comunes...</h3><br>
      <h1 class='textHomeH1'>¡CONECTA CON TU FUTURO!</h1>
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
        <form id='loginForm'>
          <input type='text' id='email' placeholder='Email' class='inputEmail my-1'> <br>
          <input type='password' id='password' placeholder='Contraseña' class='inputPassword'></br> 
          <button id='btn-ingresar' type="submit" class='btn-ingresar my-2'>Ingresar</button>
          <div>
          <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 21.62C0 32.3091 7.76329 41.1976 17.9167 43V27.4716H12.5417V21.5H17.9167V16.7216C17.9167 11.3466 21.38 8.36171 26.2784 8.36171C27.83 8.36171 29.5034 8.6 31.055 8.83829V14.3333H28.3083C25.68 14.3333 25.0833 15.6466 25.0833 17.32V21.5H30.8167L29.8617 27.4716H25.0833V43C35.2367 41.1976 43 32.3109 43 21.62C43 9.72875 33.325 0 21.5 0C9.675 0 0 9.72875 0 21.62Z" fill="white"/>
          </svg>
          <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5 0C9.62483 0 0 9.62663 0 21.5C0 33.3734 9.62483 43 21.5 43C33.3734 43 43 33.3734 43 21.5C43 9.62663 33.3734 0 21.5 0ZM21.7508 34.0739C14.8207 34.0739 9.20917 28.4481 9.20917 21.5C9.20917 14.5519 14.8207 8.92608 21.7508 8.92608C25.1371 8.92608 27.9679 10.1749 30.1394 12.203L26.6027 15.747V15.7398C25.2858 14.482 23.616 13.837 21.7508 13.837C17.6121 13.837 14.2491 17.3415 14.2491 21.4928C14.2491 25.6405 17.6121 29.1558 21.7508 29.1558C25.5062 29.1558 28.0611 27.0022 28.5878 24.046H21.7508V19.1422H33.549C33.7066 19.9842 33.7908 20.8622 33.7908 21.7831C33.7908 28.9677 28.9945 34.0739 21.7508 34.0739Z" fill="white"/>
          </svg>
          </div>
        </form>
      </div>
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

        signinForEmail(email, password)
            .then(userCredential => {
                signinForm.reset();
                console.log('hi', email);
            })
            .then(() => {
                window.location.hash = '#/comunidad';
            });
    })

    return divElement;


};