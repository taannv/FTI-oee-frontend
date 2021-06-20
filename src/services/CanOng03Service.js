import {getDataFromBody, invokeGet, invokePost,invokeGetParams} from "../utils/InvokeApi";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export function exportExcel(csvData,fileName) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}

export function getDataCanOng03(){
    return invokeGet('/api/canong03/list',getDataFromBody);
}

export function getDataProductionOrderCanOng03(page){
    return invokeGet('/api/canong03/production',getDataFromBody);
}

export function reportC3(params) {
    return invokeGetParams('/api/reports/time/produced/canOng03',params,getDataFromBody);
}

export function reportErrorC3(params) {
    return invokeGetParams('/api/reports/canong03/errors',params,getDataFromBody);
}

export function reportProductionOrdersC3(params) {
    return invokeGetParams('/api/reports/canong03/production/orders',params,getDataFromBody);
}

export function getStatusCanOng03(){
    return invokeGet('/api/canong03/status',getDataFromBody);
}

export function getSpeedCanOng03(){
    return invokeGet('/api/canong03/speed',getDataFromBody);
}