import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

/**
 * Service for working with authorization.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  public constructor(private readonly auth: Auth) {}

  /** IsUserAuthorized flag. */
  public readonly isUserAuthorized$ = new BehaviorSubject<Boolean>(false);

  /**
   * Login through google account.
   */
  public login(): void {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider).then(() => {
      this.isUserAuthorized$.next(true);
    });
  }

  /**
   * Logout through google account.
   */
  public logout(): void {
    this.auth.signOut().then(() => {
      this.isUserAuthorized$.next(false);
    });
  }
}