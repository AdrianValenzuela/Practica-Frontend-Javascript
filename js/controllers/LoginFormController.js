import RegisterFormController from "./RegisterFormController.js";
import userService from '../services/UserService.js';
import { RegisterCompletedView } from '../views/RegisterCompletedView.js';

export default class LoginFormController extends RegisterFormController {

    constructor(element, registerCompletedMessage) {
        super(element);
        this.attachEventListener();
        this.showRegisterCompletedView(registerCompletedMessage);
    }

    attachEventListener() {
        this.element.addEventListener('submit', async event => {
            try {
                event.preventDefault();
                this.publish(this.events.START_LOADING);
                const user = {
                    username: this.element.elements.email.value,
                    password: this.element.elements.password.value
                };

                const response = await userService.login(user);
                await userService.saveToken(response.accessToken);
                window.location.href = '/';
            } catch (error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });

        this.element.querySelectorAll('input').forEach(input => {
            const loginButton = this.element.querySelector('.login');
            input.addEventListener('keyup', event => {
                if (input.validity.valid) {
                    input.classList.add('is-success');
                    input.classList.remove('is-danger');
                }
                else {
                    input.classList.remove('is-success');
                    input.classList.add('is-danger');
                }

                if (this.element.checkValidity()) {
                    loginButton.removeAttribute('disabled');
                }
                else {
                    loginButton.setAttribute('disabled', true);
                }
            });

            const toRegisterButton = this.element.querySelector('.toRegister');
            toRegisterButton.addEventListener('click', event => {
                window.location.href = '/register.html';
            });
        });
    }

    showRegisterCompletedView(registerCompletedMessage) {
        const urlParams = window.location.search.replace('?', '');
        const ulrParamsSplt = urlParams.split('=');
        if (ulrParamsSplt.length === 2 && ulrParamsSplt[1] === 'ok') {
            registerCompletedMessage.innerHTML = RegisterCompletedView;
            registerCompletedMessage.classList.remove('hidden');
            setTimeout(() => {
                registerCompletedMessage.classList.add('hidden');
            }, 2000);   
        }        
    }
}