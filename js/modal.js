var editValueButton = document.querySelector('button');
var demoContainer = document.querySelector('.demo-container');
var backdrop;
var modal;

var outputParagraph = document.querySelector('#quote');
// var textEdit = document.querySelector('.modal textarea');

var quote = 'A Modal Component on a Webpage - how hard could it be?';
var editedQuote = '';

function updateParagraph() {
  outputParagraph.textContent = quote;
}

function closeModal() {
  if (backdrop) {
    backdrop.remove();
  }

  if (modal) {
    modal.remove();
  }
}

updateParagraph();

editValueButton.addEventListener('click', function() {
  backdrop = document.createElement('div');
  backdrop.classList.add('backdrop');
  backdrop.addEventListener('click', closeModal);
  document.body.insertBefore(backdrop, demoContainer);
  backdrop.addEventListener('click', closeModal);

  modal = document.createElement('div');
  modal.classList.add('modal');

  var modalHeading = document.createElement('h1');
  modalHeading.textContent = 'Edit your Statement';
  modal.appendChild(modalHeading);

  var textEditContainer = document.createElement('div');
  textEditContainer.classList.add('modal-input');
  modal.appendChild(textEditContainer);

  var textEditArea = document.createElement('textarea');
  textEditArea.rows = '3';
  textEditArea.addEventListener('input', function() {
    editedQuote = textEditArea.value;
  });
  textEditArea.value = quote;
  textEditContainer.appendChild(textEditArea);

  var modalActionsContainer = document.createElement('div');
  modalActionsContainer.classList.add('modal-actions');
  modal.appendChild(modalActionsContainer);

  var cancelButton = document.createElement('button');
  cancelButton.setAttribute('type', 'button');
  cancelButton.classList.add('btn-cancel');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', closeModal);
  modalActionsContainer.appendChild(cancelButton);

  var confirmButton = document.createElement('button');
  confirmButton.setAttribute('type', 'button');
  confirmButton.classList.add('btn-confirm');
  confirmButton.textContent = 'Confirm';
  confirmButton.addEventListener('click', function() {
    closeModal();
    if (editedQuote.trim().length > 0) {
      quote = editedQuote;
      updateParagraph();
    }
  });
  modalActionsContainer.appendChild(confirmButton);

  document.body.insertBefore(modal, demoContainer);

  editedQuote = quote;
  //   textEdit.value = quote;
});