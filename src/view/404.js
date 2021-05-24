export default () => {
  const viewDifferent = `
    <div class='bg'>
        
    <div class='stars'>
        <div class='custom-navbar'>
            <div class='brand-logo'>
                <img src='../img/iziChoice.png' width='300px'>
                <a href='#/login' class='btn-go-home' target='_blank'>Home</a>
        </div>
        <div class='central-body'>
            <img class='image-404' src='../img/404.svg'>
            <a href='#/login' class='btn-go-home' target='_blank'>Home </a>
        </div>
        <div class='objects'>
            <img class='object_rocket' src='http://salehriaz.com/404Page/img/rocket.svg' width='40px'>
            <div class='earth-moon'>
                <img class='object_earth' src='http://salehriaz.com/404Page/img/earth.svg' width='100px'>
                <img class='object_moon' src='http://salehriaz.com/404Page/img/moon.svg' width='80px'>
            </div>
            <div class='box_astronaut'>
                <img class='object_astronaut' src='http://salehriaz.com/404Page/img/astronaut.svg' width='140px'>
            </div>
        </div>
        <div class='glowing_stars'>
            <div class='star'></div>
            <div class='star'></div>
            <div class='star'></div>
            <div class='star'></div>
        </div>

    </div>
</div>`;

  const divElemt = document.createElement('div');
  divElemt.setAttribute('id', 'message');
  divElemt.innerHTML = viewDifferent;
  return divElemt;
};
