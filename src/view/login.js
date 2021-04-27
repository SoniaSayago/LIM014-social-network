export default () => {
    const viewLogin = `
    <h1> Inicias Sesión </h1>    
    `
    const divElement = document.createElement('div')
    divElement.innerHTML = viewLogin;
    return divElement;
}