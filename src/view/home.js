export default () => {
    const viewHome = `
    <h1> home </h1>
    `
    const divElement = document.createElement('div')
    divElem.innerHTML = viewHome;
    return divElem;
}