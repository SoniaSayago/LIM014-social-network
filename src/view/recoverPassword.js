export default () => {
    const viewRecover = `
  <div class= 'backgroundRegisterHead'>
  <figure class='figureLogin'>
  <a href='#/login' target='_blank'><img src='./img/iziChoice.png' alt='' class='smallLogo'></a>
   </figure></div></br></br>
</div>
<div class= 'whiteBackground'> 
<div class= 'formBackground'> 
<header>
<h1 class="title"> Recuperar Contraseña </h1><br><br>
<p class="text">Ingresar el email asociado a su cuenta:</p><br><br>
</header>
<form id="recoverPass-form">
<div class="div-input">
<i class="fas fa-envelope"></i>
<input type="email" id="email" placeholder="E-mail" required autocomplete="off" spellcheck="false" />
</div><br>
<button type="submit" class="btn-recoverPass">Recuperar</button>
<p id = "error-message"></p>
<a href='#/login' class="btn-recoverPass">Regresar</a>
</form>

</div>

   
   
    `;
    const divElement = document.createElement('div');
    divElement.innerHTML = viewRecover;
    return divElement;
};