export default () => {
    const viewComunidad = `
    <h1> Comunidad </h1>
    `
    const divElement = document.createElement('div')
    divElement.innerHTML = viewComunidad;
    return divElement;
}