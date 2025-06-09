import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<SocialUser | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private auth: SocialAuthService) {
    this.auth.authState.subscribe(user => this.userSubject.next(user));
  }

  signInWithGoogle() {
    return this.auth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.auth.signOut();
    this.userSubject.next(null);
  }

  getUser() {
    return this.userSubject.value;
  }
}
