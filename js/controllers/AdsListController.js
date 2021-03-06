import BaseController from './BaseController.js';
import adService from '../services/AdService.js';
import { adView } from '../views/AdView.js'

export default class AdsListController extends BaseController {

    constructor(element) {
        super(element);
    }
    
    async loadAds() {
        try {
            this.publish(this.events.START_LOADING);
            const ads = await adService.getAds();
            if (ads.length > 0) {
                this.render(ads);
            } else {
                this.publish(this.events.NO_ADS);
            }            
        } catch (error) {
            this.publish(this.events.ERROR, error);
            this.publish(this.events.NO_ADS);
        } finally {
            this.publish(this.events.FINISH_LOADING);
        }
        
    }

    render(ads) {
        this.element.innerHTML = '';
        for (const ad of ads) {
            const AD = document.createElement('article');
            AD.addEventListener('click', event => {
                window.location.href = '/ad-detail.html?id=' + ad.id;
            });
            AD.innerHTML = adView(ad, this.status);
            this.element.appendChild(AD);
        }
    }
}