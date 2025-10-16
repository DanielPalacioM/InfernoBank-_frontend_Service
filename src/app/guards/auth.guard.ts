import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // o 'userId', según lo que guardes

    if (token) {
      return true; // ✅ acceso permitido
    } else {
      console.warn('🚫 Acceso denegado. Debe iniciar sesión.');
      this.router.navigate(['/login']);
      return false; // ❌ acceso bloqueado
    }
  }
}
