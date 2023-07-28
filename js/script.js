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
function autoForm(){
    let ref = document.querySelector('#reference').textContent;
    let refPhoto = document.querySelector('.ref-photo');
    refPhoto.setAttribute('value', ref);
}
if(contactButton != null){
contactButton.addEventListener('click', autoForm);
}
if(document.querySelector('#reference').textContent != null){
    contact.addEventListener('click', autoForm);
}

