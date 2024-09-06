import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../shared/Routes';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = API_ROUTES.PLAN; 

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any> {
    const idUser = localStorage.getItem('idUser');

    if (!idUser) {
      return new Observable<any>();
    }

    return this.http.get(`${this.apiUrl}/getCoursesByUser/${idUser}`);
  }

  updateProgress(courseId: number, newProgress: number): Observable<any> {
    const idUser = localStorage.getItem('idUser');

    if (!idUser) {
      return new Observable<any>();
    }

    const body = {
      newProgress: newProgress
    };

    return this.http.put(`${this.apiUrl}/updateProgress/${courseId}`, body);
  }
}
