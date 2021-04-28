export default () => {
    const viewRegister = `
   <div class= 'whiteBackground'>    
   <h> Registro </h1>
    <p>Crea tu cuenta con</p>
    <div class= imagesContainer></div>
    <p>ó registrate fácilmente con tus datos:</p>
    <div class= 'formContainer'>
        <div class ='formDiv'>
            <form id='registerForm'>
                <label>Nombre</label></br>
                <input type='text' id='name' placeholder='Nombres'> <br>
                <label>Email</label></br>
                <input type='text' id='email' placeholder='Email'> <br>
                <label>Contraseña</label></br>
                <input type='text' id='password' placeholder='Contraseña'></br>
                <input type='checkbox' <label>Acepta términos y condiciones.</label> 
            </form>
        </div>
    </div>
    </div>
    `
    const divElement = document.createElement('div')
    divElement.innerHTML = viewRegister;
    return divElement;
}