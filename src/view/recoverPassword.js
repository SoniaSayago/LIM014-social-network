export default () => {
    const viewRecover = `
    
    <div class= 'whiteBackground '>    
   <div class= 'backgroundRegisterHead'>
   <figure class="figureLogin">
   <a href='#/login' target="_blank"><img class='smallLogo'src="./img/iziChoice.png"></a>
   </figure></div><br><br><br><br><br>
    <header>
    <h1 class="title"> Recuperar Contraseña </h1><br><br>
    <p class="text">Ingresar el email asociado a su cuenta:</p><br><br>
    </header>
    <form id="recoverPass-form">
    <div class="div-input">
    <i class="fas fa-envelope"></i>
    <input type="email" id="email" placeholder="E-mail" required autocomplete="off" spellcheck="false" />
    </div><br>
    <button type="submit" class="btn-recoverPass">Recuperar contraseña</button><br><br>
    <p id = "error-message"></p><br>
    <a href='#/login' class="btn-recoverPass">regresar a Login</a>
    </form>
    `
    const divElement = document.createElement('div')
    divElement.innerHTML = viewRecover;
    return divElement;
}