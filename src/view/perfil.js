export default () => {
    const viewPerfil = `
    <h1> Mi Perfil </h1>
    `
    const divElement = document.createElement('div')
    divElement.innerHTML = viewPerfil;
    return divElement;
}