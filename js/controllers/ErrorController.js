import BaseController from './BaseController.js';
import { ErrorView } from '../views/ErrorView.js';

export default class ErrorController extends BaseController {

    constructor(element) {
        super(element);
        this.subscribe(this.events.ERROR, (error) => {
            this.showError(error);
        });
    }

    showError(message) {
        this.element.innerHTML = ErrorView(message);
        this.element.classList.remove('hidden');
        this.element.addEventListener('click', event => {
            if (event.target == this.element || event.target.classList.contains('delete')) {
                this.element.classList.add('hidden');
            }
        });
    }
}