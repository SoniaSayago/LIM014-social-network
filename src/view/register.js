export default () => {
    const viewRegister = `
    <h1> Registro </h1>
    <div class= 'formContainer'>
    <div class ='formDiv'><form id='registerForm'>
        <input type='text' id='name' placeholder='Nombres'> 
    </form>
    </div>
    </div>
    `
    const divElement = document.createElement('div')
    divElement.innerHTML = viewRegister;
    return divElement;
}