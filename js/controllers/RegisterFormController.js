import BaseController from './BaseController.js';
import userService from '../services/UserService.js';

export default class RegisterFormController extends BaseController {

    constructor(element) {
        super(element);
        this.attachEventListener();
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

                await userService.registerUser(user);
                window.location.href = '/login.html?register=ok';
            } catch (error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });

        this.element.querySelectorAll('input').forEach(input => {
            const registerButton = this.element.querySelector('.register');
            input.addEventListener('keyup', event => {
                if (input.validity.valid) {
                    input.classList.add('is-success');
                    input.classList.remove('is-danger');
                } else {
                    input.classList.remove('is-success');
                    input.classList.add('is-danger');
                }

                if (this.element.checkValidity()) {
                    registerButton.removeAttribute('disabled');
                } else {
                    registerButton.setAttribute('disabled', true);
                }
            });

            const toLoginButton = this.element.querySelector('.toLogin');
            toLoginButton.addEventListener('click', event => {
                window.location.href = '/login.html';
            });
        });
    }
}