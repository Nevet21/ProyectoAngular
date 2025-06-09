import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile-service';
import { UserService } from '../../services/user-service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../models/user';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { enviroment } from '../../../enviroments/enviroment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  userId!: number;
  profileId?: number;
  photoPreviewUrl?: string;
  selectedFile?: File;
  loading = false;
  isCreating = false;
  isEditing = false;
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;

this.form = this.fb.group({
  phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
  photo: [null] // ya no es obligatorio
});


    this.loadUser(this.userId);
    this.loadProfile();
  }

  loadUser(id: number) {
    this.userService.view(id).subscribe({
      next: (user) => this.user = user,
      error: () => this.user = { id, name: 'Usuario' } as User
    });
  }

  loadProfile() {
    this.loading = true;

    this.profileService.viewByUser(this.userId).pipe(
      catchError(error => {
        console.warn('No se encontró un perfil para este usuario.');
        this.isCreating = true;
        this.isEditing = true; // Permitir edición al crear
        this.form.enable();
        this.loading = false;
        return of(null);
      })
    ).subscribe(profile => {
      if (profile) {
        this.profileId = profile.id;
        this.form.patchValue({ phone: profile.phone });

      if (profile.photo) {
    this.photoPreviewUrl = profile.photo.startsWith('http')
    ? profile.photo
    : `http://localhost:5000/api/${profile.photo}`;
    console.log(this.photoPreviewUrl)
}


        this.isCreating = false;
        this.isEditing = false;
        this.form.disable();
      }
      this.loading = false;
    });
  }

  enableEdit() {
    this.isEditing = true;
    this.form.enable();
  }

 onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    this.form.patchValue({ photo: file });

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.photoPreviewUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}


  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Por favor, completa todos los campos correctamente.', 'Cerrar', { duration: 3000 });
      return;
    }

    const phone = this.form.value.phone;
    const photo = this.selectedFile;

    if (this.isCreating) {
      this.profileService.create(this.userId, { phone, photo }).subscribe({
        next: () => {
          this.snackBar.open('Perfil creado', 'Cerrar', { duration: 3000 });
          this.isCreating = false;
          this.isEditing = false;
          this.form.disable();
          this.loadProfile();
        },
        error: () => this.snackBar.open('Error al crear perfil', 'Cerrar', { duration: 3000 })
      });
    } else if (this.profileId) {
      this.profileService.update(this.profileId, { phone, photo }).subscribe({
        next: () => {
          this.snackBar.open('Perfil actualizado', 'Cerrar', { duration: 3000 });
          this.isEditing = false;
          this.form.disable();
          this.loadProfile();
        },
        error: () => this.snackBar.open('Error al actualizar perfil', 'Cerrar', { duration: 3000 })
      });
    }
  }
}
