import { Commodity, CommodityExcelFormat } from './../inventory.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as Excel from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-import-commodity',
  templateUrl: './import-commodity.component.html'
})
export class ImportCommodityComponent implements OnInit {

  isFileUploaded: boolean;
  workbook: Excel.WorkBook;
  commodityList: Commodity[] = [];
  public page: number;
  public pageSize: number;
  public collectionSize: number;

  @ViewChild('fileUpload') fileUpload: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  handleFileUpload(event) {
    // TODO: validate selected file
    const excelFile: File = event.target.files[0];
    this.readExcel(excelFile);
  }

  readExcel(excelFile: File) {
    const readFile = new FileReader();
    readFile.onload = (e) => {
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
      debugger;
      for (let index = 0; index < commodities.length; index++) {
        const commodity: Commodity = new Commodity();
        commodity.name = commodities[index].Name;
        commodity.price = commodities[index].Price;
        commodity.unit = commodities[index].Unit;
        commodity.seller = commodities[index].Seller;
        commodity.brand = commodities[index].Brand;
        commodity.type = commodities[index].Type;
        commodity.category = commodities[index].Category;
        commodity.quantity = commodities[index].Quantity;

        this.commodityList.push(commodity);
      }
    });

    this.page = 1;
    this.pageSize = 10;
    this.collectionSize = this.commodityList.length;
    this.isFileUploaded = true;
  }

  onPageChange(event) {
    this.page = event;
  }

  saveCommodities() {
    // TODO: save commodities in db
  }

  discardUpload() {
    this.fileUpload.nativeElement.value = null;
    this.isFileUploaded = false;
    this.workbook = null;
    this.commodityList = null;
  }
}
