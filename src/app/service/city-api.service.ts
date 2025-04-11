import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class CityApiService {

  constructor(private http:HttpClient) { }

  addcity(data:any){
    return this.http.post<any>(AppSetting.ADMIN_ENDPOINT+'city',data);
  }
 getCity(){
  return this.http.get<any>(AppSetting.ADMIN_ENDPOINT+'cityList');
 }
 citydelete(cityId:any){
  return this.http.delete(AppSetting.ADMIN_ENDPOINT+'deleteCity/' + cityId)
}
  updateCityDetail(url:any, data:any){
    return this.http.put(url, data)
   
  }

  getCityNameById(cityId:any){
    return this.http.get(AppSetting.ADMIN_ENDPOINT+'cityNameById/'+cityId);
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}
