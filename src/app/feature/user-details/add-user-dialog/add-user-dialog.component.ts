import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoginModel } from 'src/app/model/login.model';
import { Roles } from 'src/app/model/roles.model';
import { UsersModel } from 'src/app/model/users.model';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent implements OnInit {
  userForm: FormGroup;
  roles = Object.values(Roles);
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserDialogComponent>
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group(new LoginModelForm(new UsersModel()));
  }

  onClose() {
    this.dialogRef.close();
  }
}

export class LoginModelForm {
  constructor(
    model: UsersModel,
    public username = new FormControl<string>(
      model.username || '',
      Validators.required
    ),
    public mail = new FormControl<string>(model.mail || '', [
      Validators.pattern(new RegExp(`^[\\w\\-\\.]+@[\\w\\.]+\\.[\\w]{2,}$`)),
      Validators.required,
    ]),
    public roles = new FormControl<Roles[]>(
      model.roles || [],
      Validators.required
    )
  ) {}
}
