import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSetting } from 'src/app/constant/constant';
import { Store } from '../modules/admin/models/Store';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private http:HttpClient ) { }

  getCountries(url:any){
    return this.http.get(url)

  }
  getBanks(url:any) {
    return this.http.get(url)
  }
  getRoles(url:any) {
    return this.http.get(url)
  }
  postProfileData(url:any, data:any) {
    return this.http.post(url, data)

  }

  getcitiesByStateId(url:any){
    return this.http.get(url)
  }
  getstatesByCountryId(url:any){
    return this.http.get(url)

  }
  //AppSetting.AUTH_ENDPOINT + 'addStore'
  //storeUrl = 'http://localhost:3000/store';

  CreateStore(store: Store){
    return this.http.post(AppSetting.AUTH_ENDPOINT + 'addStore', store,{ responseType: 'text'})

  }
  getStores(){
    return  this.http.get<any>(AppSetting.TIEUP_ENDPOINT+'storeList')
  }
}
