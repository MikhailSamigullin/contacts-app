import { createClient } from "../http/clientAPI";
//@ts-ignore
import * as FileSaver from 'file-saver';
//@ts-ignore
import * as XLSX from 'xlsx/xlsx.mjs';

// Create data for charts, which show how many clients have same discount.
export const createDataCliets = (client: { clients: { discount: any; }[]; }, data: { name: string; value: unknown; }[]) => {
  const discountArray: any[] = [];
  const counts: any = {};
  const dataArray: any = data;

  client.clients.forEach((item: { discount: any; }) => {
    discountArray.push(item.discount);
  })

  discountArray.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });

  const keys = Object.keys(counts);
  const values = Object.values(counts);

  keys.forEach((_item:any, i: any) => {
  dataArray.push({'name': keys[i], 'value': values[i]});
})  

  return dataArray;
}

// Generate colors for charts
export const generateColors = (number: number, colors: string[]) => {
  //@ts-ignore
  for (let i = 0; i < number; i++) {
    let array = makeId(6).split('');
    array.unshift('#');
    let string = array.join('');
    colors.push(string);
  }
  return colors;
}

export function makeId(length: number): string {
  let result = '';
  let characters = 'ABCDEF0123456789';
  const charactersLength: number = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    } 
    return result;
  }


export const addClients = (clients: any[]) => {
    
    clients.map((item) => {
      const formData = new FormData()
      formData.append('name', item.name)
      formData.append('discount', item.discount)
      formData.append('phone', item.phone)
      formData.append('email', item.email)
      formData.append('description', item.description)
      createClient(formData);
    })
}

export const exportToXlsx = (inputData: any, fileName: string) => {
  const fileType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension: string = '.xlsx';
  const dataToSheet = XLSX.utils.json_to_sheet(inputData);
  const dataTemplate = { Sheets: { 'data': dataToSheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(dataTemplate, { bookType: 'xlsx', type: 'array'});
  const data = new Blob([excelBuffer], {type: fileType});
  const date: string = `_${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}_`
  const time: string = `${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`
  FileSaver.saveAs(data, fileName + date + time + fileExtension);
}

export const normalizeDate = (date: string) => {
  return `${date.slice(11, 13)}.${date.slice(5, 7)}.${date.slice(0, 4)}`;
}

