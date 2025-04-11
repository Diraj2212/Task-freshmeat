import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSetting } from 'src/app/constant/constant';
import { user } from 'src/app/modules/admin/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddemployeeService {

  constructor(private http:HttpClient) { }

  getCountries(url:any){
    return this.http.get(url)

  }
  getBanks(url:any) {
    return this.http.get(url)
  }
  getRoles(url:any) {
    return this.http.get(url)
  }
  getStores(url:any) {
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
  createUser (user: user){
    return this.http.post(AppSetting.AUTH_ENDPOINT + 'save/user', user,{ responseType: 'text'})

  }
  getEmployeeById (id:any):Observable<user>{
    return this.http.get<user>(AppSetting.AUTH_ENDPOINT + 'getUserInfoById/' + id)

  }
  updateEmployeeById( user:user){
    console.log("  in the updateservice method")
    return this.http.put(AppSetting.AUTH_ENDPOINT + 'update/user',  user, { responseType: 'text'})
  }
}
