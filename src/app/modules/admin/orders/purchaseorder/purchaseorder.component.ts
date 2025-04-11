import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/service/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../../models/orderModel';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-purchaseorder',
  templateUrl: './purchaseorder.component.html',
  styleUrl: './purchaseorder.component.css'
})
export class PurchaseorderComponent {

order:any;
orderId:any;
  data: any;
  editdata: any;
  clicked: any;
  list: any;
  sort: any;
  paginator: any;
  editable: any;
  includeTable = true; 
   OrderDetails: any;
   userId:any;
   user:any;
   
 
  constructor(private builder: FormBuilder, private router:Router , 
    private service: OrderService, private dialog:MatDialog,private local:StorageService
    ){
       this.user = this.local.getdata();
       this.userId = this.user.id;
    }
  ngOnInit(): void {
   // this.OrderId=this.activatedRoute.snapshot.paramMap.get('id');
    this.getOrderList();
    this.userId = this.user.id;
   }

   getOrderList(){
    let status='active';
    this.service.getPurchaseOrders(this.user.storeId).subscribe((res :any )=>{
      console.log(res);
      this.list = { ...res };
       // console.log(this.list);
        this.list = this.list.data;

   });
  }


}
