import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../shared/Routes';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private apiUrl = API_ROUTES.PLANEVIDENCE;
  private apiPlanUrl = API_ROUTES.PLAN;

  constructor(private http: HttpClient) {}

  createPlanEvidence(idPlan: number, link: string): Observable<any> {
    const idUser = localStorage.getItem('idUser');

    if (!idUser) {
      return new Observable<any>();
    }

    const body = {
      idPlan: idPlan,
      link: link,
    };

    return this.http.post<any>(this.apiUrl, body);
  }

  getPlans(): Observable<any> {
    const idUser = localStorage.getItem('idUser');

    if (!idUser) {
      return new Observable<any>();
    }
    return this.http.get<any>(`${this.apiPlanUrl}`);
  }
}
