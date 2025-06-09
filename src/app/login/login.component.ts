import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule],
  template: `
    <div class="login">
      <button (click)="login()">Iniciar sesión con Google</button>
    </div>
  `
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.signInWithGoogle().then(() => this.router.navigate(['/dashboard']));
  }
}
