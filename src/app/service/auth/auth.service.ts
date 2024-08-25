import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private authUrl = environment.apiUrl + '/api/user';

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<any>(
      savedUser ? JSON.parse(savedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  // Register a new user
  register(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user);
  }

  // Login an existing user
  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.authUrl}/login`, { email, password })
      .pipe(
        tap((user) => {
          // Save user details and JWT token to localStorage
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
  }

  // Logout the current user
  logout(): void {
    // Remove user from local storage to log user out
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  // Get the current user
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }
}
