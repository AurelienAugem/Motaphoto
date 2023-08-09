let formulaire = document.querySelector('.formulaire-contact');
let contact = document.querySelector('#menu-item-26 a');
let contactButton = document.querySelector('.post-contact');
formulaire.classList.add('hidden');

//Affichage du formulaire de contact
function showForm() {

    if(formulaire.classList.contains("hidden")){

        formulaire.classList.add('form-animation');
        formulaire.classList.add('show');
        formulaire.classList.remove('hidden');

    }else if(formulaire.classList.contains("show")){

        formulaire.classList.remove('form-animation');
        formulaire.classList.add('hide');
        formulaire.classList.add('hidden');
        formulaire.classList.remove('show');

    }  
}
contact.addEventListener('click', showForm);
try {
    contactButton.addEventListener('click', showForm);
} catch (error) {
    console.log('Le bouton contact n\'est pas présent sur cette page');
}

//Préremplissage du formulaire
let ref = document.querySelector('#reference');

function autoForm(){
    let refPhoto = document.querySelector('.ref-photo');
    refPhoto.setAttribute('value', ref.textContent);
}

try {
    contactButton.addEventListener('click', autoForm);
} catch (error) {
    console.log('Le bouton contact ne peut être complété');
}

try {
    contact.addEventListener('click', autoForm);
} catch (error) {
    console.log('Pas de référence sur cette page');
}


//Gestion des filtres 
let btnCat = document.querySelector('#btn-categorie');
let btnForm = document.querySelector('#btn-format');
let btnTri = document.querySelector('#btn-tri');

try{
    let menuCat = document.querySelector('#menu-categorie');
    let menuFormat = document.querySelector('#menu-format');
    let menuTri = document.querySelector('#menu-tri');
    
    function showFilter(btn,menu){

        let btnParent = btn.parentNode;
        let btnGrandParent = btnParent.parentNode;
        let menuLast = menu.querySelector('li:last-child');

        if(menu.classList.contains('filter-hide')){

            btnGrandParent.style.setProperty('border-color','#215aff');
            btnGrandParent.style.setProperty('border-radius','8px 8px 0 0');
            btn.style.setProperty('--rotate','270deg');
            menu.classList.remove('filter-hide');
            menuLast.addEventListener('mouseenter', function () {
                this.style.setProperty('border-radius', '0 0 8px 8px');
            });

        } else {

            btnGrandParent.style.setProperty('border-color','#b8bbc2');
            btnGrandParent.style.setProperty('border-radius','8px');
            btn.style.setProperty('--rotate','90deg');
            menu.classList.add('filter-hide');

        }
    }

    btnCat.addEventListener('click', function(){showFilter(btnCat,menuCat);});
    btnForm.addEventListener('click', function(){showFilter(btnForm,menuFormat);});
    btnTri.addEventListener('click', function(){showFilter(btnTri,menuTri);} );

} catch (error){
    console.log('Pas de filtres sur cette page');
}

//Affichage des photos en plein écran
try {  
    let lightboxes = document.querySelectorAll('.photo-lightbox');

    function showLightbox(lightbox) {
        let lightboxStyle = window.getComputedStyle(lightbox);
        let lightboxDisplay = lightboxStyle.getPropertyValue('display');

        if (lightboxDisplay == "none") {
            lightbox.style.setProperty('display', 'flex');
        } else if (lightboxDisplay == "flex") {
            lightbox.style.setProperty('display', 'none');
        }
    }

    let btnFullscreen = document.querySelectorAll('.fullscreen');
    let btnCloseFullscreen = document.querySelectorAll('.close');

    // Ouverture et fermeture de la lightbox pour chaque bouton
    btnFullscreen.forEach((btn, btnIndex) => {
        btn.addEventListener('click', function () {
            showLightbox(lightboxes[btnIndex]);
        });
    });

    btnCloseFullscreen.forEach((btn, btnIndex) => {
        btn.addEventListener('click', function () {
            showLightbox(lightboxes[btnIndex]);
        });
    });

} catch (error) {
    
}