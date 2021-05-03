export default () => {
    const viewHome = `
    <h1> home </h1>
    `
    const divElement = document.createElement('div')
    divElement.innerHTML = viewHome;
    return divElement;
}