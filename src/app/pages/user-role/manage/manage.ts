import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { UserRoleService } from '../../../services/user-role-service';
import { User } from '../../../models/user';
import { UserRole } from '../../../models/user-role';
import { DynamicFormComponent } from '../../../components/dynamic-form/dynamic-form/dynamic-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-role-manage',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent],
  templateUrl: './manage.html'
})
export class UserRoleManageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private userRoleService = inject(UserRoleService);

  currentRoleId: string = '';
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  assignedRoles: UserRole[] = [];
  usersMap: { [userId: string]: User } = {};
  userOptions: { id: string, name: string }[] = [];

formConfig = [
  {
    name: 'user_id',
    label: 'Usuario',
    type: 'select',
    required: true,
    options: this.userOptions  // necesitas pasar esto desde el componente padre
  },
  { name: 'startAt', label: 'Inicio', type: 'date', required: true },
  { name: 'endAt', label: 'Fin', type: 'date', required: false },
];


  ngOnInit() {
    this.currentRoleId = this.route.snapshot.paramMap.get('roleId') || '';
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.errorMessage = null;

    this.userService.list().subscribe({
      next: (users) => {
        this.usersMap = {};
          this.userOptions = users
      .filter(u => u.id !== undefined && u.name !== undefined)
      .map(u => ({
        id: String(u.id),
        name: u.name!
      }));

              users.forEach((u) => {
        if (!u.id) return;
        this.usersMap[String(u.id)] = u;
      });


        this.userRoleService.getRolesByUser(Number(this.currentRoleId)).subscribe({
          next: (roles) => {
            this.assignedRoles = roles;
            this.isLoading = false;
          },
          error: () => {
            this.errorMessage = 'Error cargando roles asignados.';
            this.isLoading = false;
          }
        });
      },
      error: () => {
        this.errorMessage = 'Error cargando usuarios.';
        this.isLoading = false;
      }
    });
  }

onSubmitForm(data: any) {
  const userId = Number(data.user_id);
  const roleId = Number(this.currentRoleId);
  const dates = {
    startAt: data.startAt,
    endAt: data.endAt || null,
  };

  this.isLoading = true;
  this.userRoleService.create(userId, roleId, dates).subscribe({
    next: () => {
      this.successMessage = 'Usuario asignado correctamente al rol.';
      this.loadData();
      setTimeout(() => this.successMessage = null, 3000);
      this.isLoading = false;
    },
    error: () => {
      this.errorMessage = 'Error al asignar usuario.';
      this.isLoading = false;
    }
  });
}


  removeUserFromRole(userRoleId: string) {
    this.isLoading = true;
    this.userRoleService.delete(userRoleId).subscribe({
      next: () => {
        this.successMessage = 'Usuario removido del rol correctamente';
        this.loadData();
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: () => {
        this.errorMessage = 'Error al remover el usuario del rol.';
        this.isLoading = false;
      }
    });
  }
}
