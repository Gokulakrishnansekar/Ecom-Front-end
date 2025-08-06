import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordModel, LoginModel } from 'src/app/model/login.model';
import { HttpHeader } from '../interceptor/model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginUser(user: LoginModel): Observable<any> {
    return this.http.post<any>('http://localhost:8080/login', user);
  }

  loginBySSO(token: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/login/sso', { token });
  }

  changePassword(passwordModel: PasswordModel): Observable<any> {
    return this.http.post(
      'http://localhost:8080/change-password',
      passwordModel
    );
  }

  forgetPassword(email: string): Observable<any> {
    return this.http.post('http://localhost:8080/login/forgot-password', email);
  }

  resetPassword(token: string, password: string) {
    return this.http.post('http://localhost:8080/login/reset-password', {
      token,
      password,
    });
  }
}
