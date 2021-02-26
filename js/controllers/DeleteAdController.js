import BaseController from './BaseController.js';
import { ConfirmDeleteAdView } from '../views/ConfirmDeleteAdView.js';
import adService from '../services/AdService.js';

export default class DeleteAdController extends BaseController {

    constructor(element, parentElement, ad) {
        super(element);
        this.showConfirmation(parentElement, ad);
    }

    showConfirmation(parentElement, ad) {
        const confirmationMessage = document.createElement('div');
        confirmationMessage.innerHTML = ConfirmDeleteAdView;
        parentElement.append(confirmationMessage);
        this.attachEventListener(confirmationMessage, ad);
    }

    attachEventListener(confirmationMessage, ad) {
        const closeButton = confirmationMessage.querySelector('.delete');
        closeButton.addEventListener('click', event => {
            const notification = confirmationMessage.querySelector('.notification');
            notification.classList.add('is-hidden');
        });

        const cancelButton = confirmationMessage.querySelector('.cancelButton');
        cancelButton.addEventListener('click', event => {
            const notification = confirmationMessage.querySelector('.notification');
            notification.classList.add('is-hidden');
        });

        const deleteButton = confirmationMessage.querySelector('.deleteButton');
        deleteButton.addEventListener('click', async event => {
            await adService.deleteAd(ad);
            window.location.href = '/?deleted=ok';
        });

    }
};