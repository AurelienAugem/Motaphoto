let btnHeader = document.querySelector('.responsive-header');
let menu = document.querySelector('.responsive-menu .menu-header-container');

let topLine = document.querySelector('.top-line');
let middleLine = document.querySelector('.middle-line');
let bottomLine = document.querySelector('.bottom-line');

let menuHeader = document.querySelector('.menu-header');
let mainContent = document.querySelector('main');
let footer = document.querySelector('footer');

//Gestion de l'ouverture et fermeture du menu principal responsive
function showHeaderMenu(){

    if (btnHeader.classList.contains('menu-close')) {

        btnHeader.classList.remove('menu-close');
        btnHeader.classList.add('menu-open');
        btnHeader.style.setProperty('justify-content', 'unset');
        middleLine.style.display = "none";
        topLine.style.transform = "rotate(45deg) translateY(1px) translateX(1px)";
        bottomLine.style.transform = "rotate(-45deg) translateY(0px)";
        mainContent.style.display = "none";
        footer.style.display = "none";
        menu.style.display = "block";
        
    }else if (btnHeader.classList.contains('menu-open')) {
        
        btnHeader.classList.add('menu-close');
        btnHeader.classList.remove('menu-open');
        btnHeader.style.setProperty('justify-content', 'space-between');
        middleLine.style.display ="block";
        topLine.style.transform = "rotate(0deg)";
        bottomLine.style.transform = "rotate(0deg)";
        mainContent.style.display ="block";
        footer.style.display ="block";
        menu.style.display = "none";

    }

}

btnHeader.addEventListener('click', showHeaderMenu);