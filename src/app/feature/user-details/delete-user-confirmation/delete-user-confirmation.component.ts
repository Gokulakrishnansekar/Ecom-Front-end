import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { UsersModel } from 'src/app/model/users.model';

@Component({
  selector: 'app-delete-user-confirmation',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-user-confirmation.component.html',
  styleUrls: ['./delete-user-confirmation.component.scss'],
})
export class DeleteUserConfirmationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UsersModel,
    public dialogRef: MatDialogRef<DeleteUserConfirmationComponent>
  ) {}

  onCancel() {
    this.dialogRef.close();
  }
}
