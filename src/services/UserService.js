import {ACCESS_TOKEN} from "../constants";
import {getDataFromBody, invokeGet, invokePost} from "../utils/InvokeApi";
import {errorNotify} from "../utils/Notification";

const loginFail = error => {
    let errorMessage = null;
    if (error.response.status === 401) {
        
        errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng'
    }
    errorNotify(errorMessage);
    return Promise.reject(error);
}

const loginSuccess = (data, headers) => {
    const token = headers.authorization.replace('Bearer ','');
    localStorage.setItem(ACCESS_TOKEN, token);
    return Promise.resolve();
}

export function login(loginRequest) {
    return invokePost('/api/auth', JSON.stringify(loginRequest), loginSuccess, loginFail)
}

export function getCurrentUser() {
    return invokeGet('/api/user/me', getDataFromBody);
}

export function createUser(param){
    return invokePost('/api/user/signup', JSON.stringify(param), loginSuccess, loginFail)
}