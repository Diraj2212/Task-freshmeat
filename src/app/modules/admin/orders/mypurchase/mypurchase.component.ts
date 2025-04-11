import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {PurchaseorderService } from 'src/app/service/purchaseorder.service';
import { AppSetting } from 'src/app/constant/constant';
@Component({
  selector: 'app-mypurchase',
  templateUrl: './mypurchase.component.html',
  styleUrls: ['./mypurchase.component.css']
})
export class MypurchaseComponent {

  stores: any;
  todaysdate =  Date.now();
  purchaseOrderDetails !:FormArray<any>;
  purchaseOrderProducts !:FormGroup<any>;
  categoryTypes: any;
  category: any;
  subcategory: any;
  product: any;
  productdetails: any

  ngOnInit(): void {
    this.getwarehouse();
    this.getCategoryTypeforStore(0);

  }
  constructor(private builder: FormBuilder, private api:PurchaseorderService){

  }
  purchaseOrderForm = this.builder.group({
    wareHouseId : this.builder.control('',Validators.required),
    netPrice :this.builder.control({value:0, disabled:true} ),
    details:this.builder.array([]),
     

  });

  private getwarehouse() {
    
    this.api.getStores(AppSetting.TIEUP_ENDPOINT + 'storeList/30')
    .subscribe(response => {
      this.stores = { ...response };
      this.stores = this.stores.data; 
       });

}
saveorder() {
console.log(this.purchaseOrderForm.value);

}
deleteProduct(index:any){
  if(confirm('Do you want to remove?')){
    this.products.removeAt(index);
    
  }

}
addNewProduct(){
  console.log(" the add new product method");
this.purchaseOrderDetails=this.purchaseOrderForm.get("details") as FormArray;
this.purchaseOrderDetails.push(this.GenerateRow());
}
get products(){
  return this.purchaseOrderForm.get("details") as FormArray;

}


GenerateRow(){
  return this.builder.group({
    catergoryType :this.builder.control('', Validators.required),
    category:this.builder.control('', Validators.required),
    subCategory:this.builder.control('', Validators.required),
    productId:this.builder.control('', Validators.required),
    quantitySize:this.builder.control('', Validators.required),
    quantityNumber:this.builder.control('', Validators.required),
    totalPrice:this.builder.control({value:0, disabled:true} ),
    packPrice:this.builder.control({value:0, disabled:true} ),
    discountPercentage:this.builder.control({value:0, disabled:true} ),
  });
}
diplayCategoryTypeonchange(){
  console.log("warehouse id : " +this.purchaseOrderForm.controls['wareHouseId'].value);
  let whId = this.purchaseOrderForm.controls['wareHouseId'].value;
  this.getCategoryTypeforStore(whId);
}
private getCategoryTypeforStore(whId:any){
  console.log("warehouse id : " +this.purchaseOrderForm.controls['wareHouseId'].value);
  this.api.getCategoryType(AppSetting.WAREHOUSE_ENDPOINT + whId + "/categoryType")
    .subscribe(response => {
    this.categoryTypes =  { ...response };
    this.categoryTypes = this.categoryTypes.data;

  });
}
getCategoryforStore(index:any){
  console.log(" in the category for store , index : " + index);
  console.log("warehouse id : " +this.purchaseOrderForm.controls['wareHouseId'].value);
  this.purchaseOrderDetails=this.purchaseOrderForm.get("details") as FormArray;
  this.purchaseOrderProducts= this.purchaseOrderDetails.at(index) as FormGroup;
  let whId = this.purchaseOrderForm.controls['wareHouseId'].value;
  let catTypeId = this.purchaseOrderProducts.controls['catergoryType'].value;
  console.log("CategoryType : " +catTypeId);
  this.api.getCategory(AppSetting.WAREHOUSE_ENDPOINT + whId + "/"+catTypeId+"/category")
    .subscribe(response => {
    this.category =  { ...response };
    this.category = this.category.data;

  });
}
 getSubcategoryforStore(index:any){
  console.log("in the subcategory for store ,index : " + index);
  console.log("warehouse id : " +this.purchaseOrderForm.controls['wareHouseId'].value);
  
  this.purchaseOrderDetails=this.purchaseOrderForm.get("details") as FormArray;
  this.purchaseOrderProducts= this.purchaseOrderDetails.at(index) as FormGroup;
  let whId = this.purchaseOrderForm.controls['wareHouseId'].value;
  let catTypeId = this.purchaseOrderProducts.controls['catergoryType'].value;
  let catId = this.purchaseOrderProducts.controls['category'].value;

  console.log("CategoryType : " +catTypeId);
  console.log("CategoryType : " +catId);
  this.api.getSubCategory(AppSetting.WAREHOUSE_ENDPOINT + whId + "/"+catTypeId+"/" + catId + "/subCategory")
    .subscribe(response => {
    this.subcategory =  { ...response };
    this.subcategory = this.subcategory.data;

  });
}
getProductforStore(index: any){
  console.log("in the product for store ,index : " + index);
  console.log("warehouse id : " +this.purchaseOrderForm.controls['wareHouseId'].value);
  
  this.purchaseOrderDetails=this.purchaseOrderForm.get("details") as FormArray;
  this.purchaseOrderProducts= this.purchaseOrderDetails.at(index) as FormGroup;
  let whId = this.purchaseOrderForm.controls['wareHouseId'].value;
  let catTypeId = this.purchaseOrderProducts.controls['catergoryType'].value;
  let catId = this.purchaseOrderProducts.controls['category'].value;
  let subcatId = this.purchaseOrderProducts.controls['subCategory'].value;
  console.log("CategoryType : " +catTypeId);
  console.log("Category : " +catId);
  console.log("subCategory : " +subcatId);
  this.api.getProduct(AppSetting.WAREHOUSE_ENDPOINT + whId + "/"+catTypeId+"/" + catId + "/" + subcatId + "/product")
    .subscribe(response => {
    this.product =  { ...response };
    this.product = this.product.data;

  });
}

getProductPrice(index: any){

  this.purchaseOrderDetails=this.purchaseOrderForm.get("details") as FormArray;
  this.purchaseOrderProducts= this.purchaseOrderDetails.at(index) as FormGroup;
  let whId = this.purchaseOrderForm.controls['wareHouseId'].value;
  let catTypeId = this.purchaseOrderProducts.controls['catergoryType'].value;
  let catId = this.purchaseOrderProducts.controls['category'].value;
  let subcatId = this.purchaseOrderProducts.controls['subCategory'].value;
  let productId = this.purchaseOrderProducts.controls['productId'].value;
  
  console.log("CategoryType : " +catTypeId);
  console.log("Category : " +catId);
  console.log("subCategory : " +subcatId);
  console.log("subCategory : " +productId);
    this.api.getProduct(AppSetting.ADMIN_ENDPOINT + "catelogue/" +    whId + "/WAREHOUSE/"+ productId)
    .subscribe(response => {
    this.productdetails =  response ;
    this.productdetails = this.productdetails.data;

    
     this.purchaseOrderProducts.controls['packPrice'].setValue(this.productdetails.unitPrice);
    this.purchaseOrderProducts.controls['discountPercentage'].setValue(this.productdetails.discountPercentage); 

  }); 
  let quantity = this.purchaseOrderProducts.controls['quantityNumber'].value;
  console.log("quantity : " + quantity);
 // this.purchaseOrderProducts.controls['packPrice'].setValue(50)
   // this.purchaseOrderProducts.controls['discountPercentage'].setValue(5);
    this.getTotalPrice(index);

}

getTotalPrice(index: any){

  let unitprice = this.purchaseOrderProducts.controls['packPrice'].value;
  let quantity = this.purchaseOrderProducts.controls['quantityNumber'].value;
  let discount = this.purchaseOrderProducts.controls['discountPercentage'].value;
  console.log("unitprice : " + unitprice);
  console.log("quantity : " + quantity);
  console.log("discount : " + discount);
  let discountprice= (unitprice*discount)/100;
 let totalprice = (unitprice - discountprice) * quantity ; 
 this.purchaseOrderProducts.controls['totalPrice'].setValue(totalprice);

 console.log("total price : " + totalprice);
 this.summarycalculation();

}

summarycalculation() {
  let array = this.purchaseOrderForm.getRawValue().details;
  let sumtotal = 0
  array.forEach((x: any) => {
    sumtotal = sumtotal + x.totalPrice;
  });
  console.log("net price : " + sumtotal);
  this.purchaseOrderForm.controls['netPrice'].setValue(sumtotal);

}
}
