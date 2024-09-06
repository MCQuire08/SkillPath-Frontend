import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl = 'https://api.cloudinary.com/v1_1/dgh8ptahc/upload';

  constructor(private http: HttpClient) {}

  uploadImg(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
