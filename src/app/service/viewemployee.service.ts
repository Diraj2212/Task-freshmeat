import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSetting } from 'src/app/constant/constant';
import { Observable } from 'rxjs';
import { user } from 'src/app/modules/admin/models/user';
@Injectable({
  providedIn: 'root'
})
export class ViewemployeeService {

  constructor(private http:HttpClient) { }

  getRoles(url:any) {
    return this.http.get(url)
  }
  getStores(url:any) {
    return this.http.get(url)
  }
  getEmployees(url:any) {
    return this.http.get(url)
  }
  editEmployee(url:any, data:any){
    return this.http.put(url, data)
  }

  getEmployeeById(url:any ){
    return this.http.get(url)
  }
  deleteEmployee(url:any){
    return this.http.delete(url)

  }
}
