import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthDTO } from './DTOs/AuthDTO';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(authDTO: AuthDTO) {
    return this.http.post(`${this.apiUrl}/login`, authDTO, {
      responseType: 'text',
    });
  }
}
