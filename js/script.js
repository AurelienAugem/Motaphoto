let formulaire = document.querySelector('.formulaire-contact');
let contact = document.querySelector('#menu-item-26 a');
let contactButton = document.querySelector('.post-contact');
let ref = document.querySelector('#reference').textContent;
let refPhoto = document.querySelector('.ref-photo');
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
contactButton.addEventListener('click', showForm);

//Préremplissage du formulaire 
function autoForm(){
    refPhoto.setAttribute('value', ref);
}
contactButton.addEventListener('click', autoForm);


