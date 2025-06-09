import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionService } from '../../services/permission-service';
import { Permission } from '../../models/permission';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PermissionDialog } from '../../components/permission-dialog.ts/permission-dialog';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './permissions.html',
  styleUrls: ['./permissions.scss']
})
export class Permissions implements OnInit {
  permissions: Permission[] = [];

  constructor(
    private permissionService: PermissionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions(): void {
    this.permissionService.list().subscribe((data) => {
      this.permissions = data;
    });
  }

  create(): void {
    const dialogRef = this.dialog.open(PermissionDialog, {
      width: '400px',
      data: {
        permission: { url: '', method: '', entity: '' },
        editable: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.permissionService.create(result).subscribe(created => {
          this.permissions.push(created);
        });
      }
    });
  }

  view(id?: number): void {
    if (!id) return;
    this.permissionService.view(id).subscribe(permission => {
      this.dialog.open(PermissionDialog, {
        width: '400px',
        data: {
          permission,
          editable: false
        }
      });
    });
  }

  update(id?: number): void {
    if (!id) return;
    this.permissionService.view(id).subscribe(permission => {
      const dialogRef = this.dialog.open(PermissionDialog, {
        width: '400px',
        data: {
          permission,
          editable: true
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.permissionService.update(result).subscribe(updated => {
            const index = this.permissions.findIndex(p => p.id === updated.id);
            if (index > -1) {
              this.permissions[index] = updated;
            }
          });
        }
      });
    });
  }

  delete(id?: number): void {
    if (!id) return;
    this.permissionService.delete(id).subscribe(() => {
      this.permissions = this.permissions.filter(p => p.id !== id);
    });
  }
}
