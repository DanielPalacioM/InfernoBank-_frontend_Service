import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersApi = environment.endpoints.users;
  private registerApi = environment.endpoints.register;

  constructor(private http: HttpClient) {}

  /** 📝 Registro */
  register(data: {
    name: string;
    lastName: string;
    email: string;
    password: string;
    document: string;
  }): Observable<any> {
    return this.http.post(`${this.registerApi}/user`, data);
  }

  /** 🔐 Login */
  login(data: { email: string; password: string }): Observable<any> {
    console.log('📤 Enviando login:', data);
    return this.http.post(`${this.usersApi}/login`, data).pipe(
      tap((res: any) => {
        console.log('✅ Respuesta completa del backend:', res);

        // Guarda token si existe
        if (res?.token) {
          localStorage.setItem('token', res.token);
        } else if (res?.body?.token) {
          // por si AWS devuelve el token dentro de body
          localStorage.setItem('token', res.body.token);
        }

        // Guarda el userId si viene en la respuesta
        if (res?.user?.id) {
          localStorage.setItem('userId', res.user.id);
        } else if (res?.body?.user?.id) {
          localStorage.setItem('userId', res.body.user.id);
        }
      })
    );
  }

  /** 🚪 Cerrar sesión */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  /** 📦 Obtener token */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** 🔎 Verificar autenticación */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
