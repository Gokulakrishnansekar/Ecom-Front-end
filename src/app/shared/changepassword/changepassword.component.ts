import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PasswordModel } from 'src/app/model/login.model';
@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangepasswordComponent {
  passwordForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ChangepasswordComponent>,
    private fb: FormBuilder
  ) {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        recurrentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  close() {
    this.dialogRef.close();
  }
  reset() {
    this.dialogRef.close(this.passwordForm.value);
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const currentPassword = group.get('currentPassword')?.value;
    const recurrentPassword = group.get('recurrentPassword')?.value;
    const newPassword = group.get('newPassword')?.value;
    if (currentPassword !== recurrentPassword) {
      group.get('recurrentPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else if (
      newPassword.length &&
      newPassword === recurrentPassword &&
      newPassword === currentPassword
    ) {
      group.get('newPassword')?.setErrors({ samePassword: true });
      return { samePassword: true };
    } else return null;
  }
}
