import BaseController from "./BaseController.js";
import adService from "../services/AdService.js";
import userService from "../services/UserService.js";

export default class NewAdController extends BaseController {

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
    }

    async checkIfUserIsLogged() {
        const userIsLogged = await userService.isUserLogged();
        if (!userIsLogged) {
            window.location.href = '/login.html?next=/new-ad.html';
        }
        else {
            this.publish(this.events.FINISH_LOADING);
        }
    }

    attachEventListeners() {
        this.element.querySelectorAll('input').forEach(input => {
            const newAdButton = this.element.querySelector('.button');
            input.addEventListener('keyup', event => {
                if (input.validity.valid) {
                    input.classList.add('is-success');
                    input.classList.remove('is-danger');
                } else {
                    input.classList.remove('is-success');
                    input.classList.add('is-danger');
                }

                if (this.element.checkValidity()) {
                    newAdButton.removeAttribute('disabled');
                } else {
                    newAdButton.setAttribute('disabled', true);
                }
            });
        });

        this.element.addEventListener('submit', async event => {
            event.preventDefault();
            const ad = {
                ad: this.element.elements.name.value,
                price: this.element.elements.price.value,
                status: parseInt(this.element.elements.status.value),
                photo: null,
                createdAt: new Date().toLocaleString()
            }

            if (this.element.elements.file.files.length > 0) {
                ad.photo = this.element.elements.file.files[0];
            }

            this.publish(this.events.START_LOADING);
            try {
                await adService.saveAd(ad);
                window.location.href = '/?created=ok';
            } catch (error) {
                this.publish(this.events.ERROR, error);
            } finally {
                this.publish(this.events.FINISH_LOADING);
            }
        });
        
    }
}