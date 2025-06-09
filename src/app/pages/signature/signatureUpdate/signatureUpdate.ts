import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DigitalSignatureService } from '../../../services/digital-signature-service';
import { ActivatedRoute, RouterModule } from '@angular/router';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { User } from '../../../models/user';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-signature',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterModule
  ],
  templateUrl: './signatureUpdate.html',
  styleUrls: ['./signatureUpdate.scss']
})
export class Signature implements OnInit {
  selectedFile: File | null = null;
  signatureId = 1;
  userId!: number;
  user?: User;

  constructor(
    private signatureService: DigitalSignatureService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadUser();
  }

  loadUser() {
    this.userService.view(this.userId).subscribe({
      next: user => this.user = user,
      error: () => alert('Failed to load user.')
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onUpdate() {
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    this.signatureService.updateFormData(this.signatureId, this.selectedFile)
      .subscribe({
        next: () => alert('Signature updated successfully!'),
        error: () => alert('Failed to update signature.')
      });
  }
}
