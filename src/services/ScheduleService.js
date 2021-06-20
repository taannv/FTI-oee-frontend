import {getDataFromBody, invokeGet, invokePost,invokeGetParams} from "../utils/InvokeApi";

const failed = error => {
    return Promise.reject(error);
}

const success = (data) => {
    return Promise.resolve(data);
}

export function getScheduleList(){
    return invokeGet('/api/schedules',getDataFromBody);
}

export function addSchedule(form) {
    return invokePost('/api/schedules', form,success,failed);
}
export function updateSchedule(id,form){
    return invokePost('/api/schedules/'+id+'/edit', form,success,failed);
}
