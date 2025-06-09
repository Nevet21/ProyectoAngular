import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Permission } from '../../models/permission';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // <-- este es el que falta


@Component({
  selector: 'app-permission-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './permission-dialog.html',
  styleUrls: ['./permission-dialog.scss']
})
export class PermissionDialog {
  editable: boolean;
  permission: Permission;
  httpMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  entities = ['User', 'Role', 'Permission'];  // <-- Cambié el nombre a 'entities'

  constructor(
    public dialogRef: MatDialogRef<PermissionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { permission: Permission; editable: boolean }
  ) {
    this.editable = data.editable;
    this.permission = { ...data.permission }; // Copia para no mutar directamente
  }

  save(): void {
    this.dialogRef.close(this.permission);
  }

  close(): void {
    this.dialogRef.close();
  }
}
