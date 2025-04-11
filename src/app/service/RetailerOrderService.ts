import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { OrderClass } from "./orderClass"
import { AppSetting } from "../constant/constant"

@Injectable({
    providedIn: 'root'
  })
  export class RetailerOrderService {
  
    constructor(private http: HttpClient) { }

  getRetailersList(){

    return this.http.get(AppSetting.AUTH_ENDPOINT + 'getUsers/1/3')
  }
  
  getAll(retailer:any){

    return this.http.get<OrderClass[]>(AppSetting.RETAILER_ENDPOINT+'active/salesorders/'+retailer)
  }
  getById(id:string){

   
    return this.http.get<OrderClass>(`http://localhost:8085/getById/${id}`)
  }
  getCustomerDetails(customerId:any){

    return this.http.get<OrderClass>(AppSetting.AUTH_ENDPOINT+'getUserInfoById/'+customerId)
  }
  getOrderDetails(orderId:any){

    return this.http.get<OrderClass>(AppSetting.RETAILER_ENDPOINT+'orderById/'+orderId)
  }
  getProductDetails(orderId:any){

    return this.http.get<OrderClass[]>(AppSetting.RETAILER_ENDPOINT+'orderDetailById/'+orderId)
  }
  public getByDateRange(startDate:Date,endDate:Date){

    const params={
      startDate:startDate.toISOString(),
      endDate:endDate.toISOString()
    }
    return this.http.get<OrderClass[]>('http://localhost:8085/getByDateRange',{params})
  }

  getSubCategoryDetails(){

    return this.http.get(AppSetting.ADMIN_ENDPOINT +'subCategoriesList')
  }
   
  
   
  }
  