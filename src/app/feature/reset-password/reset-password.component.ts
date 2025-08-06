import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    RouterLink,
    NgIf,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  token: string = '';
  res: any = {};
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'] || '';
    });
  }
  passwordForm = this.fb.group(
    {
      password: new FormControl('', Validators.required),
      retypeNewpassword: new FormControl('', Validators.required),
    },
    { validators: this.resetPasswordValidation }
  );

  reset(value: string) {
    this.loginService.resetPassword(this.token, value).subscribe((res) => {
      this.res = res;
    });
  }

  resetPasswordValidation(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const retypePassword = group.get('retypeNewpassword')?.value;
    if (password !== retypePassword) {
      group.get('retypeNewpassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }
}
