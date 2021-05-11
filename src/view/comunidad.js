import { signout, user } from "../controller/controller-auth.js";

export default () => {
    const userObject = user();
    const defaultValue = {
        phone: "Phone",
        birthday: "yyyy-MM-dd",
        country: "Country",
        description: "Description",
    };
    const viewComunidad = `
    <!-- Left column -->
    <div class = 'container-home'>
    <aside class='profile-section'>
      <div class='profile'>
        <img class='avatar' src='${userObject.photoURL}'/>
        <h2 id='name'> ${userObject.displayName}</h2>
        <hr>
        <p id='phone'><i class='fas fa-mobile-alt'></i> ${
          userObject.phone || defaultValue.phone
        }</p>
        <p id='city'><i class='fas fa-map-marker-alt'></i> ${
          userObject.country || defaultValue.country
        }</p>
        <p id='birthday'><i class='fas fa-birthday-cake'></i> ${
          userObject.birthday || defaultValue.country
        }</p>
        <a href='#/perfil' id='viewall'>Ver todo</a>
      </div>
      <!-- Interests -->
      <div class = 'interest'>
        <p>Intereses</p>
          <p>
            <span>Friends</span>
            <span>Derecho</span>
            <span>Política</span>
            <span>Ciencias Sociales</span>
            <span>PUCP</span>
            <span>Universidad de Lima</span>
          </p>
      </div>
    </aside>
  
    <!-- Middle column -->
    <main class='home-section'>
      <!-- Post -->
      <div class='create-post'>
        <div class='user'>
          <img class='avatar-post' src='${userObject.photoURL}'/>
          <p class='name'>${userObject.displayName}</p>
        </div>
        <div class='content-newpost'>
          <form id = 'form-post'>
            <textarea class='text-newpost' id='text-newpost' placeholder='¿Qué quieres compartir hoy?' spellcheck='false' required></textarea>
            <i id = 'remove-img' style='display: none' class='fas fa-times-circle'></i>
            <img id='post-img' class='post-img' src=''/>
            <div class='buttons-bar'>
              <label for='upload-img'>
                <input type='file' accept='image/jpeg, image/png, image/gif' id='upload-img' class='upload-img'>
                <i class='far fa-file-image'><span class='tooltiptext'>Upload an image</span></i>
              </label>
              <select class='fa' id='privacy-option'>
                <option class='fa' value='public' title = 'Public'>&#xf57d; </option>
                <option class='fa' value='private' title = 'Private'>&#xf023; </option>
              </select>
              <button type='submit' id='btn-post' class='btn-post' ><i class='fas fa-paper-plane'></i> Publicar</button>
            </div>
          </form>
        </div>
      </div>
      <section id='container-post'></section>
    </main>
  
    <!-- right column -->
    <aside class='right-section'>
      <!-- Events -->
      <div class='events'>
        <p>Publicidad</p>
        <img class='img-aside' src='./img/aside-anuncios.gif' title = 'anuncios' alt='anuncio'>
         <p class='img-aside-text'></p>
        <a href='https://orientacion.universia.net.co/carreras_universitarias.html' target='_blank'><button>Info</button></a>
      </div>
      <!-- About us -->
      <div class='aboutUs'>
        <ul>
          <li><a href='https://soniasayago.github.io/LIM014-social-network/' target='_blank'>Nosotros</a></li>
          <li><a href='https://soniasayago.github.io/LIM014-social-network/' target='_blank'>Ayuda</a></li>
          <li><a href='https://soniasayago.github.io/LIM014-social-network/' target='_blank'>Políticas de Privacidad</a></li>
          
        </ul>
        <p class='logo-aside'><img src='./img/iziChoice.svg'></p>
        <p class = 'copyright'>Copyright © 2021 All Rights Reserved.</p>
        <table class = 'github'>
          <tr>
            <th><a href='https://github.com/SoniaSayago' target='_blank'><i class='fab fa-github'><span class='tooltiptext'>Sonia Sayago</span></i></a></th>
            <th><a href='https://github.com/julissah' target='_blank'><i class='fab fa-github'><span class='tooltiptext'>Julissa Huamán</span></i></a></th>
            <th><a href='https://github.com/MariaCristinaTC' target='_blank'><i class='fab fa-github'><span class='tooltiptext'>Maria Cristina Tarazona</span></i></a></th>
          </tr>
          <tr>
            <td>S. Sayago</td>
            <td>J. Huamán</td>
            <td>MC. Tarazona</td>
          </tr>
        </table>
      </div>
    </aside> 
    `;
    const divElement = document.createElement("div");
    divElement.innerHTML = viewComunidad;
    document.getElementById("header").classList.remove("hide");

    const logout = document.querySelector("#logout");
    logout.addEventListener("click", (e) => {
        e.preventDefault();
        signout()
            .then(() => {
                // console.log('sign out');
            })
            .then(() => {
                window.location.hash = "#/login";
                document.getElementById("header").classList.add("hide");
            });
    });

    return divElement;
};