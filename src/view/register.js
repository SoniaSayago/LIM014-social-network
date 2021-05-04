import { signupForEmail, sendEmail } from '../controller/controller-auth.js'

export default () => {
    const viewRegister = `
   <div class= 'whiteBackground'>    
   <div class= 'backgroundRegisterHead'>
   <figure class="figureLogin">
   <a href='#/login' target="_blank"><img src="./img/iziChoice.png" alt="" class='smallLogo'></a>
</figure></div></br></br>
    <div class='initialP'><p>Crea tu cuenta con</p></div>
    <div class= imagesContainer>
    <div class="option">
    <img src="./icons/facebook-azul.svg" class="facebook" id="btn-facebook">  &nbsp; &nbsp;
    <img src="./icons/google-azul.svg" class="gmail" id="btn-google">       
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
                <input class='registerForm1Input'  type='password' id='password' placeholder='Contraseña' required></br></br>
                <input  class='terms' type='checkbox' required><label> Acepta términos y condiciones.</label> </br> </br>
                <button class= 'bigButton' type="submit" >Enviar</button>
            </form>
        </div>
        <div class='goLoginContainer'>
        <p>¿Ya tienes una cuenta? <a href="#/login">Inicia sesión</a></p>
      </div>  
    </div> 
    </div>
    </div>`;
    const divElement = document.createElement('div');
    divElement.classList.add('mainDiv');
    divElement.innerHTML = viewRegister;

    const signupForm = divElement.querySelector('#registerForm');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); //cancela el evento de reinicio del formulario
        const name = divElement.querySelector('#name').value;
        const email = divElement.querySelector('#email').value;
        const password = divElement.querySelector('#password').value;

        signupForEmail(email, password)
            .then(() => {
                sendEmail()
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
            // .then(() => {
            //     window.location.hash = '#/comunidad'
            // })
            .catch((err) => {
                error.classList.remove('successful-message');
                error.classList.add('error-message');
                error.textContent = err.message;
                setTimeout(() => {
                    error.textContent = '';
                }, 4000);
            });
    });
    return divElement;
};