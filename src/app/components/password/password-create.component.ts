import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PasswordService } from '../../services/password-service'; // Asegúrate de tener este servicio implementado

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
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  passwordService = inject(PasswordService);
  snackBar = inject(MatSnackBar);

  userId = Number(this.route.snapshot.paramMap.get('userId'));
  form: FormGroup = this.fb.group({
    content: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    const now = new Date();
    const end = new Date(now);
    end.setFullYear(now.getFullYear() + 1);

    const payload = {
      content: this.form.value.content,
      startAt: now.toISOString().slice(0, 19).replace('T', ' '),
      endAt: end.toISOString().slice(0, 19).replace('T', ' ')
    };

    this.passwordService.create(this.userId, payload).subscribe({
      next: () => this.snackBar.open('Contraseña guardada con éxito', 'Cerrar', { duration: 3000 }),
      error: () => this.snackBar.open('Error al guardar la contraseña', 'Cerrar', { duration: 3000 })
    });
  }
}
