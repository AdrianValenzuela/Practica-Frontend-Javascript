import pubSub from '../services/Pubsub.js';

export default class BaseController {
    
    constructor(element){
        this.element = element;
        this.pubSub = pubSub;
        this.events = {
            START_LOADING: 'startLoading',
            FINISH_LOADING: 'finishLoading',
            ERROR: 'error',
            LOAD_DETAILS: 'loadDetails'
        };
        this.status = {
            0: "On Sale",
            1: "Wanted",
            2: "Reserved",
            3: "Sold"
        };
    }

    subscribe(eventName, eventHandler) {
        this.pubSub.subscribe(eventName, eventHandler);
    }

    publish(eventName, eventData) {
        this.pubSub.publish(eventName, eventData);
    }
    
}