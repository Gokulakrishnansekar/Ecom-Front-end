import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  imports: [
    CommonModule,
    MatCommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  standalone: true,
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  message = new BehaviorSubject<string>('');
  message$ = this.message.asObservable();
  constructor(private loginService: LoginService) {}
  email = new FormControl(
    '',
    Validators.pattern(new RegExp(`^[\\w\\-\\.]+@[\\w\\.]+.[\\w]{2,}$`))
  );

  resetPassword() {
    this.loginService
      .forgetPassword(this.email.value)
      .subscribe((value: any) => {
        this.message.next(value?.message);
      });
  }
}
