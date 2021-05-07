import { signout, user } from '../controller/controller-auth.js'
export default () => {
    const viewPerfil = `
    <div class= 'bigContainer'>
    <div class='bigContainer_userInfo'> 
        <img class=userPhoto src="${userObject.photoURL}"> &nbsp; &nbsp;&nbsp; &nbsp;
        <div><p class='boldName'> ${userObject.displayName} </p> </div> <br><br>
    </div>
    <div class='bigContainer_postsInfo' >

        <section class="post">
            <textarea id='postText' class='bigContainer_postsInfo_textArea'id="user_post" placeholder="Que quieres publicar hoy?" name="comment" cols="40" rows="4"></textarea>
            <div class="btn-group">
                <button id='postButton'class="smallButton" type="button"><img src="./icons/send.svg" class="send"> &nbsp;Publicar</button>
            </div>
        </section>

    </div>
</div>
    `
    const divElement = document.createElement('div')
    divElement.innerHTML = viewPerfil;
    return divElement;

}
const logout = document.querySelector('#logout')
logout.addEventListener('click', e => {
    e.preventDefault();
    signout().then(() => {
            console.log('sign out');
        })
        .then(() => {
            window.location.hash = '#/login';
            document.getElementById('header').classList.add('hide');
        })

})