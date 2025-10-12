import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../enviroments/enviroment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 👇 Cambiamos esto
  private apiUrl = `${environment.endpoints.users}/auth`;

  constructor(private http: HttpClient) {}

  /** 🔑 Registro de usuario */
  register(data: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    document: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  /** 🔐 Inicio de sesión */
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          if (res.user?.id) localStorage.setItem('userId', res.user.id);
        }
      })
    );
  }

  /** 🚪 Cerrar sesión */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  /** 🧾 Obtener token actual */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** ✅ Verificar si el usuario está logueado */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
