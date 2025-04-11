import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class CountryapiService {

  constructor(private http: HttpClient) { }


  addCountry(data:any){
    return this.http.post<any>(AppSetting.ADMIN_ENDPOINT+'addCountry',data)
  }
  getCountry(){ 
    return this.http.get<any>(AppSetting.ADMIN_ENDPOINT+'countryList')
  }
countrydelete(countryId:any){
  return this.http.delete(AppSetting.ADMIN_ENDPOINT+'deleteCountry/' + countryId)
}


 countryNameById(countryCode:any){
  return this.http.get(AppSetting.ADMIN_ENDPOINT+'countryNameByCode/'+countryCode);
 }
  updateCountryDetail(url:any, data:any){
    return this.http.put(url, data)
   }
}

