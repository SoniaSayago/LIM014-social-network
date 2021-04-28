export default () => {
    const viewLogin = `
    <h1> Inicias Sesión </h1> 
    <div class= ''> 
    <div class= imagesContainer></div>
    <p>quien soy, quien quiero ser</p>
     <div class= 'formContainer'>
         <div class ='formDiv'>
             <form id='registerForm'>
                 <input type='text' id='email' placeholder='Email'> <br>
                 <input type='text' id='password' placeholder='Contraseña'></br>
                 <input type='checkbox' <label>Acepta términos y condiciones.</label> 
             </form>
         </div>
     </div>
     </div>   
    `
    const divElement = document.createElement('div')
    divElement.innerHTML = viewLogin;
    return divElement;
}