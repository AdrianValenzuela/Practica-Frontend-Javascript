import AdDetailController from './controllers/AdDetailController.js';

window.addEventListener('DOMContentLoaded', async event => {
    const adDetailController = document.querySelector('.details');
    new AdDetailController(adDetailController);
});