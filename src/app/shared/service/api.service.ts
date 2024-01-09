import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseURL = 'http://103.13.31.37:17444/api';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    const url = `${this.baseURL}/my/profile`;
    return this.http.get(url);
  }

  getTasks(): Observable<any> {
    const url = `${this.baseURL}/tasks`;
    return this.http.get(url);
  }

  getTaskById(id: number): Observable<any> {
    const url = `${this.baseURL}/tasks/${id}`;
    return this.http.get(url);
  }
}
