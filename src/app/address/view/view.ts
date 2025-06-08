import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '../../services/address-service';
import { Address } from '../../models/address';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user-service';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-address-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './view.html',
  styleUrls: ['./view.scss']
})
export class AddressViewComponent implements OnInit {
  address?: Address;
  userId: number;
  isLoading = false;
  errorMessage?: string;
  userName?: string;
  userLoading = false;
  addressForm: FormGroup;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      number: ['', Validators.required],
      latitude: [''],
      longitude: ['']
    });
  }

  ngOnInit(): void {
    this.loadUser();
    this.loadAddress();
  }

  loadUser(): void {
    this.userLoading = true;
    this.userService.view(this.userId).subscribe({
      next: (user: User) => {
        this.userName = user.name;
        this.userLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Error al cargar usuario', 'Cerrar', { duration: 3000 });
        this.userLoading = false;
      }
    });
  }

  loadAddress(): void {
    this.isLoading = true;
    this.errorMessage = undefined;
    
    this.addressService.getByUserId(this.userId).subscribe({
      next: (address: Address) => {
        this.address = address;
        this.isLoading = false;
        if (!address) {
          this.isEditing = true;
        }
      },
      error: (err: string) => {
        if (err.includes('no encontrada')) {
          this.isEditing = true;
        } else {
          this.errorMessage = err;
          this.snackBar.open(err, 'Cerrar', { duration: 3000 });
        }
        this.isLoading = false;
      }
    });
  }

  saveAddress(): void {
    if (this.addressForm.invalid) {
      this.snackBar.open('Por favor complete los campos requeridos', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    const addressData = this.addressForm.value;

    if (this.address) {
      // Actualizar dirección existente
      this.addressService.update({ ...addressData, id: this.address.id }).subscribe({
        next: (updatedAddress) => {
          this.address = updatedAddress;
          this.isEditing = false;
          this.snackBar.open('Dirección actualizada exitosamente', 'Cerrar', { duration: 3000 });
          this.isLoading = false;
        },
        error: (err) => {
          this.snackBar.open('Error al actualizar dirección', 'Cerrar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    } else {
      // Crear nueva dirección
      this.addressService.create(addressData, this.userId).subscribe({
        next: (newAddress) => {
          this.address = newAddress;
          this.isEditing = false;
          this.snackBar.open('Dirección creada exitosamente', 'Cerrar', { duration: 3000 });
          this.isLoading = false;
        },
        error: (err) => {
          this.snackBar.open('Error al crear dirección', 'Cerrar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  startEditing(): void {
    if (this.address) {
      this.addressForm.patchValue({
        street: this.address.street,
        number: this.address.number,
        latitude: this.address.latitude,
        longitude: this.address.longitude
      });
    }
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.isEditing = false;
  }
}