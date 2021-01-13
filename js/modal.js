var demoContainer = document.querySelector('.demo-container');
var backdrop;
var modal;

function closeModal(){
  if (backdrop) {
    backdrop.remove();
  }

  if (modal) {
    modal.remove();
  }
}
clicked = false;

document.addEventListener('keydown', function(e) {
  if(e.key == "Escape" && clicked){
    console.log("TEST");
    closeModal()
    }
  if(e.key == "Escape" && !clicked){
    console.log("WOWO");
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
  clicked=!clicked;

  //   textEdit.value = quote;
});

document.addEventListener("keydown", function g(e){console.log(e.key);});