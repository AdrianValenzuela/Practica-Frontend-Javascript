const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token';

export default {

    post: async function(url, RQ, json = true) {
        return await this.request('POST', url, RQ, json);
    },

    request: async function(method, url, RQ, json = true) {
        const configRequest = {
            method: method,
            headers: {},
            body: null
        };

        if (json) {
            configRequest.headers['Content-Type'] = 'application/json';
            configRequest.body = JSON.stringify(RQ);
        }
        else {
            configRequest.body = RQ;
        }

        const token = await this.getToken();
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

    registerUser: async function (user) {
        const url = `${BASE_URL}/auth/register`;
        return await this.post(url, user);
    },

    login: async function (user) {
        // POST sparrest -> /auth/login
        const url = `${BASE_URL}/auth/login`;
        return await this.post(url, user);
    },

    saveToken: async function(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    deleteToken: async function() {
        localStorage.removeItem(TOKEN_KEY);
    },

    getToken: async function() {
        return localStorage.getItem(TOKEN_KEY);
    },

    getUser: async function() {
        try {
            const token = await this.getToken();
            const tokenSplit = token.split('.');

            if (tokenSplit.length !== 3) {
                return null;
            }
        
            const payload = tokenSplit[1];
            const jsonStr = atob(payload);
            const { userId, username } = JSON.parse(jsonStr);
            return { userId, username };   
        } catch (error) {
            return null;
        }
    },

    isUserLogged: async function() {
        const token = await this.getToken();
        return token !== null;
    }
}