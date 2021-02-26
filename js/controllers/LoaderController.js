import BaseController from './BaseController.js';

export default class LoaderController extends BaseController {

    constructor(element) {
        super(element);
        this.subscribe(this.events.START_LOADING, () => {
            this.showLoader();
        });
        this.subscribe(this.events.FINISH_LOADING, () => {
            this.hideLoader();
        });
    }

    showLoader() {
        this.element.classList.remove('hidden');
    }

    hideLoader() {
        this.element.classList.add('hidden');
    }
}