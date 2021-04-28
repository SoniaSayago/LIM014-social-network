export default () => {
    const viewLogin = `
    <section class= 'backgroundLogIn sectionLogin' > 
      <div class='logoContainer'>
        <figure class="figureLogin">
            <img src="./img/iziChoice.png" alt="" class='logoLogin'>
        </figure>       
        <p>quien soy, quien quiero ser</p>
      </div>
      <div class= 'formContainer my-2'>
        <form id='loginForm'>
          <input type='text' id='email' placeholder='Email' class='email my-1'> <br>
          <input type='text' id='password' placeholder='Contraseña' class='password'></br> 
          <button id='btn-ingresar' class='btn-ingresar my-2'>Ingresar</button>
          <div>
            <a href=""><span><img src='./icons/facebook.svg'></span></a>
            <a href=""><span><img src='./icons/google.svg'></span></a>
          </div>
        </form>
      </div>
      <div class='registerContainer'>
        <p>¿No tienes cuenta? Registrate <a href="">aquí</a></p>
        <button id="btn-facebook" class='btn-ingresar my-2'>Registrate</button>
      </div>   
    </section>   
    `
    const divElement = document.createElement('div')
    divElement.innerHTML = viewLogin;
    return divElement;
}