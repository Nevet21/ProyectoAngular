import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';

@Component({
  selector: 'assign-role',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatSelectModule, FormsModule, MatButtonModule],
  templateUrl: './assign-role.html',
  styleUrl: './assign-role.scss',
})
export default class AssignRole {
  private userService = inject(UserService);
  users: User[] = [];
  selectedUser: number | null = null;

  constructor(
    private dialogRef: MatDialogRef<AssignRole>,
    @Inject(MAT_DIALOG_DATA) public data: { assignedUserIds: number[] }
  ) {
    this.loadAvailableUsers();
  }

  loadAvailableUsers() {
    this.userService.list().subscribe((allUsers) => {
      this.users = allUsers.filter(user => user.id !== undefined && !this.data.assignedUserIds.includes(user.id!));

    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.selectedUser !== null) {
      this.dialogRef.close(this.selectedUser);
    }
  }
}

