// import { Component, Inject ,OnInit} from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { ActivatedRoute } from '@angular/router';
// import { CategoryService } from 'src/app/service/category.service';
// import { OrderClass } from 'src/app/service/orderClass';
// import { RetailerOrderService } from 'src/app/service/RetailerOrderService';
// import { selectedClass } from 'src/app/service/selectedClass';

// interface BackendResponse {
//   dataArray: any[];  // Replace 'any' with the actual type of your data
//   status: string;
// }
// @Component({
//   selector: 'app-product-details',
//   templateUrl: './product-details.component.html',
//   styleUrls: ['./product-details.component.css']
// })
// export class ProductDetailsComponent implements OnInit {

//   constructor(private activatedRouter:ActivatedRoute,private service:RetailerOrderService){}
 
  

//   orderId: any;
//   customerId:any;
 
//   CustomerDetails:any;
//   OrderDetails:any;
//   ProductDetails:any[]=[];
//   subCategoryDetails:any[]=[];
//   completeProductDetails:any[]=[];
//   total_amount!:number;
  
//   ngOnInit(): void {
    
//     this.orderId=this.activatedRouter.snapshot.paramMap.get('orderId')
//     this.customerId=this.activatedRouter.snapshot.paramMap.get('customerId')
//     this.getDetails(this.orderId)
 

//   }
  

   
     
//     productval:any;


//     getDetails(id:string){

//       this.service.getCustomerDetails(this.customerId).subscribe((response:any)=>{

//         this.CustomerDetails=response.data;
//         console.log(this.CustomerDetails)
//       })
//       this.service.getProductDetails(this.orderId).subscribe((response:any)=>{

//         this.ProductDetails=response.data;
//         console.log(this.ProductDetails)

//       })
//       this.service.getOrderDetails(this.orderId).subscribe((response:any)=>{

//         this.OrderDetails=response.data;
//         console.log(this.OrderDetails)

//       })

     
//       this.service.getSubCategoryDetails().subscribe((response:any)=>{


//         this.subCategoryDetails=response.data;
//         console.log(this.subCategoryDetails)
//         this.mergeArray();
//       })
      

//     }

//     mergeArray(){
//            this.completeProductDetails=this.ProductDetails.map(category=>{

//                 const subDetails=this.subCategoryDetails.find(sub=> category.subCategoriesId== sub.subCategoriesId);
//                 return { ...category, ...subDetails };
//            })

//            console.log(this.completeProductDetails)
//     }

    
  
    
  



 



//     }

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { RetailerOrderService } from 'src/app/service/RetailerOrderService';


interface BackendResponse {
  dataArray: any[];  // Replace 'any' with the actual type of your data
  status: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private service: RetailerOrderService,private products:RetailerOrderService) { }

  orderId: any;
  customerId: any;
  CustomerDetails: any;
  OrderDetails: any;
  ProductDetails: any[] = [];
  subCategoryDetails: any[] = [];
  completeProductDetails: any[] = [];
  totalAmount:number=0;
  ngOnInit(): void {
    this.orderId = this.activatedRouter.snapshot.paramMap.get('orderId')
    this.customerId = this.activatedRouter.snapshot.paramMap.get('customerId')
    this.getDetails(this.orderId)
  }

  productval: any;

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
      console.log(this.OrderDetails)
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
  }

  

  
}