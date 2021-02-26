import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import AdsListController from './controllers/AdsListController.js';
import NewAdOrLoginController from './controllers/NewAdOrLoginController.js';
import LogoutController from './controllers/LogOutController.js';

window.addEventListener('DOMContentLoaded', async event => {
    const loader = document.querySelector('.lds-ring');
    new LoaderController(loader);

    const error = document.querySelector('.global-errors');
    new ErrorController(error);

    const ads = document.querySelector('.ads-list');
    const adsController = new AdsListController(ads);
    adsController.loadAds();

    const newAdOrLoginButotn = document.querySelector('.new-ad');
    new NewAdOrLoginController(newAdOrLoginButotn);

    const logoutButton = document.querySelector('.logoutButton');
    new LogoutController(logoutButton);
});