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
if(contactButton != null){
    contactButton.addEventListener('click', showForm);
}

//Préremplissage du formulaire
let ref = document.querySelector('#reference');
function autoForm(){
    let refPhoto = document.querySelector('.ref-photo');
    refPhoto.setAttribute('value', ref.textContent);
}
if(contactButton !== null){
contactButton.addEventListener('click', autoForm);
}
if(ref !== null){
    contact.addEventListener('click', autoForm);
} else {
    console.log('Pas de référence sur cette page');
}

//Gestion des filtres 
let btnCat = document.querySelector('#btn-categorie');
let btnForm = document.querySelector('#btn-format');
let btnTri = document.querySelector('#btn-tri');

if(btnCat !== null && btnForm !== null && btnTri !== null){
    let menuCat = document.querySelector('#menu-categorie');
    let menuFormat = document.querySelector('#menu-format');
    let menuTri = document.querySelector('#menu-tri');
    
    function showFilter(btn,menu){
        let btnParent = btn.parentNode;
        let btnGrandParent = btnParent.parentNode;
        if(menu.classList.contains('filter-hide')){
            btnGrandParent.style.setProperty('border-color','#215aff');
            btnGrandParent.style.setProperty('border-radius','8px 8px 0 0');
            btn.style.setProperty('--rotate','270deg');
            menu.classList.remove('filter-hide');
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

} else {
    console.log('Pas de filtres sur cette page');
}
