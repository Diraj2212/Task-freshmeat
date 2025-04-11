import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class StateapiService {

  constructor(private http:HttpClient) { }


  addstate(data:any){
    return this.http.post<any>(AppSetting.ADMIN_ENDPOINT+'addState',data);
   }
 
   getState(){
     return this.http.get<any>(AppSetting.ADMIN_ENDPOINT+'stateList');
   }
 statedelete(stateId:any){
   return this.http.delete(AppSetting.ADMIN_ENDPOINT+'deleteState/' + stateId)
 }
 
 getstates(url:any){
   return this.http.get(url);
   
 }
  updateStateDetail(url:any, data:any){
    return this.http.put(url, data)
    
  }
  getCountries(url:any){
    return this.http.get(url)
    
  }

  getStateName(stateId:any){
    return this.http.get<any>(AppSetting.ADMIN_ENDPOINT+"getstateName/"+stateId);

  }
  getStateId(stateName:any){
      return this.http.get<any>(AppSetting.ADMIN_ENDPOINT+"state/"+stateName);
  }


  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}
