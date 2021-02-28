import BaseController from './BaseController.js';
import DeleteAdController from './DeleteAdController.js';
import { adDetailView } from '../views/AdDetailView.js';
import AdService from '../services/AdService.js';

export default class AdDetailController extends BaseController {

    constructor(element) {
        super(element);
        this.getAdFromUrl(window.location.search);
    }

    renderDetails(ad) {
        const container = document.createElement('div');
        container.innerHTML = adDetailView(ad, this.status);
        this.element.append(container);
        
        const deleteAdController = this.element.querySelector('.deleteButton');
        deleteAdController.addEventListener('click', event => {
            new DeleteAdController(deleteAdController, this.element, ad);
        });
    }

    async getAdFromUrl(url) {
        const urlParams = url.replace('?', '');
        const ulrParamsSplt = urlParams.split('=');
        const adId = ulrParamsSplt[1];
        const ad = await AdService.getAd(adId);
        this.renderDetails(ad);
    }
}