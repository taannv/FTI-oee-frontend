import {getDataFromBody, invokeGet, invokePost,invokeGetParams} from "../utils/InvokeApi";
import {errorNotify} from "../utils/Notification";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export function getAll() {
    return invokeGet('/api/machines/all', getDataFromBody);
}

export function managed() {
    return invokeGet('/api/users/me/machines/manage', getDataFromBody)
}

export function queryHistoryError(machineId, page, fromDate, toDate) {
    return invokeGet('/api/machines/' + machineId
        + '/history-errors?page=' + page + "&fromDate=" + fromDate + "&toDate=" + toDate, getDataFromBody);
}

export function addErrorHistory(machineId, form) {
    return invokePost('/api/machines/' + machineId + '/history-errors', form);
}

export function getDataMachineSplit() {
    return invokeGet('/api/machinesplit/split',getDataFromBody);
}

export function getDataQuantityProduction() {
    return invokeGet('/api/Machinequantity/chart',getDataFromBody);
}

export function getDataProductionOrder() {
    return invokeGet('/api/machinesplit/production',getDataFromBody);
}
export function reportProduce(params) {
    return invokeGetParams('/api/reports/production',params,getDataFromBody);
}
export function reportProductionOrders(params) {
    return invokeGetParams('/api/reports/production/orders',params,getDataFromBody);
}
export function reportError(params) {
    return invokeGetParams('/api/reports/errors',params,getDataFromBody);
}

export function productionChart(params){
    return invokeGetParams('/api/reports/production/byMonth',params,getDataFromBody);
}
export function reportProductionVolume(params){
    return invokeGetParams('/api/reports/production/volume',params,getDataFromBody);
}

export function exportExcel(csvData,fileName) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}

export function getStatusMachine(){
    return invokeGet('/api/machine/status',getDataFromBody);
}

export function getSpeedMachine(){
    return invokeGet('/api/machine/speed',getDataFromBody);
}

export function deleteHandler(params){
    return invokePost('/api/user/deleteuser',JSON.stringify(params));
 }

 export function getListUser(page){
    return invokeGet('/api/user/listuser',getDataFromBody);
}

