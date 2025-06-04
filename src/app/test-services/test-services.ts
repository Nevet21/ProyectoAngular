import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // <-- Añade esto
import { User } from '../models/user';
import { Role } from '../models/role';
import { UserService } from '../services/user-service';
import { RoleService } from '../services/role-service';

// Angular Material modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-test-services',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule, // <-- ¡Añade esto aquí!
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './test-services.html'
})
export class TestServices implements OnInit {
  users: User[] = [];
  roles: Role[] = [];

  userDisplayedColumns = ['id', 'name', 'email'];
  roleDisplayedColumns = ['id', 'name'];

  constructor(
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.userService.list().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error loading users:', err)
    });
  }

  loadRoles(): void {
    this.roleService.list().subscribe({
      next: (data) => (this.roles = data),
      error: (err) => console.error('Error loading roles:', err)
    });
  }
}

