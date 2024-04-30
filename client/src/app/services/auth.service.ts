import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { apiUrls } from '../apiurls';
import { isPlatformBrowser } from '@angular/common';
import { Collection } from 'mongoose';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  platformId = inject(PLATFORM_ID);
  updateForm!: FormGroup;
  isloggedin$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }
  registeradminService(registerObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}registeradmin`, registerObj);
  }

  loginService(loginObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  sendEmailService(email:string){
    return this.http.post<any>(`${apiUrls.authServiceApi}forget`, {email: email});
  }

  sendOTPByEmail(email:string, otp: number){
    return this.http.post<any>(`${apiUrls.authServiceApi}otp`, {email: email, otp: otp});
  }

  resetPasswordService(resetObj:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}reset`, resetObj);
  }

  createCollectionService(createObj:any){ 
    return this.http.post<any>(`${apiUrls.collectionSeviceApi}createcollection`, createObj);
  }

  updateCollectionService(data: any): Observable<any> {
    const url = `${apiUrls.collectionSeviceApi}update/${data.storename}/${data.productname}`;
    return this.http.put(url, data);
  }

  getCollectionService(): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrls.collectionSevice}/getcollection`);
  }


  getProductsService(data: any): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrls.collectionSevice}/getcollectionproducts/${data}`);
  }
 
  isLoggedin(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem("user_id");
    }
    return false; // localStorage is not available, so not logged in
  }

}
