import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSetting } from '../constant/constant';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class PurchaseorderService {

  constructor(private http: HttpClient) {}
  url: any;
  vendorId: any;
  createdDate: any;


  getStores(url:any) {
    return this.http.get(url)
  }

  getCategory(){
    return this.http.get<any>(AppSetting.ADMIN_ENDPOINT+"categoriesList");
  }

  getCategoryType(wareHouseId:any){
     return this.http.get<any>(AppSetting.WAREHOUSE_ENDPOINT+wareHouseId+"/categoryType");
  }
  getCategoryOnType(wareHouseId:any,categoryTypeId:any){
    return this.http.get<any>(AppSetting.WAREHOUSE_ENDPOINT+wareHouseId+"/"+categoryTypeId+"/category");
  }
  getSubCategory(wareHouseId:any,categoryTypeId:any,categoryId:any){
    return this.http.get<any>(AppSetting.WAREHOUSE_ENDPOINT+wareHouseId+"/"+categoryTypeId+"/"+categoryId+"/subCategory");
  }
  getProduct(wareHouseId:any,categoryTypeId:any,categoryId:any, subCategoryId:any){
    return this.http.get<any>(AppSetting.WAREHOUSE_ENDPOINT+wareHouseId+"/"+categoryTypeId+"/"+categoryId+"/"+subCategoryId+"/product");
  }

  getCatalogueDetails(stateId:any, cityId:any, storeType:string,date:any,productId:string,categoryId:any){
    return this.http.get<any>(AppSetting.ADMIN_ENDPOINT+"catelogueview/"+ stateId+"/"+cityId+"/"+storeType+"/"+date+"/"+productId+"/"+categoryId);
  }

  getOrderSummary(orderId:any){
    return this.http.get<any>(AppSetting.WAREHOUSE_ENDPOINT+"order/summary/"+orderId);
  }
  saveOrder(data:any){
    return this.http.post<any>(AppSetting.WAREHOUSE_ENDPOINT+"save/order",data);
  }
}
