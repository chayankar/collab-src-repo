import { Commodity, CommodityExcelFormat } from './../inventory.model';
import { Component, OnInit, ViewChild } from '@angular/core';

import * as Excel from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-import-commodity',
  templateUrl: './import-commodity.component.html',
  styleUrls: ['./import-commodity.component.css']
})
export class ImportCommodityComponent implements OnInit {

  isUploadedFileValid: boolean;
  workbook: Excel.WorkBook;
  commodityList: Commodity[] = [];
  @ViewChild('fileInput') fileInput: HTMLElement;

  constructor() {
  }

  ngOnInit(): void {
  }

  handleFileInput(event) {
    debugger;
    const excelFile: File = event.target.files[0];
    this.readExcel(excelFile);
  }

  readExcel(excelFile: File) {
    const readFile = new FileReader();
    readFile.onload = (e) => {
      debugger;

      const rawData: any = readFile.result;
      const encodedData = new Uint8Array(rawData);
      const arr = new Array();
      for (let i = 0; i !== encodedData.length; ++i) {
        arr[i] = String.fromCharCode(encodedData[i]);
      }
      const binaryData = arr.join('');
      this.workbook = Excel.read(binaryData, { type: 'binary' });

      this.extractFileData();
    }
    readFile.readAsArrayBuffer(excelFile);
  }

  extractFileData() {
    const w = this.workbook;
    const sheetNames: string[] = this.workbook.SheetNames;

    sheetNames.forEach(sheetName => {
      const sheet = this.workbook.Sheets[sheetName];
      const range = Excel.utils.decode_range(sheet['!ref']);

      const commodities: CommodityExcelFormat[] = Excel.utils.sheet_to_json<CommodityExcelFormat>(sheet);

      for (let index = 0; index < commodities.length; index++) {
        const commodity: Commodity = new Commodity();
        commodity.name = commodities[index].Name;
        commodity.price = commodities[index].Price;
        commodity.unit = commodities[index].Unit;
        commodity.seller = commodities[index].Seller;
        commodity.brand = commodities[index].Brand;
        commodity.type = sheetName;

        this.commodityList.push(commodity);
      }
      debugger;
    });
  }
}
