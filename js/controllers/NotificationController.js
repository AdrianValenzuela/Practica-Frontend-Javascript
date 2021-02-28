import BaseController from './BaseController.js';

export default class NotificationController extends BaseController {

    constructor(element) {
        super(element);
        this.subscribe(this.events.NO_ADS, event => {
            this.showNotification();
        });
        this.subscribe(this.events.EXIST_ADS, event => {
            this.hideNotification();
        });
    }

    showNotification() {
        this.element.classList.remove('hidden');
    }

    hideNotification() {
        this.element.classList.add('hidden');
    }
}