import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';
import { from, Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Public observables
  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private auth: Auth) {
    // Listen to auth state changes and update the subjects
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(!!user);
    });
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(email: string, password: string): Observable<any> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  // Synchronous method to get current auth state
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Get current user synchronously
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Observable method for compatibility
  isAuthenticatedObservable(): Observable<boolean> {
    return this.isAuthenticated$;
  }
}
