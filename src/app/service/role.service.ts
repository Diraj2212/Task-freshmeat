import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  addroles(data:any) {
    return this.http.post<any>(AppSetting.AUTH_ENDPOINT + 'addRole/', data);
  }
  getrole() {

       return this.http.get<any>(AppSetting.AUTH_ENDPOINT + 'roleList/');
  }
  deleteroles(roleId:any){
    return this.http.delete(AppSetting.AUTH_ENDPOINT +'deleteRole/' +roleId)
  }
}
