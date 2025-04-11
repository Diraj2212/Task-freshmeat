import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppSetting } from "../constant/constant";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  verifyemail(email: any, otp: any) {
    console.log(email, otp);
    return this.http.get(
      AppSetting.AUTH_ENDPOINT + "verifyAccount/" + email + "/" + otp
    );
  }

  constructor(private http: HttpClient) {}
  login(loginData: any) {
    return this.http.post<any>(AppSetting.AUTH_ENDPOINT + "login", loginData);
  }
  generateOtp(email: any) {
    return this.http.put(
      AppSetting.AUTH_ENDPOINT + "generateOTP/" + email,
      email
    );
  }

  findUserByEmailId(email: any) {
    return this.http.get(
      AppSetting.AUTH_ENDPOINT + "findUserByEmailId/" + email
    );
  }
  resetPassword(user: any) {
    console.log(user);
    return this.http.put(AppSetting.AUTH_ENDPOINT + "resetPassword", user);
  }
  changePassword(user: any) {
    console.log(user);
    return this.http.put(AppSetting.AUTH_ENDPOINT + "changePassword", user);
  }
}
