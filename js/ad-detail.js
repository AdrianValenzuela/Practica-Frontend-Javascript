import AdDetailController from './controllers/AdDetailController.js';
import NotificationController from './controllers/NotificationController.js';

window.addEventListener('DOMContentLoaded', async event => {

    const notification = document.querySelector('.message');
    new NotificationController(notification);

    const adDetailController = document.querySelector('.details');
    new AdDetailController(adDetailController);
});