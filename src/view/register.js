export default () => {
    const viewRegister = `
    <h1> Registro </h1>
    <div class= 'formContainer'>
    <form id='registerForm'>
        <input type='text' id='name'>
    </form>
    </div>
    `
    const divElemt = document.createElement('div')
    divElem.innerHTML = viewRegister;
    return divElemt;
}