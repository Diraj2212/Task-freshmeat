import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/service/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { sales } from '../../models/sale';


@Component({
  selector: 'app-sales',
  templateUrl: './salesorder.component.html',
  styleUrls: ['./salesorder.component.css']
})
export class SalesorderComponent implements OnInit  {
  
  OrderId: any= "";
    OrderDate: string = "";
    RetailerName: string = "";
    RetailerAddress: string = "";
    RetailerContactNo: string = "";
    RetailerEmailId: string = "";
    sales: sales = new sales();

  dataSource = [];
    displayedColumns = 
   ["slNo",
   "productId",
   "productName",
    "categoryName",
    "QuentitySize",
    "QuentityOrder",
    "Quentitydelivered",
    "unitPrice",
    "discountAmount",
    "discountedPrice",
    "Amount",
  ];
  data: any;
  editdata: any;
  clicked: any;
  list: any;
  sort: any;
  paginator: any;
  editable: any;
  includeTable = true; 
   OrderDetails: any;
   
   
   exportToPdf() {
     let data = document.getElementById('contentToConvert')!;
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'cm', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 1, width, height);
      pdf.save('salesorder.pdf');
    });
  }
  



 
  constructor(private builder: FormBuilder, private activatedRoute:ActivatedRoute , 
    private service: OrderService, private dialog:MatDialog,
    ){}
  ngOnInit(): void {
    this.OrderId=this.activatedRoute.snapshot.paramMap.get('id');
    this.getDetails(this.OrderId);
 
   }
   getDetails(id:any){
       
          
    if( this.data.id !='' && this.data.id !=null){
      this.service.getOrderDetails(id).subscribe((response: any) =>{
        console.log(response)

      
         
         this.editdata = response;
         this.editdata = this.editdata.data
         console.log("this is edit data : " + this.editdata.genderId)
         this.OrderId.setValue({basicInfoForm:{
           OrderId:this.editdata.orderId, 
           OrderDate:this.editdata.orderDate,
           
           consumerAddress:this.editdata.consumerAddress,
           consumerMobileNumber:this.editdata.consumerMobileNumber,
           consumerEmailId:this.editdata.consumerEmailId,
          
       }
       });
   
     })
     this.OrderId = this.builder.group({
       basicInfoForm : this.builder.group({    
        OrderId: new FormControl({value:'',  disabled: true}),
       
        consumerAddress: new FormControl({value:'',  disabled: true}),
        consumerMobileNumber: new FormControl({value:'',  disabled: true}),
        consumerEmailId: new FormControl({value:'',  disabled: true}),
        
         
         
   
       }),
      })
      this.service.getOrderDetails(id).subscribe((response: any) =>{
        console.log(response)
        this.list = { ...response };
        //console.log(this.list);
        this.list = this.list.data;
        //console.log(this.list);
        this.data = new MatTableDataSource<sales>(this.list);
       //console.log(this.dataSource);
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
      
        });

      
         
 

}





}


}