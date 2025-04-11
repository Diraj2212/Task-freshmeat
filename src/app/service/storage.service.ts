import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}
  public setRoles(roles: any) {
    console.log("roles in set roles  : " + roles);
    localStorage.setItem("roles", JSON.stringify(roles));
  }
  public getRoles() {
    return JSON.parse(localStorage.getItem("roles") as any);
  }

  public getUserId(): any {
    return localStorage.getItem("id");
  }
  clearstroage() {
    localStorage.clear();
  }
  public setToken(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
  }
  public getToken(): any {
    return localStorage.getItem("accessToken");
  }
  // public sethead_key(accessToken:string){
  //   localStorage.setItem("accessToken",accessToken);
  // }
  // public gethead_key(): any{
  //   return localStorage.getItem('accessToken');
  // }
  public isLoggrdIn() {
    return this.getRoles() && this.getToken();
  }
  public setdata(data: any) {
    localStorage.setItem("userModel", JSON.stringify(data));
  }
  public getdata() {
    return JSON.parse(localStorage.getItem("userModel") as any);
  }
}
