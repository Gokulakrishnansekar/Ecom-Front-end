import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
import { NgIf, AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
declare var google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterLink,
    CommonModule,
    MatProgressBarModule,
  ],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,

    private authSerive: AuthService
  ) {}
  userForm: FormGroup;
  private auth2: any; // Declare auth2 variable to hold Google Auth instance
  showLoader = false;

  unAuthorized$ = new BehaviorSubject<string>('');

  ngOnInit(): void {
    localStorage.removeItem('token');
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
    this.showLoader = true;
    this.loginService
      .loginBySSO(response.credential)
      .pipe(
        catchError((e) => {
          this.unAuthorized$.next('Invalid Username or Password');
          this.userForm = this.fb.group(new userForm(new LoginModel()));
          this.showLoader = false;
          return throwError(() => e);
        })
      )
      .subscribe((token: any) => {
        this.showLoader = false;
        this.authSerive.authDate = token;
      });
  }

  login() {
    this.showLoader = true;
    this.loginService
      .loginUser(this.userForm.value)
      .pipe(
        catchError((e) => {
          this.unAuthorized$.next('Invalid Username or Password');
          this.userForm = this.fb.group(new userForm(new LoginModel()));
          this.showLoader = false;
          return throwError(() => e);
        })
      )
      .subscribe((token: any) => {
        this.showLoader = false;
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
