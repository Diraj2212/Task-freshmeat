import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSetting } from '../constant/constant';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  url: any;
  vendorId: any;
  createdDate: any;
  orderdata: any;

  getWarehouseList(){
      return this.http.get<any>(AppSetting.TIEUP_ENDPOINT+'active/wareHouse');
  }


  getPurchaseOrders(storeId:any){
     // return this.http.get<any>(AppSetting.RETAILER_ENDPOINT+'orderList/'+vendorId);
     return this.http.get<any>(AppSetting.WAREHOUSE_ENDPOINT+'purchase/order/'+storeId);
  }

  getorderdetails(vendorId:any,FromDate:any,ToDate:any){
    return this.http.get<any>(AppSetting.RETAILER_ENDPOINT+`SalesOrdersWithDate/${vendorId}/${FromDate}/${ToDate}`);
  }
  getOrderDetails(vendorId:any){
    return this.http.get<any>(AppSetting.RETAILER_ENDPOINT+"SalesOrdersWithDate/{vendorId}/{FromDate}/{ToDate}"+vendorId);
  }
  getsevendaysorderdetails(vendorId:any,pastDate:any){
    return this.http.get<any>(AppSetting.RETAILER_ENDPOINT+`active/salesorder/${vendorId}/${pastDate}`);
  }
  getRetailersList() {
    return this.http.get(this.url);
  }
  getRetailerDetails(vendorId:any){
    return this.http.get<any>(AppSetting.AUTH_ENDPOINT+"getUserById/"+vendorId);
  }

  /*getWarehouseList() {
    return this.http.get(this.url);
  }*/

  getAll(retailer: any) {
    return this.http.get<any[]>(this.url);
  }
  getById(id: string) {
    return this.http.get<any>(this.url);
  }
  getCustomerDetails(customerId: any) {
    return this.http.get<any>(this.url);
  }
  
  getProductDetails(orderId: any) {
    return this.http.get<any>(this.url);
  }
  public getByDateRange(startDate: Date, endDate: Date) {
    const params = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-api-key': 'LETYEMP' ,
        'X-api-token':"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4NzgyOTA6QWRtaW4xMkBnbWFpbC5jb206ODk1MTcxOTI5OCIsImV4cCI6MTcwODUyMjAzOSwiaWF0IjoxNzA4NDM1NjM5fQ.Nkjjfz06xLYAUPXlxwlT2M3Dm8kcD5A8IEOmq406qetymX2z0M3E7nHLzU_GKdsx7j2fMW9xSKJlEDTHvkX7hQ"
       })
    };
    return this.http.get<any>(
      `http://localhost:8084/active/order/${this.vendorId}/${this.createdDate}`,headers
    );
  }

  getSubCategoryDetails() {
    return this.http.get(this.url);
  }

}
