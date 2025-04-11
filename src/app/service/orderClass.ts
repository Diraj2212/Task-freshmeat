
import { DatePipe } from "@angular/common";
import { selectedClass } from "./selectedClass";
export interface OrderClass{



      
       
        orderId:number;
        customerName:string,
          destination:string,
          mobileNumber:number,
          amount:number,
          paymentMode:string,
           products:selectedClass[],
           retailer:string,
           date:Date,
           createdDate:Date,
           dueDate:Date,
             modifiedDate:Date,
             orderStatus:any, 
             orderType:any,
                status:any,
                totalAmount:number,
                userId:number,
                 vendorId:number, 
                 vendorRoleId:number,
                   is_active:boolean,
                    paid:any,
                     payment_source:any,
                     emailId:string,
           
      
}