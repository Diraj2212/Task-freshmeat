import { Injectable } from '@angular/core';


import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { StorageService } from '../service/storage.service';




@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {



/* If the headers are already set. For example in case of image upload, Do not change the headers as it has to be
    multipart/form-data */    
    if(req.headers.get('X-API-KEY')) {
      return next.handle(req);
    }
    else {
      let authReq;
      console.log("role : " +this.storageService.getRoles());
      if (this.storageService.getRoles()!=null && this.storageService.getToken())
      {
        console.log("accesstoken 1 : " +this.storageService.getToken());
        authReq = req.clone({ setHeaders: { 'Content-Type':  'application/json',
          "X-API-KEY": "LETYEMP", "X-API-TOKEN": this.storageService.getToken()! } });
      }
      else
      {
        console.log("accesstoken 2 : " +this.storageService.getToken());
        authReq = req.clone({ setHeaders: { 'Content-Type':  'application/json', "X-API-KEY": "LETYEMP" } });
      }


      return next.handle(authReq);
    }
  }
}