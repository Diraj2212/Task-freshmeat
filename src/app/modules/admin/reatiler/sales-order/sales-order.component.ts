import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RetailerOrderService } from 'src/app/service/RetailerOrderService';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from "html2canvas";

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrl: './sales-order.component.css'
})
export class SalesOrderComponent implements OnInit {


constructor(private builder:FormBuilder,private activatedRouter: ActivatedRoute,private service: RetailerOrderService,){};
ngOnInit(): void {
  this.orderId = this.activatedRouter.snapshot.paramMap.get('orderId');
  this.customerId = this.activatedRouter.snapshot.paramMap.get('customerId')
  this.getDetails(this.orderId);
  console.log(jsPDF);
console.log(autoTable);
  
}
orderId!:any;
dataSource!: any;
displayedColumns: string[] = [ "productName", "categoryName", "quantity","unitPrice","discount","myDiscount","discountedPrice","totalPrice"];
customerId: any;
CustomerDetails!: any;
OrderDetails: any;
ProductDetails: any[] = [];
subCategoryDetails: any[] = [];
completeProductDetails: any[] = [];
totalAmount:number=0;
tableData:[][]=[[]];
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
SalesOrderForm=this.builder.group({

  orderId:new FormControl('',Validators.required),
  date:new FormControl('',Validators.required),
  customerName:new FormControl('',Validators.required),
  mobileNumber:new FormControl('',Validators.required),
  emailId:new FormControl('',Validators.required),
  address:new FormControl('',Validators.required),
  orderType:new FormControl('',Validators.required),
  paymentMode:new FormControl('',Validators.required),
  orderStatus:new FormControl('',Validators.required),
  totalPrice:new FormControl('',Validators.required)
});

getDetails(id: string) {
  this.service.getCustomerDetails(this.customerId).subscribe((response: any) => {
    this.CustomerDetails = response.data;
    console.log(this.CustomerDetails)
  })
  this.service.getProductDetails(this.orderId).subscribe((response: any) => {
    this.ProductDetails = response.data;
    console.log(this.ProductDetails)
  })
  this.service.getOrderDetails(this.orderId).subscribe((response: any) => {
    this.OrderDetails = response.data;
    console.log(this.OrderDetails,this.OrderDetails.paymentMode)
  })
  this.service.getSubCategoryDetails().subscribe((response: any) => {
    this.subCategoryDetails = response.data;
    console.log(this.subCategoryDetails)
    this.mergeArray();
  })
}

mergeArray() {
  this.completeProductDetails = this.ProductDetails.map(category => {
    const subDetails = this.subCategoryDetails.find(sub => category.subCategoriesId == sub.subCategoriesId);
    
    const subTotalPrice = subDetails.price * category.quantity;
    console.log(subDetails , category.quantity)
    console.log(subTotalPrice)  
    this.totalAmount+=subTotalPrice;
    const quantity=category.quantity;
   
     // Calculate total price for each product
    
    return { ...category, ...subDetails, subTotalPrice,quantity };
  })
  console.log(this.completeProductDetails)
  this.dataSource = new MatTableDataSource(this.completeProductDetails);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

generatePDF() {
  let data = document.getElementById("table1")!;
  html2canvas(data).then((canvas) => {
    const contentDataURL = canvas.toDataURL("image/png");
    let pdf = new jsPDF("p", "cm", "a4");
    var width = pdf.internal.pageSize.getWidth();
    console.log(width)
    var height = (canvas.height * width) / canvas.width;
    pdf.setFontSize(30);
    pdf.text('Sales Order Details',5,1);
    pdf.setFontSize(24);
    pdf.text('Order Details :-',1,3);
    pdf.text('Customer Details :-',10,3);
    pdf.setFontSize(12);
    pdf.text(`Order Id : ${this.OrderDetails.orderId}`,1,4);
    pdf.text(`Order Date : ${this.OrderDetails.createdDate}`,1,5);
    pdf.text(`Order Type : ${this.OrderDetails.orderType}`,1,6);
    pdf.text(`payment Mode : ${this.OrderDetails.paymentMode}`,1,7);
    pdf.text(`Customer Name : ${this.CustomerDetails.firstName}`,10,4);
    pdf.text(`Customer MobileNumber : ${this.CustomerDetails.mobileNumber}`,10,5);
    pdf.text(`Customer Email : ${this.CustomerDetails.emailId}`,10,6);
    pdf.text(`Customer Address : ${this.OrderDetails.destination}`,10,7);
    pdf.addImage(contentDataURL, "PNG", 0,12, width, height);
    pdf.save("salesorder.pdf");
  });


}
}



