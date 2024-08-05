import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../shared/Routes';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = API_ROUTES.CATEGORY;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any>{
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
