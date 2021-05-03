import { signupForEmail } from '../controller/controller-auth.js'

export default () => {
    const viewRegister = `
   <div class= 'whiteBackground'>    
   <div class= 'backgroundRegisterHead'>
   <figure class="figureLogin">
   <img src="./img/iziChoice.png" alt="" class='smallLogo'>
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
                <input  class='terms' type='checkbox' <label> Acepta términos y condiciones.</label> </br> </br>
                <button class= 'bigButton' type="submit" >Enviar</button>
            </form>
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
            .then(userCredential => {
                signupForm.reset();
                console.log('hi', name);
            })
            .then(() => {
                window.location.hash = '#/comunidad'
            })
        
    });
    return divElement;
};
=======
// import { signupForEmail } from '../controller/controller-auth.js'

// export default () => {
//     const viewRegister = `
//    <div class= 'whiteBackground'>    
//    <div class= 'backgroundRegisterHead'>
//    <figure class="figureLogin">
//    <img src="./img/iziChoice.png" alt="" class='smallLogo'>
// </figure></div></br></br>
//     <div class='initialP'><p>Crea tu cuenta con</p></div>
//     <div class= imagesContainer>
//     <a href="#/login"><span>
//     <svg width="48" height="41" viewBox="0 0 48 41" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path fill-rule="evenodd" clip-rule="evenodd" d="M0 20.6145C0 30.8064 8.666 39.2814 20 41V26.1939H14V20.5H20V15.9439C20 10.8189 23.866 7.97279 29.334 7.97279C31.066 7.97279 32.934 8.2 34.666 8.42721V13.6667H31.6C28.666 13.6667 28 14.9189 28 16.5145V20.5H34.4L33.334 26.1939H28V41C39.334 39.2814 48 30.8081 48 20.6145C48 9.27625 37.2 0 24 0C10.8 0 0 9.27625 0 20.6145Z" fill="#4B35D1"/>
//     </svg>
//     </span></a>
//     <a href=""><span>
//     <svg width="43" height="41" viewBox="0 0 43 41" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5 0C9.62483 0 0 9.17888 0 20.5C0 31.8211 9.62483 41 21.5 41C33.3734 41 43 31.8211 43 20.5C43 9.17888 33.3734 0 21.5 0ZM21.7508 32.4891C14.8207 32.4891 9.20917 27.1249 9.20917 20.5C9.20917 13.8751 14.8207 8.51092 21.7508 8.51092C25.1371 8.51092 27.9679 9.70162 30.1394 11.6355L26.6027 15.0145V15.0077C25.2858 13.8085 23.616 13.1935 21.7508 13.1935C17.6121 13.1935 14.2491 16.535 14.2491 20.4932C14.2491 24.448 17.6121 27.7997 21.7508 27.7997C25.5062 27.7997 28.0611 25.7463 28.5878 22.9275H21.7508V18.2518H33.549C33.7066 19.0548 33.7908 19.8918 33.7908 20.7699C33.7908 27.6203 28.9945 32.4891 21.7508 32.4891Z" fill="#4B35D1"/>
//     </svg>
//     </span></a>
// </div>

//     <div class= 'formContainer'>
//     <p>ó registrate fácilmente con tus datos:</p></br></br>
//         <div class ='formDiv'>
//             <form id='registerForm'>
//                 <label class='registerForm1Label'>Nombres y Apellidos</label></br>
//                 <input class='registerForm1Input' type='text' id='name' placeholder='Nombres y Apellidos' required> <br></br>
//                 <label class='registerForm1Label' >Email</label></br>
//                 <input class='registerForm1Input'  type='text' id='email' placeholder='Email' required> <br></br>
//                 <label class='registerForm1Label' >Contraseña</label></br>
//                 <input class='registerForm1Input'  type='text' id='password' placeholder='Contraseña' required></br></br>
//                 <input  class='terms' type='checkbox' <label> Acepta términos y condiciones.</label> </br> </br>
//                 <button class= 'bigButton' type="submit" >Enviar</button>
//             </form>
//         </div>
//     </div>
//     </div>`;
//     const divElement = document.createElement('div');
//     divElement.classList.add('mainDiv');
//     divElement.innerHTML = viewRegister;

//     const signupForm = divElement.querySelector('#registerForm');
//     signupForm.addEventListener('submit', (e) => {
//         e.preventDefault(); //cancela el evento de reinicio del formulario

//         const name = divElement.querySelector('#name').value;
//         const email = divElement.querySelector('#email').value;
//         const password = divElement.querySelector('#password').value;

//         signupForEmail(email, password)
//             .then(userCredential => {
//                 signupForm.reset();
//                 console.log('hi', name);
//             })
//             .then(() => {
//                 window.location.hash = '#/comunidad'
//             })

//     });
//     return divElement;
// };
