import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http:HttpClient) { }
  addbanks(data:any){
    return this.http.post<any>(AppSetting.ADMIN_ENDPOINT+'addBank/',data);
  }
  getbank(){
    return this.http.get<any>(AppSetting.ADMIN_ENDPOINT+'bankList/');
   }
   bankdelete(bankId:any){
    return this.http.delete(AppSetting.ADMIN_ENDPOINT+'deleteBank/' + bankId)
  }
  updateBankDetail(url:any, data:any){
    return this.http.put(url, data)
    
  }
}
