import {ACCESS_TOKEN} from '../constants';
import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

const request = (options, onSuccess, onFailure) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem(ACCESS_TOKEN);
    if(!!token) {
        headers['Authorization'] = 'Bearer ' + token;
        
    }

    return axios.request({
        url: options.url,
        method: options.method,
        headers: headers,
        data: options.body,
        params:options.params
    }).then(({data, headers}) => {
        if (onSuccess) {
            return onSuccess(data, headers);
        }
        return Promise.resolve;
    }).catch(error => {
         console.log(error);      
        if (onFailure) {
            return onFailure(error);
        }
        return Promise.reject(error);
    });
};

const getDataFromBody = data => data;

const invokeGet = (url, onSuccess, onFailure) => request({url, method: 'GET'}, onSuccess, onFailure);
const invokePost = (url, body, onSuccess, onFailure) => request({url, method: 'POST', body}, onSuccess, onFailure);
const invokeGetParams = (url,params, onSuccess, onFailure) => request({url, method: 'GET',params}, onSuccess, onFailure);

export {getDataFromBody, invokeGet, invokePost,invokeGetParams};

