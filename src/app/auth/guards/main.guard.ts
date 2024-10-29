import { Injectable } from '@angular/core';
import {
  Router,
  CanMatch,
  CanActivate,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanMatch, CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  isTokenValid(token: any): boolean {
    if (!token) return false;

    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return false;

    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  }

  canMatch(): boolean | Observable<boolean> {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token && !this.isTokenValid(token)) {
        localStorage.removeItem('token');
        localStorage.removeItem('idUser');
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
    return false;
  }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRole = route.data?.['role'];

    return this.userService.getProfile().pipe(
      map((data) => {
        if (data.role === requiredRole) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
