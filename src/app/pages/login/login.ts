import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login implements OnInit {
  form!: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userId: [null, Validators.required],
      password: ['', Validators.required], // solo para validar que se ingrese algo
    });
  }

  login() {
    if (this.form.invalid) {
      this.error = 'Por favor, ingresa ID y contraseña';
      return;
    }

    const { userId } = this.form.value;

    // Simula datos fijos
    const fakeSession = {
      token: 'fake-token-' + userId,
      expiration: '2099-12-31T23:59:59',
      state: 'active',
      user_id: userId,
    };

    const fakeUser = {
      id: userId,
      name: 'Usuario ' + userId,
    };

    // Simula roles asignados al usuario (puedes personalizar aquí el role_id)
    const fakeRoles = [
      { role_id: 1, role_name: 'Admin' },
    ];

    // Simula permisos que tu guard espera, para role 1 por ejemplo
    const fakePermissions = [
      { url: '/user/list' },
      { url: '/user/create' },
      { url: '/permissions/list' },
    ];

    // Guarda todo en sessionStorage
    sessionStorage.setItem('session', JSON.stringify(fakeSession));
    sessionStorage.setItem('user', JSON.stringify(fakeUser));
    sessionStorage.setItem('roles', JSON.stringify(fakeRoles));
    sessionStorage.setItem('permissions', JSON.stringify(fakePermissions));

    this.router.navigate(['/user/list']); // o a donde quieras
  }
}
