import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseorderService } from 'src/app/service/purchaseorder.service';

@Component({
  selector: 'app-posummary',

  templateUrl: './posummary.component.html',
  styleUrl: './posummary.component.css'
})
export class POSummaryComponent implements OnInit {
  orderDetailsList:any;
  orderMdl:any;
  orderDetailsModel:any;
  displayedColumns: string[] = [
    'slNo', 'productId', 'productName', 'categoryName', 'unitPrice','FM_Discount',
    'Discounted_Price', 'QuantityNo', 'Total_Price'
  ];
  orderId:string="34572";
  
  dataSource = [
    {
      slNo: 1,
      productId: 'P001',
      productName: 'Product A',
      categoryName: 'Category 1',
      unitPrice: 500,
      FM_Discount: 56,
      Discounted_Price: 5000,
      QuantityNo: 'Large',
      Total_Price: 7000

      
    }
  ];

  constructor(private api:PurchaseorderService, private router:ActivatedRoute) {

  }

  ngOnInit(): void {

    console.log(JSON.stringify( this.router.queryParams));
    this.router.params.subscribe(params => {
      this.orderId = params['orderId'];
    });
    console.log("this.orderId = "+this.orderId);
    this.getSummaryDetails();
  }

  
  getSummaryDetails()
  {
    this.api.getOrderSummary(this.orderId).subscribe(
      (res:any) =>
        {
          this.orderDetailsList=res.data;
          console.log("orderDetails Retrieved = "+JSON.stringify(this.orderDetailsList));
         // this.orderDetailsList.array.forEach((element:any) => {
          this.orderMdl = this.orderDetailsList[0];
          this.orderDetailsModel = this.orderMdl.orderDetailsDomain;
          console.log("this.orderMdl = = "+ this.orderMdl); 
      //});
  })

  }
}
