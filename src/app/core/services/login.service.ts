import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordModel, LoginModel } from 'src/app/model/login.model';
import { HttpHeader } from '../interceptor/model/auth.model';
import { UrlService } from './URL.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private url: UrlService) {}

  loginUser(user: LoginModel): Observable<any> {
    console.log(this.url.apiUrl);
    return this.http.post<any>(`${this.url.apiUrl}/login`, user);
  }
  dummyUser(): Observable<any> {
    console.log(this.url.apiUrl);
    return this.http.get<any>(`${this.url.apiUrl}/dummy`);
  }
  loginBySSO(token: string): Observable<any> {
    return this.http.post<any>(`${this.url.apiUrl}/login/sso`, { token });
  }

  changePassword(passwordModel: PasswordModel): Observable<any> {
    return this.http.post(`${this.url.apiUrl}/change-password`, passwordModel);
  }

  forgetPassword(email: string): Observable<any> {
    return this.http.post(`${this.url.apiUrl}/login/forgot-password`, email);
  }

  resetPassword(token: string, password: string) {
    return this.http.post(`${this.url.apiUrl}/login/reset-password`, {
      token,
      password,
    });
  }
}
