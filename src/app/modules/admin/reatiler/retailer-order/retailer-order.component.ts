// import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { RetailerOrderService } from 'src/app/service/RetailerOrderService';
// import { OrderClass } from 'src/app/service/orderClass';
// import { selectedClass } from 'src/app/service/selectedClass';
// import { DateRangeComponent } from './date-range/date-range.component';
// import { MatSelectChange } from '@angular/material/select';

// @Component({
//   selector: 'app-retailer-order',
//   templateUrl: './retailer-order.component.html',
//   styleUrls: ['./retailer-order.component.css']
// })
// export class RetailerOrderComponent {
// selectedStatus: any;
// statusList: string[]=['New','Shipped','Delivered','Packed'];



//   constructor(private service:RetailerOrderService,private routes:Router,private dialog:MatDialog){}
//   ngOnInit(): void {
    
//  this.service.getRetailersList().subscribe(res=>{
//            this.retailers=res;
//            this.retailers=this.retailers.data;
//            console.log(this.retailers);


//  })
  
//   }
//   selectedRetailer:any;
//   startDate:any;
//   endDate:any;
//   allProduct:selectedClass[]=[];
//   order:any[]=[];
//   showOrders:any[]=[];
//   orderStatusDetails:any;
//   orderVal:OrderClass | undefined;
//   retailers:any;

//   onSelectionChange($event: MatSelectChange){

     
//     this.order.splice(0,(this.order.length))
//       this.service.getAll($event.value).subscribe((res:any)=>{
       
//       this.orderStatusDetails=res.data;
//       this.orderStatusDetails.forEach((val: any)=>{

//           this.order.push(val);
//           console.log(val)


//         })

//         this.showOrders=this.order;
//         console.log(this.order,this.showOrders)
//      })

     
      
//     }
//     onStatusChange($event: MatSelectChange) {
      
      
//       this.showOrders.splice(0,(this.showOrders.length))
      
//       this.order.forEach(orderVal=>{
//          console.log(orderVal)
//         if($event.value==orderVal.orderStatus){

//             console.log($event.value,orderVal.orderStatus)
//             this.showOrders.push(orderVal);
//         }
        
//       })
           
      
      
//     }
 
 
//   // productDetails(){


//   //  this.routes.navigate(["./product",this.orderVal])
 
//   //     // const dialog=this.dialog.open(ProductDetailsComponent,{ 
        
//   //     //  data:{data:this.orderVal},panelClass:'dialog-container',
//   //     // });
      
  
//   // }
//   datepicker(){

//       const dateDialog=this.dialog.open(DateRangeComponent,{
//         position:{
//           left:'65%',
//           top:'14%'
//         }
//       })

//       dateDialog.afterClosed().subscribe(data=>{

//        this.order.splice(0,this.order.length)
        
//         this.startDate=data[0];
//         this.endDate=data[1];

//         this.service.getByDateRange(this.startDate,this.endDate).subscribe(data=>{

         
//           data.forEach(val=>{

//             console.log(this.selectedRetailer,val.retailer)
//             if(this.selectedRetailer==val.retailer){

              
//               this.order.push(val)
//             }


//           })
//           console.log(data)
          
//         })
      
        
//        })
    
  
//   }
  
 
// }
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RetailerOrderService } from 'src/app/service/RetailerOrderService';
import { OrderClass } from 'src/app/service/orderClass';
import { selectedClass } from 'src/app/service/selectedClass';
import { DateRangeComponent } from './date-range/date-range.component';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-retailer-order',
  templateUrl: './retailer-order.component.html',
  styleUrls:[ './retailer-order.component.css']
})
export class RetailerOrderComponent {
 

  constructor(private service:RetailerOrderService, private routes:Router, private dialog:MatDialog){}

  ngOnInit(): void {
    this.service.getRetailersList().subscribe((res:any) => {
      this.retailers = res.data;
      console.log(this.retailers);
    })
  }
  selectedStatus: any;
  statusList: string[]=['New','Shipped','Delivered','Packed'];
 completeDetails: any;
  RetailerDetails: any[]=[];
  customerDetails: any;
  userDetails: any[]=[];
  selectedRetailer: any;
  startDate: any;
  endDate: any;
  allProduct: selectedClass[] = [];
  order: any[] = [];
  showOrders: any[] = [];
  orderStatusDetails: any;
  orderVal: OrderClass | undefined;
  retailers: any;
  
  onSelectionChange($event: MatSelectChange) {
    this.order.splice(0, (this.order.length))
    this.service.getAll($event.value).subscribe((res: any) => {
      this.orderStatusDetails = res.data;
      this.orderStatusDetails.forEach((val: any) => {
        this.order.push(val);
        console.log(val)
      })
      this.showOrders = this.order;
      console.log(this.order, this.showOrders)
      this.getUserDetails()
          })
      }

  onStatusChange($event: MatSelectChange) {
    this.showOrders = []; // Clear the current displayed orders
    this.order.forEach(orderVal => {
      if ($event.value === orderVal.orderStatus) {
        this.showOrders.push(orderVal);
      }
    });
    this.getUserDetails();
  }

  datepicker() {
    const dateDialog = this.dialog.open(DateRangeComponent, {
      position: {
        left: '65%',
        top: '14%'
      }
    })

    dateDialog.afterClosed().subscribe(data => {
      this.order.splice(0, this.order.length)
      this.startDate = data[0];
      this.endDate = data[1];
      this.service.getByDateRange(this.startDate, this.endDate).subscribe(data => {
        data.forEach(val => {
      console.log(this.selectedRetailer, val.retailer)
          if (this.selectedRetailer == val.retailer) {
            this.order.push(val)
          }
        })
    console.log(data)
  })
    })
  }

  getUserDetails(){
     
    this.showOrders.map(val=>{
      
    
      this.service.getCustomerDetails(val.userId).subscribe((res:any)=>{
        this.userDetails.push(res.data);
        console.log(this.userDetails)
        this.mergeArray();
        })
            
           
        })
       
       
   }
mergeArray(){

  this.completeDetails = this.showOrders.map(order => {
    console.log(order.userId)
    const user = this.userDetails.find(user => order.userId == user.id); 
       console.log(order)
       console.log(user)
    return { ...order, ...user };
  })
  console.log(this.completeDetails)
  }
}
