import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PasswordService } from '../../services/password-service';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
import { Password } from '../../models/password';

@Component({
  selector: 'app-password-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './password.html',
  styleUrls: ['./password.scss']
})
export class PasswordCreateComponent {
  userId: number;
  user?: User;
  currentPassword?: Password;

  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private passwordService = inject(PasswordService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    content: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/)
      ]
    ]
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('userId');
    this.userId = idParam ? Number(idParam) : 0;

    if (this.userId) {
      this.loadUser(this.userId);
    } else {
      this.snackBar.open('ID de usuario inválido en la URL', 'Cerrar', { duration: 3000 });
    }
  }

  loadUser(id: number): void {
    this.userService.view(id).subscribe({
      next: (user) => {
        this.user = user;

        // También cargamos la contraseña (si existe)
        this.passwordService.listByUserId(this.userId).subscribe({
          next: (passwords) => {
            this.currentPassword = passwords.length > 0 ? passwords[0] : undefined;
          },
          error: () => {
            this.snackBar.open('Error al cargar la contraseña', 'Cerrar', { duration: 3000 });
          }
        });
      },
      error: () => {
        this.snackBar.open('Error al cargar el usuario', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid || !this.userId) return;

    const now = new Date();
    const end = new Date(now);
    end.setFullYear(now.getFullYear() + 1);

    const payload: Password = {
      content: this.form.value.content ?? '',
      startAt: now.toISOString().slice(0, 19).replace('T', ' '),
      endAt: end.toISOString().slice(0, 19).replace('T', ' ')
    };

    if (this.currentPassword) {
      // Actualizar
      payload.id = this.currentPassword.id;
      this.passwordService.update(payload).subscribe({
        next: () => {
          this.snackBar.open('Contraseña actualizada con éxito', 'Cerrar', { duration: 3000 });
          this.loadUser(this.userId);
          this.form.reset();
        },
        error: () => {
          this.snackBar.open('Error al actualizar la contraseña', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      // Crear nueva
      this.passwordService.create(this.userId, payload).subscribe({
        next: () => {
          this.snackBar.open('Contraseña guardada con éxito', 'Cerrar', { duration: 3000 });
          this.loadUser(this.userId);
          this.form.reset();
        },
        error: () => {
          this.snackBar.open('Error al guardar la contraseña', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  deletePassword(): void {
    if (!this.currentPassword?.id) return;

    this.passwordService.delete(this.currentPassword.id).subscribe({
      next: () => {
        this.snackBar.open('Contraseña eliminada', 'Cerrar', { duration: 3000 });
        this.currentPassword = undefined;
        this.form.reset();
      },
      error: () => {
        this.snackBar.open('Error al eliminar la contraseña', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
