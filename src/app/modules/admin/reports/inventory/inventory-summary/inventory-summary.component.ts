import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryService } from 'src/app/service/inventory.service';
import * as XLSX from 'xlsx';
import { inventory } from '../../../models/inventory';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';


interface Product {
slNo: any;
QtyAvailable: any;
BatchNo: any;
Location: any;
MfgDate: any;
ExpDate: any;
PurchasePrice: any;
FreshMeatDiscount: any;
MyDiscount: any;
SellingPrice: any;
  srNo: number;
  category: string;
  productName: string;
}

@Component({
  selector: 'app-inventory-summary',

  templateUrl: './inventory-summary.component.html',
  styleUrl: './inventory-summary.component.css'
})
export class InventorySummaryComponent implements OnInit {
  // Define displayed columns for the table
  displayedColumns: string[] = ['slNo', 'category', 'productName', 'QtyAvailable', 'BatchNo', 'Location', 'MfgDate', 'ExpDate', 'PurchasePrice', 'FreshMeatDiscount', 'MyDiscount', 'SellingPrice'];

  // Define dataSource array to hold product data
  dataSource = new MatTableDataSource<inventory>();

  element_data: inventory[] = [];
  createdDate: any;
  storeId: any;
  productId: any;
  categoriesId: any;

  editdata: any;

  list: any;

  // Reference to the table element
  @ViewChild('tableData', { static: true }) tableData: ElementRef | undefined;
  paginator: any;
  sort: any;

  // Inject HttpClient in the constructor
  constructor(private http: HttpClient,private api:InventoryService,@Inject(MAT_DIALOG_DATA) private data: any,private formBuilder: FormBuilder) {
    this.tableData = undefined; // Providing a default value
    this.createdDate=this.data.createdDate
    this.storeId=this.data.storeId
    this.productId=this.data.productId
    this.categoriesId=this.data.categoriesId
  }

 

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const params = new HttpParams()
      .set('createdDate', this.createdDate)
      .set('storeId', this.storeId)
      .set('productId', this.productId)
      .set('categoriesId', this.categoriesId);


    this.api. ViewInventoryDetails(this.createdDate,this.storeId,this.productId,this.categoriesId).subscribe((Response)=>{
      this.editdata=Response 
      this.list=Response.editdata
      this.dataSource=new MatTableDataSource<inventory>(this.list)


      this.Updateinventory.patchValue({
        categories_id: Response.data.categories_id,
        productName: Response.data.productName,
        available_quantity: Response.available_quantity,
        created_date: Response.data.created_date,
        expiry_date: Response.data.expiry_date,
        sub_categories_id: Response.sub_categories_id,
        purchase_price: Response.data.purchase_price,
        my_discount: Response.data.my_discount,
        selling_price: Response.data.selling_price,
       
      });
      this.dataSource = new MatTableDataSource(this.editdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.list);
    });
}

Updateinventory = this.formBuilder.group({
  categories_id: new FormControl('', Validators.required),
  productName: new FormControl('', Validators.required),
  available_quantity: new FormControl('', Validators.required),
  created_date: new FormControl('', Validators.required),
  expiry_date: new FormControl('', Validators.required),
  sub_categories_id: new FormControl('', Validators.required),
  purchase_price: new FormControl('', Validators.required),
  my_discount: new FormControl('', Validators.required),
  selling_price: new FormControl('', Validators.required),
 
  });

  



  // Default name for Excel file
  filename = "ExcelSheet.xlsx";

  exportexcel() {
    // Get the table element reference using ViewChild
    const tableDataElement: HTMLTableElement = this.tableData!.nativeElement;
    // Convert the table to a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableDataElement);
  
    // Generate a Workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook to file
    XLSX.writeFile(wb, this.filename);
  }
  printTable() {
    // Get the table element reference using ViewChild
    const tableDataElement: HTMLTableElement = this.tableData!.nativeElement;
    // Create a new window
    const printWindow = window.open('', '_blank');
    // Write the HTML content of the table to the new window
    printWindow?.document.write(tableDataElement.outerHTML);
    // Call the print function of the new window
    printWindow?.print();
  }

  

}
