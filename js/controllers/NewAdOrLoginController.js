import userService from "../services/userService.js";
import BaseController from "./BaseController.js";

export default class NewAdOrLoginController extends BaseController {
    
    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
    }

    async checkIfUserIsLogged() {
        const userIsLogged = await userService.isUserLogged();
        if (userIsLogged) {
            const newAdButton = this.element.querySelector('.new-ad-button');
            newAdButton.classList.remove('is-hidden');
        } else {
            const loginOrRegisterButton = this.element.querySelector('.login-register-buttons');
            loginOrRegisterButton.classList.remove('is-hidden');
        }
    }
}