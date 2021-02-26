import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import LoginFormController from './controllers/LoginFormController.js';

window.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.lds-ring');
  new LoaderController(loader);

  const errorsElement = document.querySelector('.global-errors');
  new ErrorController(errorsElement);

  const registerCompletedMessage = document.querySelector('.registerCompleted');
  const formElement = document.querySelector('form');
  new LoginFormController(formElement, registerCompletedMessage);
});