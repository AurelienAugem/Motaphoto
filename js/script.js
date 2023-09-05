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
        document.body.classList.add('no-scroll');

    }else if(formulaire.classList.contains("show")){

        formulaire.classList.remove('form-animation');
        formulaire.classList.add('hide');
        formulaire.classList.add('hidden');
        formulaire.classList.remove('show');
        document.body.classList.remove('no-scroll');

    }  
}

contact.addEventListener('click', function (e) {
    showForm();
    e.stopPropagation();
});

try {
    contactButton.addEventListener('click', function (e) {
        showForm();
        e.stopPropagation();
    });
} catch (error) {
    console.log('Le bouton contact n\'est pas présent sur cette page');
}

document.addEventListener('click', function(e){
    if (!formulaire.contains(e.target) && formulaire.classList.contains("show")) {

        formulaire.classList.remove('form-animation');
        formulaire.classList.add('hide');
        formulaire.classList.add('hidden');
        formulaire.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }
});

//Préremplissage du formulaire

let ref = document.querySelector('#reference');

function autoForm(){
    let refPhoto = document.querySelector('.ref-photo');
    if (ref != null) {
        refPhoto.setAttribute('value', ref.textContent);
    }   
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
// Affichage des menus des filtres
try {
    (function ($) {
        $(document).ready(function () {

            let categorieFiltre = $('#btn-categorie');
            let formatFiltre = $('#btn-format');
            let dateFiltre = $('#btn-tri');

            let categorie = $('.photo-categorie');
            let format = $('.photo-format');
            let date = $('.photo-date');

            //Catégorie
            categorie.each(function() {
                let select = $(this).parent();
                select.on('click', function() {
                    let cat = $(this).find('.photo-categorie');
                    let siblings = $(this).siblings().find('.photo-categorie');
                    let listeFiltres = select.parent();
                    let finDeListe = listeFiltres.find('li').last();
                    finDeListe.css("border-radius", "0 0 8px 8px");
                    let menu = $(this).parent();
                    let bordure = menu.parent().parent();

                    if (cat.hasClass("active")) {
                        menu.addClass('filter-hide');
                        bordure.css("border-color", "#b8bbc2");
                        bordure.css("border-radius", "8px");
                        $(this).css("background-color", "white");
                        cat.css("color", "#313144");
                        categorieFiltre.text("Catégorie");
                        cat.removeClass('active');
                    } else {
                        menu.addClass('filter-hide');
                        bordure.css("border-color", "#215aff");
                        $(this).css("background-color", "#E00000");
                        cat.css("color", "white");
                        categorieFiltre.text(cat.attr('id'));
                        cat.addClass('active');
                        $(this).siblings().css("background-color", "white");
                        siblings.removeClass('active');
                        siblings.css("color", "#313144");
                        console.log('Galerie filtrée par la catégorie: ' + cat.text());
                    }
                });
            });

            //Format
            format.each(function() {
                let select = $(this).parent();
                select.on('click', function() {
                    let form = $(this).find('.photo-format');
                    let siblings = $(this).siblings().find('.photo-format');
                    let listeFiltres = select.parent();
                    let finDeListe = listeFiltres.find('li').last();
                    finDeListe.css("border-radius", "0 0 8px 8px");
                    let menu = $(this).parent();
                    let bordure = menu.parent().parent();

                    if (form.hasClass("active")) {
                        menu.addClass('filter-hide');
                        bordure.css("border-color", "#b8bbc2");
                        bordure.css("border-radius", "8px");
                        $(this).css("background-color", "white");
                        form.css("color", "#313144");
                        formatFiltre.text("Format");
                        form.removeClass('active');
                    } else {
                        menu.addClass('filter-hide');
                        bordure.css("border-color", "#215aff");
                        $(this).css("background-color", "#E00000");
                        form.css("color", "white");
                        formatFiltre.text(form.attr('id'));
                        form.addClass('active');
                        $(this).siblings().css("background-color", "white");
                        siblings.removeClass('active');
                        siblings.css("color", "#313144");
                        console.log('Galerie filtrée par le format: ' + form.text());
                    }
                });
            });

            //Date
            date.each(function() {
                let select = $(this).parent();
                select.on('click', function() {
                    let date = $(this).find('.photo-date');
                    let siblings = $(this).siblings().find('.photo-date');
                    let listeFiltres = select.parent();
                    let finDeListe = listeFiltres.find('li').last();
                    finDeListe.css("border-radius", "0 0 8px 8px");
                    let menu = $(this).parent();
                    let bordure = menu.parent().parent();

                    if (date.hasClass("active")) {
                        menu.addClass('filter-hide');
                        bordure.css("border-color", "#b8bbc2");
                        bordure.css("border-radius", "8px");
                        $(this).css("background-color", "white");
                        date.css("color", "#313144");
                        dateFiltre.text("Trier par...");
                        date.removeClass('active');
                    } else {
                        menu.addClass('filter-hide');
                        bordure.css("border-color", "#215aff");
                        $(this).css("background-color", "#E00000");
                        date.css("color", "white");
                        dateFiltre.text(date.text());
                        date.addClass('active');
                        $(this).siblings().css("background-color", "white");
                        siblings.removeClass('active');
                        siblings.css("color", "#313144");
                        if (date.data('id') == "ASC") {
                            console.log('Galerie filtrée dans l\'ordre chronolique croissant');
                        } else if (date.data('id') == "DESC") {
                            console.log('Galerie filtrée dans l\'ordre chronolique décroissant');
                        }
                    }
                });
            });

        });
    })(jQuery);
} catch (error) {
    
}

//Affichage des photos en plein écran
try {  
    //Affichage de la lightbox
    function showLightbox(lightbox) {
        let lightboxStyle = window.getComputedStyle(lightbox);
        let lightboxDisplay = lightboxStyle.getPropertyValue('display');

        if (lightboxDisplay == "none") {
            lightbox.style.setProperty('display', 'flex');
            document.body.classList.add('no-scroll');
        } else if (lightboxDisplay == "flex") {
            lightbox.style.setProperty('display', 'none');
            document.body.classList.remove('no-scroll');
        }
    }

    function fullscreenLightbox() {
        let lightboxes = document.querySelectorAll('.photo-lightbox');
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
    }
    //Lorsque la page est chargée les boutons ouverture et fermeture des lightboxes sont fonctionnels
    document.addEventListener('DOMContentLoaded', function () {
        fullscreenLightbox();
    })
    

} catch (error) {
    
}