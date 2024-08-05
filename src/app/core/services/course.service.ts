import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../shared/Routes';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = API_ROUTES.COURSE;

  constructor(private http:HttpClient) { }

  getCourses():Observable<any>{
    const idUser = localStorage.getItem('idUser');

    if (!idUser) {
      return new Observable<any>();
    }
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
