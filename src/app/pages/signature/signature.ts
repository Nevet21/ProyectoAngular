import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { DigitalSignatureService } from '../../services/digital-signature-service';
import { UserService } from '../../services/user-service';
import { DigitalSignature } from '../../models/digital-signature';
import { User } from '../../models/user';
import { enviroment } from '../../../enviroments/enviroment';
import { DynamicFormComponent } from "../../components/dynamic-form/dynamic-form/dynamic-form";

import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-signature',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    DynamicFormComponent,
    RouterModule
],
  templateUrl: './signature.html',
  styleUrls: ['./signature.scss']
})
export class SignatureComponent implements OnInit {
  userId!: number;
  signature?: DigitalSignature;
  user?: User;
  selectedFile?: File;
  showUpdateForm = false;

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private signatureService: DigitalSignatureService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
    this.loadSignature();
  }

  loadUser() {
    this.userService.view(this.userId).subscribe({
      next: user => this.user = user
    });
  }

  loadSignature() {
    this.signatureService.getByUserId(this.userId).subscribe({
      next: signature => this.signature = signature,
      error: () => this.signature = undefined
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      if (this.signature) {
        this.updateSignature();
      } else {
        this.createSignature();
      }
    }
  }

  createSignature() {
    if (!this.selectedFile) return;
    this.signatureService.create(this.userId, this.selectedFile).subscribe({
      next: sig => {
        this.signature = sig;
        this.selectedFile = undefined;
      }
    });
  }

updateSignature() {
  if (!this.selectedFile || !this.signature?.id) return;

  this.signatureService.updateFormData(this.signature.id, this.selectedFile).subscribe({
    next: updatedSig => {
      this.signature = updatedSig;
      this.selectedFile = undefined;
    },
    error: err => {
      // Manejo de errores
      console.error('Error actualizando la firma', err);
    }
  });
}


  triggerFileInput() {
    this.fileInputRef.nativeElement.click();
  }

  get signatureImageUrl(): string {
     console.log(`${enviroment.url_ms_security}/${this.signature?.photo}`)
    return `${enviroment.url_ms_security}/${this.signature?.photo}`;
   
  }
}
