import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { API_ROUTES } from '../../core/shared/Routes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedIn: boolean = false;
  private apiUrl: string = API_ROUTES.LOGIN;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<boolean> {
    const credentials = { username, password };

    return this.http.post<any>(this.apiUrl, credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.isLoggedIn = true;
            localStorage.setItem('token', response.token);
            localStorage.setItem('idUser', response.id.toString());
          } else {
            this.isLoggedIn = false;
          }
        }),
        map(response => !!response.token), 
        catchError(this.handleError<boolean>('login', false))
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('idUser');
    this.router.navigate(['/login']);
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Tu sesión ha sido cerrada correctamente.',
    });
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
