import {notification} from "antd";

const message = 'Monitor App';
const placement = 'bottomRight';

export function errorNotify(msg) {
    notification.error({
        message, placement,
        description: msg || 'Đã có lỗi xảy ra. Vui lòng liên hệ quản trị để được hỗ trợ!'
    });
}

export function okNotify(msg) {
    notification.success({
        message, placement,
        description: msg || 'Thành công!'
    });
}