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

export function getDataCanOng01(){
    return invokeGet('/api/canong01/list',getDataFromBody);
}

export function getDataProductionOrderCanOng01(page){
    return invokeGet('/api/canong01/production',getDataFromBody);
}

export function reportCO01(params) {
    return invokeGetParams('/api/reports/time/produced',params,getDataFromBody);
}

export function reportErrorCO01(params) {
    return invokeGetParams('/api/reports/canong01/errors',params,getDataFromBody);
}

export function reportProductionOrdersCO01(params) {
    return invokeGetParams('/api/reports/canong01/production/orders',params,getDataFromBody);
}

export function getStatusCanOng01(){
    return invokeGet('/api/canong01/status',getDataFromBody);
}

export function getSpeedCanOng01(){
    return invokeGet('/api/canong01/speed',getDataFromBody);
}