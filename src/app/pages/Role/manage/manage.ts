import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../services/role-service';
import { Role } from '../../../models/role';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-role-manage',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule
  ],
  templateUrl: './manage.html',
  styleUrls: ['./manage.scss']
})
export class RoleManageComponent implements OnInit {
  roleForm: FormGroup;
  roleId?: number;
  isEditMode = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.roleId = Number(id);
      this.isEditMode = true;
      this.loadRole();
    }
  }

  loadRole(): void {
    this.isLoading = true;
    this.roleService.view(this.roleId!).subscribe({
      next: (role) => {
        this.roleForm.patchValue({
          name: role.name,
          description: role.description
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open('Error al cargar rol', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/role/list']);
      }
    });
  }

  onSubmit(): void {
    if (this.roleForm.invalid) return;

    this.isLoading = true;
    const roleData = this.roleForm.value;

    if (this.isEditMode) {
      this.roleService.update({ ...roleData, id: this.roleId }).subscribe({
        next: () => {
          this.snackBar.open('Rol actualizado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/role/list']);
        },
        error: (err) => {
          this.isLoading = false;
          this.snackBar.open('Error al actualizar rol', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.roleService.create(roleData).subscribe({
        next: () => {
          this.snackBar.open('Rol creado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/role/list']);
        },
        error: (err) => {
          this.isLoading = false;
          this.snackBar.open('Error al crear rol', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}