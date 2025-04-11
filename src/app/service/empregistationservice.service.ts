import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpregistationserviceService {

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
  postProfileData(url:any, data:any) {
    return this.http.post(url, data)

  }

  getcitiesByStateId(url:any){
    return this.http.get(url)
  }
  getstatesByCountryId(url:any){
    return this.http.get(url)

  }
}
