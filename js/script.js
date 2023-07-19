let formulaire = document.querySelector('.formulaire-contact');
let contact = document.querySelector('#menu-item-26 a');
formulaire.classList.add('hide');

//Affichage du formulaire de contact
function showForm() {
    if(formulaire.classList.contains("hide")){
        formulaire.classList.add('form-animation');
        formulaire.classList.add('show');
        formulaire.classList.remove('hide');
    }else if(formulaire.classList.contains("show")){
        formulaire.classList.remove('form-animation');
        formulaire.classList.add('hide');
        formulaire.classList.remove('show');
    }  
}
contact.addEventListener('click', showForm);

