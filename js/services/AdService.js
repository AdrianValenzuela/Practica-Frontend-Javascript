import userService from './UserService.js';
const BASE_URL = 'http://127.0.0.1:8000';

function parseCustomAd(ad, currentUser) {
    return {
        id: ad.id,
        ad: ad.ad,
        price: ad.price,
        status: ad.status,
        tags: ad.tags,
        photo: ad.photo,
        createdAt: ad.createdAt,
        canBeUpdatedOrDeleted: currentUser ? currentUser.userId === ad.userId : false
    };
}

export default {

    getAd: async function(id) {
        const currentUser = await userService.getUser();
        const url = `${BASE_URL}/api/ads/${id}`;
        const response = await fetch(url);
        
        if (response.ok) {
            const data = await response.json();
            return parseCustomAd(data, currentUser);
        } else {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    },
    
    getAds: async function() {
        const currentUser = userService.getUser();
        const url = `${BASE_URL}/api/ads`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            return data.map(ad => {
                return parseCustomAd(ad, currentUser);
            });
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    post: async function(url, dataRQ, json = true) {
        return await this.request('POST', url, dataRQ, json);
    },

    delete: async function(url, dataRQ, json = true) {
        return await this.request('DELETE', url, dataRQ, json);
    },

    put: async function(url, dataRQ, json = true) {
        return await this.request('PUT', url, dataRQ, json);
    },

    request: async function(method, url, dataRQ, json = true) {
        const configRequest = {
            method: method,
            headers: {},
            body: null
        };

        if (json) {
            configRequest.headers['Content-Type'] = 'application/json';
            configRequest.body = JSON.stringify(dataRQ);
        }
        else {
            configRequest.body = dataRQ;
        }

        const token = await userService.getToken();
        if (token) {
            configRequest.headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(url, configRequest);
        const data = await response.json();
        if (response.ok) {
            return data;
        }
        else {
            throw new Error(data.message || JSON.stringify(data));
        }
    },

    saveAd: async function(ad) {
        const url = `${BASE_URL}/api/ads`;
        if (ad.photo) {
            const imageURL = await this.uploadImage(ad.photo);
            ad.photo = imageURL;
        } else {
            ad.photo = 'https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png';
        }

        return await this.post(url, ad);
    },

    uploadImage: async function(photo) {
        const url = `${BASE_URL}/upload`;
        const form = new FormData();
        form.append('file', photo);
        const response = await this.post(url, form, false);
        return response.path || null;
    },

    deleteAd: async function(ad) {
        const url = `${BASE_URL}/api/ads/${ad.id}`;
        return await this.delete(url);
    }
};