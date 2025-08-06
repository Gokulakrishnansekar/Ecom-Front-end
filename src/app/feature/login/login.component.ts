import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';
import { LoginModel } from 'src/app/model/login.model';
import { NgIf, AsyncPipe } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { RouterLink } from '@angular/router';
declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, AsyncPipe, RouterLink],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,

    private authSerive: AuthService
  ) {}
  userForm: FormGroup;
  private auth2: any; // Declare auth2 variable to hold Google Auth instance

  unAuthorized$ = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.userForm = this.fb.group(new userForm(new LoginModel()));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const btn = document.getElementById('googleBtn') as HTMLElement;

      google.accounts.id.initialize({
        client_id:
          '852423727825-e1ir64huir0ov8dnb9krobrblg1k2qhe.apps.googleusercontent.com',
        callback: (response: any) => this.handleCredentialResponse(response),
      });

      google.accounts.id.renderButton(btn, {
        theme: 'filled_blue',
        size: 'large',
      } as any);
    }, 1000);
  }

  handleCredentialResponse(response: any) {
    this.loginService
      .loginBySSO(response.credential)
      .pipe(
        catchError((e) => {
          this.unAuthorized$.next('Invalid Username or Password');
          this.userForm = this.fb.group(new userForm(new LoginModel()));
          return throwError(() => e);
        })
      )
      .subscribe((token: any) => {
        this.authSerive.authDate = token;
      });
  }

  login() {
    this.loginService
      .loginUser(this.userForm.value)
      .pipe(
        catchError((e) => {
          this.unAuthorized$.next('Invalid Username or Password');
          this.userForm = this.fb.group(new userForm(new LoginModel()));
          return throwError(() => e);
        })
      )
      .subscribe((token: any) => {
        this.authSerive.authDate = token;
      });
  }
}

export class userForm {
  constructor(
    model: LoginModel,
    public username = new FormControl(model.username, Validators.required),
    public password = new FormControl(model.password, Validators.required)
  ) {}
}
