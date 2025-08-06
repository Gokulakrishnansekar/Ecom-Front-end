import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from 'src/app/core/services/user.service';
import { LayoutComponent } from 'src/app/layout/layout/layout.component';
import { LoginModel } from 'src/app/model/login.model';
import { MatTableModule } from '@angular/material/table';
import { UsersModel } from 'src/app/model/users.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { DeleteUserConfirmationComponent } from './delete-user-confirmation/delete-user-confirmation.component';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    LayoutComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],

  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailComponent implements OnInit {
  dataSource: UsersModel[] = [];
  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getUserdetails();
  }

  getUserdetails() {
    this.userService.getUsers().subscribe((value: UsersModel[]) => {
      this.dataSource = value;
    });
  }

  displayedColumns: string[] = ['Name', 'Mail', 'Role', 'Action'];
  addUser() {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    dialogRef.afterClosed().subscribe((value) => {
      if (value) this.registerUser(value);
    });
  }

  registerUser(user: UsersModel) {
    this.userService.registerUser(user).subscribe((message) => {
      this.notificationService.openSnackBar(message.message);
      this.getUserdetails();
    });
  }
  deleteConfirmation(user: UsersModel) {
    const dialogRef = this.dialog.open(DeleteUserConfirmationComponent, {
      data: user,
    });
    dialogRef.afterClosed().subscribe((value) => {
      if (value) this.deleteUser(value);
    });
  }

  deleteUser(user: UsersModel) {
    this.userService.deleteUsersbyId(user.id).subscribe(() => {
      this.notificationService.openSnackBar('deleted successfully');
      this.getUserdetails();
    });
  }
}
