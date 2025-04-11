import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';

import { OrderService } from 'src/app/service/order.service';
import { DateRangeComponent } from './date-range';
import { MatFormFieldModule } from '@angular/material/form-field'; 

import { selectedClass } from 'src/app/service/selectedClass';
import { DatePipe } from '@angular/common';
import { OrderClass } from 'src/app/service/orderClass';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
orderId: any;
  vendorid: any;
  fromdate: any;
  todate: any;
applyFilter($event: KeyboardEvent) {
throw new Error('Method not implemented.');
}
  selectedStatus: any;
statusList: string[]=['New','Shipped','Delivered','Packed'];
  RetailerDetails: any[]=[];
  completeDetails: any[]=[];



  constructor(private service:OrderService,private routes:Router,private dialog:MatDialog,private datePipe: DatePipe){}
  ngOnInit(): void {
    
 this.service.getWarehouseList().subscribe(res=>{
           this.warehouse=res;
           this.warehouse=this.warehouse.data;
           console.log(this.warehouse);


 })
  //this.getsevendays();
  }
  selectedWareHouse:any;
  startDate:any;
  endDate:any;
  allProduct:selectedClass[]=[];
  order:any[]=[];
  showOrders:any[]=[];
  orderStatusDetails:any;
  orderVal:OrderClass | undefined;
  warehouse:any;

  onSelectionChange($event: MatSelectChange){

     
    this.order.splice(0,(this.order.length))
      this.service.getAll($event.value).subscribe((res:any)=>{
       
      this.orderStatusDetails=res.data;
      this.orderStatusDetails.forEach((val: any)=>{

          this.order.push(val);
          console.log(val)


        })

        this.showOrders=this.order;
        console.log(this.order,this.showOrders)
        this.getRetailerDetails()
     })

     
      
    }
    onStatusChange($event: MatSelectChange) {
      this.showOrders = []; // Clear the current displayed orders
      this.order.forEach(orderVal => {
        if ($event.value === orderVal.orderStatus) {
          this.showOrders.push(orderVal);
        }
      });
  this.getRetailerDetails()
    }
  getRetailerDetails(){
     
    this.showOrders.map(val=>{
      
    
          this.service.getRetailerDetails(val.vendorId).subscribe((res:any)=>{
            this.RetailerDetails.push(res.data);
            console.log(this.RetailerDetails)
            this.mergeArray();
            })
            
           
        })
       
       
   }
mergeArray(){

  this.completeDetails = this.showOrders.map(order => {
    console.log(order.userId)
    const retailer = this.RetailerDetails.find(retailer => order.userId == retailer.retailerId); 
       console.log(order)
       console.log(retailer)

    return { ...order, ...retailer };
  })
  console.log(this.completeDetails)
  }

getorderdetails(){
  this.service.getorderdetails(291351,this.fromdate,this.endDate).subscribe((res:any)=>{
    this.orderVal=res.data;
    console.log(this.orderVal)
  })

}
getsevendays(){
  this.service.getsevendaysorderdetails(291351,this.getSevenDaysBackDate()).subscribe((res:any)=>{
    this.orderVal=res.data;
    console.log(this.orderVal)
  })
}
// getSevenDaysBackDate(): DatePipe {
//   const currentDate = new Date(); // Get the current date
//   const sevenDaysBackDate = new Date(currentDate); // Create a new date object initialized with the current date

//   // Use setDate() method to subtract 7 days from the current date
//   sevenDaysBackDate.setDate(currentDate.getDate() - 7);

//   return this.datePipe.transform(sevenDaysBackDate, 'yyyy-MM-dd HH:mm:ss.SSSSSS');
//   }

getSevenDaysBackDate(): string {
  const currentDate = new Date(); // Get the current date
  const sevenDaysBackDate = new Date(currentDate); // Create a new date object initialized with the current date

  // Use setDate() method to subtract 7 days from the current date
  sevenDaysBackDate.setDate(currentDate.getDate() - 7);

  return this.datePipe.transform(sevenDaysBackDate, 'yyyy-MM-dd HH:mm:ss.SSS') || '';
}
}





