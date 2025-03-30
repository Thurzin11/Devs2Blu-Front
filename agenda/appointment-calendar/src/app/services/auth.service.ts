import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private http = inject(HttpClient);

  constructor() {}

  register(user: { name: string; email: string; password: string, role: string }): Observable<any> {
    return this.http.post('/api/register', user);
  }

  login(user: { email: string; password: string }): Observable<any> {
    return this.http
      .post('/api/login', user)
      .pipe(
        tap(({token}: any) => {
          this.doLoginUser(user.email, token );
        })
      );
  }

  isAuthenticated(): boolean{
    return  !!localStorage.getItem('token')
  }

  isLocationAuthenticaded(): boolean{
    return  localStorage.getItem('userRole') === 'admin'
  }

  doLoginUser(email: string, token: string) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(token: string) {
    try {
      localStorage.setItem('token', token);
      const payload = jwtDecode<any>(token);
      localStorage.setItem('userId', payload.id);
      localStorage.setItem('userRole', payload.role);
      localStorage.setItem('username', payload.username);
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
    }
  }

  getUserRole(): string {
    return localStorage.getItem('userRole') || '';
  }

  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  logout(){
    localStorage.clear();
    this.isAuthenticatedSubject.next(false);
  }
}
