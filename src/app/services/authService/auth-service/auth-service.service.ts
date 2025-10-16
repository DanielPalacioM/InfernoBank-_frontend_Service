import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersApi = environment.endpoints.users;
  private registerApi = environment.endpoints.register; // <-- nuevo

  constructor(private http: HttpClient) {}

  /** 🔐 Login */
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.usersApi}/login`, data);
  }

  register(data: any): Observable<any> {
  return this.http.post(`${this.registerApi}/user`, data, {
    headers: { 'Content-Type': 'application/json' },
    responseType: 'text'  // <-- 👈 importantísimo
  });
}



}
