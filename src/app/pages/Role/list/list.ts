import { Component } from '@angular/core';
import { RoleService } from '../../../services/role-service';
import { Role } from '../../../models/role';
import { EntityAction } from '../../../models/entity-action';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { EntityTableComponent } from '../../../components/entity-table/entity-table';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, EntityTableComponent],
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class RoleListComponent {
  roles: Role[] = [];
  isLoading = false;

  // Configuración para EntityTable
  displayedColumns = ['id', 'name', 'description'];
  columnsLabels = { id: 'ID', name: 'Nombre', description: 'Descripción' };
  
  actions: EntityAction[] = [
    { label: 'Editar', route: (row) => `/role/manage/${row.id}`, color: 'primary', icon: 'edit' },
    { 
      label: 'Eliminar', 
      action: (row) => this.deleteRole(row.id), 
      isDelete: true,
      icon: 'delete' 
    },
    { 
      label: 'Permisos', 
      route: (row) => `/role/${row.id}/permissions`,
      icon: 'lock' 
    }
  ];

  constructor(
    private roleService: RoleService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.isLoading = true;
    this.roleService.list().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Error al cargar roles', 'Cerrar', { duration: 3000 });
      }
    });
  }

  deleteRole(id: number): void {
    if (confirm('¿Estás seguro de eliminar este rol?')) {
      this.roleService.delete(id).subscribe({
        next: () => {
          this.roles = this.roles.filter(role => role.id !== id);
          this.snackBar.open('Rol eliminado', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          this.snackBar.open('Error al eliminar rol', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/role/manage/new']);
  }
}