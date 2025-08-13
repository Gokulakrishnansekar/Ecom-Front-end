import { Injectable } from '@angular/core';
import { jwtHelper } from '../guard/auth.guard';
import { Router } from '@angular/router';
import { AuthUserModel } from '../interceptor/model/auth.model';
import { BehaviorSubject } from 'rxjs';
import { Roles } from 'src/app/model/roles.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {
    this.loadToken();
  }
  private _authData: AuthUserModel;

  isAdmin$ = new BehaviorSubject<boolean>(false);
  isBuyer$ = new BehaviorSubject<boolean>(false);
  isSeller$ = new BehaviorSubject<boolean>(false);
  name$ = new BehaviorSubject<string>('');
  isExpired$ = new BehaviorSubject<boolean>(false);
  userId$ = new BehaviorSubject<number>(null);

  loadToken() {
    const token = localStorage.getItem('token') as string;
    if (token) {
      const userdetails = jwtHelper.decodeToken(
        JSON.parse(token)
      ) as AuthUserModel;
      console.log(jwtHelper.isTokenExpired(token));
      console.log('User Details:', userdetails);

      this.isAdmin$.next(userdetails.roles.includes(Roles.ADMIN));
      this.isBuyer$.next(userdetails.roles.includes(Roles.BUYER));
      this.isSeller$.next(userdetails.roles.includes(Roles.SELLER));
      this.name$.next(userdetails.sub);
      this.userId$.next(userdetails.user_id);
    }
  }

  get authDate(): AuthUserModel {
    if (this._authData) {
      const userdetails = this._authData;

      return this._authData;
    } else {
      const token = localStorage.getItem('token') as string;
      const userdetails = jwtHelper.decodeToken(
        JSON.parse(token)
      ) as AuthUserModel;

      return userdetails;
    }
  }

  set authDate(token: any) {
    localStorage.setItem('token', JSON.stringify(token.token));

    this.router.navigate(['/home']);
    const tokenDetails = jwtHelper.decodeToken(token.token);

    this._authData = tokenDetails;
  }
}
