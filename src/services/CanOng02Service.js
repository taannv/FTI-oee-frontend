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

export function getDataCanOng02(){
    return invokeGet('/api/canong02/list',getDataFromBody);
}

export function getDataProductionOrderCanOng02(page){
    return invokeGet('/api/canong02/production',getDataFromBody);
}

export function reportC2(params) {
    return invokeGetParams('/api/reports/time/produced/canOng02',params,getDataFromBody);
}

export function reportErrorC2(params) {
    return invokeGetParams('/api/reports/canong02/errors',params,getDataFromBody);
}

export function reportProductionOrdersC2(params) {
    return invokeGetParams('/api/reports/canong02/production/orders',params,getDataFromBody);
}

export function getStatusCanOng02(){
    return invokeGet('/api/canong02/status',getDataFromBody);
}

export function getSpeedCanOng02(){
    return invokeGet('/api/canong02/speed',getDataFromBody);
}