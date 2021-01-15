let demoContainer = document.querySelector('.wrap'), backdrop, modal;

function closeModal(){
  if (backdrop) {
    backdrop.remove();
  }

  if (modal) {
    modal.remove();
  }
}

function create_backdrop(){
  backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');
  document.body.insertBefore(backdrop, demoContainer);
}

function add_modalContent(){
  modal = document.createElement('div');
  modal.classList.add('modal');
  var modalHeading = document.createElement('h1');
  modalHeading.textContent = 'Game paused. Are you sure you want to quit?';
  modal.appendChild(modalHeading);

  var imag = document.createElement('img');
  imag.src = "Images/modal_chic.jpg";
  imag.width = 200;
  modal.appendChild(imag);
}


function add_ActionButtons(){
  var modalActionsContainer = document.createElement('div');
  // modalActionsContainer.classList.add('modal-actions');
  modal.appendChild(modalActionsContainer);
  buttons = {b2:['btn-cancel', 'Quit', quit], b1: ['btn-resume', 'Resume', resume]}
  for(i in buttons){
    var b = document.createElement('button')
    b.setAttribute('type', 'button');
    b.classList.add(buttons[i][0]);
    b.textContent = buttons[i][1];
    b.addEventListener('click', buttons[i][2]);
    modalActionsContainer.appendChild(b);
  }
}

function quit(){
  PAUSE=!PAUSE;
  closeModal();
  LASER_MAX_SPEED = 0;
  ENEMY_X=0;
  ENEMY_Y=0;
  window.location.replace("index.html");
}

function resume(){
  closeModal()
  console.log("Resume clicked");
  PAUSE=!PAUSE
  LASER_MAX_SPEED = 200
  ENEMY_X=50
  ENEMY_Y=10
  PLAYER_MAX_SPEED = 600
}

document.addEventListener('keydown', function(e) {
  if(e.key == "Escape" || e.code == 27){
    if(PAUSE){
      closeModal()
      LASER_MAX_SPEED = 200
      ENEMY_X=50
      ENEMY_Y=10
      PLAYER_MAX_SPEED = 600
    }
    if(!PAUSE){
      create_backdrop()
      add_modalContent()
      add_ActionButtons()
      LASER_MAX_SPEED = 0
      ENEMY_X=0
      ENEMY_Y=0
      PLAYER_MAX_SPEED = 0
      document.body.insertBefore(modal, demoContainer);
    }
    PAUSE = !PAUSE
  }
}
);

