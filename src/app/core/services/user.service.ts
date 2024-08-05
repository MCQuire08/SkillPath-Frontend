import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    const idUser = localStorage.getItem('idUser');
    const token = localStorage.getItem('token');

    if (!idUser || !token) {
      return new Observable<any>();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/${idUser}`, { headers });
  }

  getUsers(): Observable<any>{
    const idUser = localStorage.getItem('idUser');
    const token = localStorage.getItem('token');

    if (!idUser || !token) {
      return new Observable<any>();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/`, { headers });
  }
}
