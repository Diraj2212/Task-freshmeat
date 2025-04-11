import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatList } from '@angular/material/list';
import { Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { OrderService } from 'src/app/service/order.service';
import { PurchaseorderService } from 'src/app/service/purchaseorder.service';
import { StorageService } from 'src/app/service/storage.service';
import { Order } from '../../models/orderModel';
import { OrderDetailsDomain } from '../../models/orderDetailsDomain';
import { LoginService } from 'src/app/service/login.service';
import { DatePipe } from '@angular/common';
import { StateapiService } from 'src/app/service/stateapi.service';
import { JsonpClientBackend } from '@angular/common/http';
import { ConnectableObservable } from 'rxjs';
import { CityApiService } from 'src/app/service/city-api.service';
import { CountryapiService } from 'src/app/service/countryapi.service';

interface TableRow {
  categoryTypeId:string;
  categoryTypeName:string;
  categoryTypeList:any,
  categoryName: string
  categoryId:string;
  categoryList:any;
  productId: string;
  productName:string;
  productList:any;
  subcategoryId:string;
  unitPrice:number;
  fmDiscount:number;
  discountedTotalPrice:number;
  discountedUnitPrice:number;
  quantity:number;
  totalPrice:number;
  
}


@Component({
  selector: 'app-raisepo',
  templateUrl: './raisepo.component.html',
  styleUrl: './raisepo.component.css'
})
export class RaisePOComponent implements OnInit {
  //POForm:any;
warehouseList :any;  
discountedUnitPrice:any;
categoryList:any;
currDate:any;
categoryTypeList:any;
productList:any;
subCategoryName:any;
isLinear = true;
isOrderPlaced = false;
totalPrice = 0.0;
itemTotal = 0.0;
isShowDiv = false; 
wareHouse:any;
retailerAddress:any;
retailerMobileNumb:any;
categoryTList:any;
user:any;
state:any;
city:any;
country:any;

rowData: any[] = [];

order!:Order;
/*rows: TableRow[] = [
  { 
          categoryTypeId:"",
          categoryTypeName:"",
          categoryTypeList:MatList,
          categoryName:"",
          categoryId:"",
          categoryList:MatList,
          productId: "",
          productName:"",
          productList:MatList,
          subcategoryId:"",
          unitPrice:0.0,
          fmDiscount:0,
          discountedTotalPrice:0.0,
          discountedUnitPrice:0.0,
          quantity:0,
          totalPrice:0.0
            
  }
];*/
selectedRows:any;
POForm:FormGroup;

selectedWarehouseId:any;

  constructor(private builder: FormBuilder, private router: Router,
      private api :OrderService , private poservice:PurchaseorderService,
      private localStorage : StorageService,private datePipe: DatePipe,
    private stateApi:StateapiService, private cityApi:CityApiService, private countryApi:CountryapiService) {

        //this.currDate = new Date();
        this.POForm = this.builder.group({
          warehouseId: new FormControl('', Validators.required),
          rows: this.builder.array([])  
        })
  }


  ngOnInit(): void {
    this.totalPrice = 0.0;

    this.user = this.localStorage.getdata();
    this.currDate = this.datePipe.transform(new Date(),'dd-MM-yyyy');
    console.log("currDate ="+ this.currDate);
    console.log("user Details :: "+ JSON.stringify(this.user));
    this.getWarehouse();
   // this.getCategoryList();
   // this.getCategoryTypeList();
  //  this.getProductList();  
    //this.addRow();

   
   //let state = "Karnataka"
   // let city = "Bangalore";
  //  let country = "India"
    //get city, state and country from id
    this.cityApi.getCityNameById(this.user.addressDomainV1.cityId).subscribe((res:any)=> {
      this.city = res.data.cityName;
    })

    this.stateApi.getStateName(this.user.addressDomainV1.stateId).subscribe((res:any) => {
      this.state = res.data.stateName;
    })

    this.countryApi.countryNameById(this.user.addressDomainV1.countryId).subscribe((res:any) => {
      this.country = res.data.countryName;
    })
    
    console.log("this.city, state, country ="+this.city +" -- "+ this.state+" -- "+this.country);
  }

  get rows(): FormArray {
    return this.POForm.get('rows') as FormArray;
  }
  
private getWarehouse() {

   this.api.getWarehouseList().subscribe(response => {
        //this.warehouseList = { ...response };
        this.warehouseList = response.data;
        console.log("this.warehouseList ="+ JSON.stringify(this.warehouseList));
      });
  }

  private getCategoryList(){

    /*  this.poservice.getCategory().subscribe(res => {
        this.categoryList = res.data;
        console.log("categoryList :" + this.categoryList);
      })*/
  }
  private getCategoryTypeList(){
  /*  this.poservice.getCategoryType().subscribe(res => {
      this.categoryTypeList = res.data;
      console.log("categoryTYPEList :" + this.categoryTypeList);
    })*/
  }

  private getProductList(){

      /*this.poservice.getProduct().subscribe(res => {
        this.productList = res.data;
        console.log("productList :" + this.productList);
      })*/
  }
  onWarehouseSelect(){
    //clear the added rows, clear all data and show empty table
    this.clearRows();
    console.log("Selected Warehouse = "+ this.POForm.value.warehouseId);
    this.selectedWarehouseId = this.POForm.value.warehouseId;
    
    let ind = 0;
    let whId = this.POForm.value.warehouseId;
    this.wareHouse = this.warehouseList.find((item: any ) => item.wareHouseId === whId)
    console.log("Selected Warehouse = "+this.wareHouse);
   // const selectedRow = this.rows.at(ind).value;
   //call /{warehouseId}/categoryType - with warehouseId
   this.poservice.getCategoryType(whId).subscribe(res => {
    // selectedRow.patchValue (
      //this.categoryTypeList = res.data;
   //    this.rows.at(i).get('categoryList')?.setValue(res.data);
      console.log("res for categoryTypeList res= "+ JSON.stringify(res));

      console.log("res for categoryTypeList res.data= "+ JSON.stringify(res.data));
    //  this.rows.at(ind).get('categoryTypeList')?.setValue(res.data);

      this.categoryTList = res.data;
       /**this.rows.at(ind).patchValue({
            categoryTypeList: res.data,
            categoryTypeId: '',  // Reset category selection
            categoryList: [[]], // Reset product list
            productId: ''    // Reset product selection
      });*/
    //from warehouse selected, get city id, address id.  Get adress details from admin address table, get state id.
     // - NOT REQUIRED - MODIFY EXISTING WAREHOUSE METHOD TO SET CITY ID, STATEIDs also
     this.addRow();
  })
}
  onCategoryTypeChange(i : any){
    console.log("Value of i = "+ i);
    //console.log('Rows value:', this.rows.getRawValue() );
   // console.log('Rows value at i ', this.rows.at(i));
    console.log("this.rows.at(i).getRawValue = "+this.rows.at(i).getRawValue());
    let selectedRow = this.rows.at(i);
    const categoryTypeIdSelected = this.rows.at(i).value.categoryTypeId// this.rows.at(i).value;

    console.log("this.rows.at(i).value.categoryTypeList = "+ JSON.stringify(this.rows.at(i).value.categoryTypeList));
    let catNameSelected = this.rows.at(i).value.categoryTypeList.find(
                               (cat: any) => Number(cat.categoryTypeId) === Number(categoryTypeIdSelected)).categoryTypeName;
                             
    console.log("catTypeList on typeIdselect ="+JSON.stringify(catNameSelected));

    this.rows.at(i).get('categoryTypeName')?.setValue(catNameSelected);
    
    let wh = this.POForm.value.warehouseId;
    this.poservice.getCategoryOnType(wh, categoryTypeIdSelected).subscribe(res => {
     // selectedRow.patchValue (
        ///this.categoryList = res.data;
        this.rows.at(i).get('categoryList')?.setValue(res.data);

    this.rows.at(i).patchValue({
      categoryList: res.data,
      categoryId: '',  // Reset category selection
      categoryName:'',
      productList: [], // Reset product list
      productId: '' ,   // Reset product selection
      productName:''
    })

      console.log("categoryList based on TypeId :" + JSON.stringify(res.data));
    })
  }

  onCategoryChange(i:any){
      console.log("category Changed");
      let categoryTypeIdSelected = this.rows.at(i).value.categoryTypeId
      let wh = this.POForm.value.warehouseId;
      let categId =this.rows.at(i).value.categoryId;
      let subCategId =1//this.rows.at(i).value.subCategoryId;

      let catNameSelected = this.rows.at(i).value.categoryList.find(
        (cat: any) => Number(cat.categoryId) === Number(categId)).categoryName;

       this.rows.at(i).get('categoryName')?.setValue(catNameSelected);

      this.poservice.getSubCategory(wh, categoryTypeIdSelected,categId).subscribe(res => {
      
      this.rows.at(i).patchValue({
        subcategoryList: res.data, // Reset product list
      });

  })
}

onSubcategoryChange(i:any){

  let categoryTypeIdSelected = this.rows.at(i).value.categoryTypeId
  let wh = this.POForm.value.warehouseId;
  let categId =this.rows.at(i).value.categoryId;
  let subCategId = this.rows.at(i).value.subcategoryId;

  let subcatNameSelected = this.rows.at(i).value.subcategoryList.find(
    (cat: any) => Number(cat.subCategoryId) === Number(subCategId)).subCategoryName;
      this.rows.at(i).get('subcategoryName')?.setValue(subcatNameSelected);
      this.poservice.getProduct(wh, categoryTypeIdSelected,categId,subCategId).subscribe(res => {
    
   this.rows.at(i).patchValue({
     productList: res.data, // Reset product list
   });

})
}

  onProductChange(i:any){
    const selectedRow = this.rows.at(i).value;
  let prodId =  this.rows.at(i).get('productId')?.value;
  let catId =  this.rows.at(i).value.categoryId;
  let productNameSelected = this.rows.at(i).value.productList.find(
    (cat: any) => Number(cat.productId) === Number(prodId)).productName;
    
    this.rows.at(i).get('productName')?.setValue(productNameSelected);

   let productDescSelected = this.rows.at(i).value.productList.find(
    (cat: any) => Number(cat.productId) === Number(prodId)).productDescription;

     this.rows.at(i).get('productDescription')?.setValue(productDescSelected);
    let cityId = Number(this.wareHouse.cityId);
let stateName = this.wareHouse.state;
    this.stateApi.getStateId(stateName).subscribe((res:any) => {
    let stateId = res.data.stateId;
    let storeType ='WH';
    const currentDate = new Date();
      let createdDate = currentDate.toISOString().replace(/\.\d{3}Z$/, '.000000');    
    //let createdDate = "2024-03-15T11:20:52.000000";
   this.poservice.getCatalogueDetails(stateId,cityId,storeType,createdDate,prodId,catId )
   .subscribe( (res:any) => {
            console.log("in catalogue details ::"+JSON.stringify(res.data));

            if(res.data != null  && res.data.length > 0){
              const productDetails = res.data[0];
            this.rows.at(i).get('unitPrice')?.setValue(productDetails.unitPrice);
            this.rows.at(i).get('fmDiscount')?.setValue(productDetails.discountPercentage);
            let discountP = productDetails.unitPrice- (productDetails.unitPrice *(productDetails.discountPercentage/100));
            this.rows.at(i).get('discountedUnitPrice')?.setValue(discountP);
            }
    })

  })
  }

  onInputChange(i:any) {
    const selectedRow = this.rows.at(i).value;
    let itemTotalAmnt = selectedRow.quantity * selectedRow.discountedUnitPrice;
    this.totalPrice = this.totalPrice+ itemTotalAmnt;
    this.rows.at(i).get('discountedTotalPrice')?.setValue(itemTotalAmnt);
  }


  setRows(row:any){
    this.rowData = [];
    console.log("rows list raw Val ="+JSON.stringify(this.rows.getRawValue()));
      this.rowData = this.POForm.value.rows;
  }
  
  submit(){
    let orderType='Online';
    let paymentMode = 'card';//this.POForm.value.paymentOpt;   
    console.log("paymenymode vale ="+paymentMode);
    let paymentStatus ='true';
    let destination = 'shipping';
    let orderStatus ='Pickup';
    const formValues = this.rows.getRawValue();
     
    //console.log("Row Val ==" + JSON.stringify(formValues));
    let orderDetails = formValues.map((row:any) =>  {
 
      return new OrderDetailsDomain(row.categoryTypeId, row.categoryId, row.subcategoryId, row.productId, row.productName,
        row.quantity,'J',row.unitPrice,row.fmDiscount,row.discountedUnitPrice,row.discountedTotalPrice);   
    });
   // console.log("----Warehouse data before-------"+JSON.stringify(this.wareHouse));
   console.log("this.th this.user.id = "+  this.user.id +"---"+this.user.roleDomain.roleId);
    this.order = new Order(this.wareHouse.userId,
     '13',  this.user.id,this.user.roleDomain.roleId, this.user.storeId, this.user.firstName + this.user.lastName,
      this.user.emailId, this.user.mobileNumber,(this.user.address1+this.user.address2), this.wareHouse.wareHouseId,
      this.totalPrice, orderType, paymentMode, paymentStatus, destination, orderStatus, orderDetails

    );
    this.poservice.saveOrder(this.order).subscribe((res:any) => {

      console.log("res = "+ res);
      this.isOrderPlaced = true;
      this.totalPrice = 0;
      alert("Thank you for the order!");
      this.router.navigate(['../raisepo']);
    });
  }
  

  addRow() {
    console.log("In addRow :: "+JSON.stringify(this.categoryTList));
    const rowGroup = this.builder.group({
      categoryTypeId: ['', Validators.required],
      categoryTypeName:[[]],
      categoryTypeList:[this.categoryTList],
      categoryId: ['', Validators.required],
      categoryName:[[]],
      categoryList:[[]],
      subcategoryId:[[]],
      subcategoryName:[[]],
      subcategoryList:[[]],
      productName:[[]],
      productDescription:[[]],
      productList:[[]],
      productId: ['', Validators.required],
      unitPrice: [0, Validators.required],
      fmDiscount: [0, Validators.required],
      discountedUnitPrice: [0, Validators.required],
      quantity: [0, Validators.required],
      discountedTotalPrice: [0, Validators.required]
    });

    this.rows.push(rowGroup);
   
  }
  removeRow(index: number) {
    if (this.rows.length > 0) {
      const selectedRow = this.rows.at(index).value;
      let itemTotalAmnt = selectedRow.quantity * selectedRow.discountedUnitPrice;
      this.totalPrice = this.totalPrice-itemTotalAmnt;
        this.rows.removeAt(index);
      
    }
  }

  toggleNewAddress(){

    this.isShowDiv = !this.isShowDiv; 
  }
  
  onCancel(){
    window.location.reload();
  }

  clearRows() {
    const rows = this.POForm.get('rows') as FormArray;
    while (rows.length !== 0) {
      rows.removeAt(0);
    }
  }

}
