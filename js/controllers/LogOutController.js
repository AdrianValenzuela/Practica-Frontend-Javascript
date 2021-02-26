import BaseController from './BaseController.js';
import userService from '../services/UserService.js';

export default class LogoutController extends BaseController {

    constructor(element) {
        super(element);
        this.attachEventListener();
    }

    attachEventListener() {
        this.element.addEventListener('click', async event => {
            await userService.deleteToken();
            window.location.href = '/login.html';
        });
    }
}