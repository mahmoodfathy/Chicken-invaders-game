var clicked = false;
localStorage.setItem("clicked", clicked);

var demoContainer = document.querySelector('.demo-container');
var backdrop, modal;

function closeModal(){
  if (backdrop) {
    backdrop.remove();
  }

  if (modal) {
    modal.remove();
  }
}

document.addEventListener('keydown', function(e) {
  if(e.key == "Escape"){
    if(clicked){
      closeModal()
    }
    if(!clicked){
      backdrop = document.createElement('div');
      backdrop.classList.add('backdrop');
      document.body.insertBefore(backdrop, demoContainer);
    
      modal = document.createElement('div');
      modal.classList.add('modal');
    
      var modalHeading = document.createElement('h1');
      modalHeading.textContent = 'You sure you want to be a chicke- I mean, are you sure you want to quit?';
      modal.appendChild(modalHeading);
    
      var imag = document.createElement('img');
      imag.src = "modal_chic.jpg";
      imag.width = 200
      modal.appendChild(imag);
    
      var modalActionsContainer = document.createElement('div');
      // modalActionsContainer.classList.add('modal-actions');
      modal.appendChild(modalActionsContainer);
    
      var cancelButton = document.createElement('button');
      cancelButton.setAttribute('type', 'button');
      cancelButton.classList.add('btn-cancel');
      cancelButton.textContent = 'Confirm';
      cancelButton.addEventListener('click', closeModal);
      modalActionsContainer.appendChild(cancelButton);
    
      var confirmButton = document.createElement('button');
      confirmButton.setAttribute('type', 'button');
      confirmButton.classList.add('btn-confirm');
      confirmButton.textContent = 'Quit';
      confirmButton.addEventListener('click', function() {
        closeModal();
      });
      modalActionsContainer.appendChild(confirmButton);
    
      document.body.insertBefore(modal, demoContainer);
    }  
    clicked = !clicked
  }
});

document.addEventListener("keydown", function g(e){console.log(e.key);});

