import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserRoleService } from '../../../services/user-role-service';
import { UserService } from '../../../services/user-service';
import { RoleService } from '../../../services/role-service';

import { UserRole } from '../../../models/user-role';
import { User } from '../../../models/user';

import { EntityTableComponent } from '../../../components/entity-table/entity-table';

import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import AssignRole from '../../../components/assign-role/assign-role';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EntityTableComponent,
    MatIconModule,
    MatDialogModule
  ],
})
export class UserRoleListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userRoleService = inject(UserRoleService);
  private userService = inject(UserService);
  private roleService = inject(RoleService);
  private dialog = inject(MatDialog);

  dataSource: any[] = [];

  roleId!: number;
  roleName = '';
  userRoles: UserRole[] = [];
  users: { [key: number]: User } = {};
  isLoading = true;
  errorMessage: string | null = null;

  columns = ['user_id', 'name', 'email', 'startAt'];
  columnsLabels = {
    user_id: 'ID Usuario',
    name: 'Nombre',
    email: 'Email',
    startAt: 'Fecha Asignación'
  };

  rowActions = [
    {
      label: 'Remove Rol',
      tooltip: 'Eliminar rol',
      action: this.removeUserRole.bind(this),
      isDelete: true
    }
  ];

  get tableTitle() {
    return `${this.roleName} - Usuarios`;
  }

  ngOnInit(): void {
    console.log('Row Actions:', this.rowActions);
    this.route.params.subscribe(params => {
      this.roleId = +params['roleId'];
      this.loadRoleName(this.roleId);
      this.loadUserRolesAndUsers();
    });
  }

  loadRoleName(roleId: number) {
    this.roleService.view(roleId).subscribe({
      next: (role) => {
        this.roleName = role.name ?? 'Rol Desconocido';
      },
      error: () => {
        this.roleName = 'Rol Desconocido';
      }
    });
  }

loadUserRolesAndUsers(): void {
  this.isLoading = true;
  this.errorMessage = null;

  this.userRoleService.getByRole(this.roleId).subscribe({
    next: (userRoles) => {
      this.userRoles = userRoles;

      if (!userRoles || userRoles.length === 0) {
        this.dataSource = [];
        this.isLoading = false;
        this.errorMessage = 'No hay usuarios asignados a este rol.';
        return;
      }

      const uniqueUserIds = [...new Set(userRoles.map(ur => ur.user_id))];
      const userRequests = uniqueUserIds.map(id => this.userService.view(id));

      forkJoin(userRequests).subscribe({
        next: (users) => {
          users.forEach(user => {
            if (user.id) this.users[user.id] = user;
          });

          this.dataSource = this.userRoles.map(ur => ({
            userRoleId: ur.id,
            user_id: ur.user_id,
            name: this.users[ur.user_id]?.name || 'N/A',
            email: this.users[ur.user_id]?.email || 'N/A',
            startAt: ur.startAt
          }));

          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Error cargando los datos de los usuarios.';
          this.isLoading = false;
        }
      });
    },
    error: () => {
      this.errorMessage = 'Error al cargar los roles de usuario.';
      this.isLoading = false;
    }
  });
}


  removeUserRole(row: any) {
    console.log('removeUserRole called with row:', row); 
    const userRoleId = row.userRoleId;
    const userName = row.name;

    if (!userRoleId) return;

    Swal.fire({
      title: 'Eliminar',
      text: `¿Estás seguro de que deseas eliminar el rol asignado a ${userName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.userRoleService.delete(userRoleId).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'El rol fue eliminado correctamente.', 'success');
            this.loadUserRolesAndUsers();
          },
          error: () => {
            Swal.fire('Error', 'Error al eliminar el rol del usuario.', 'error');
          }
        });
      }
    });
  }

  openAddUserModal(): void {
    const dialogRef = this.dialog.open(AssignRole, {
      width: '400px',
      data: {
        roleId: this.roleId,
        assignedUserIds: this.userRoles.map(ur => ur.user_id)
      }
    });

    dialogRef.afterClosed().subscribe((selectedUserId: number | null) => {
      if (selectedUserId) {
        this.userRoleService.create(selectedUserId, this.roleId, {
          startAt: new Date().toISOString(),
          endAt: ''
        }).subscribe({
          next: () => {
            this.loadUserRolesAndUsers();
          },
          error: () => {
            Swal.fire('Error', 'Error al asignar usuario al rol', 'error');
          }
        });
      }
    });
  }
}
