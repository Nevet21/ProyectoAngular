import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h2>Bienvenido</h2>
      <div *ngIf="user$ | async as user">
        <p>Nombre: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        <img [src]="user.photoUrl" alt="Foto del usuario" width="100" />
        <button (click)="logout()">Cerrar sesión</button>
      </div>
    </div>
  `
})
export class DashboardComponent {
  user$: Observable<SocialUser | null>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;
  }

  logout() {
    this.auth.signOut();
  }
}