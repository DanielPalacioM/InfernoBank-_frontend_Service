import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api/api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: ApiService) {}

  // Obtener perfil del usuario
  getProfile(userId: string): Observable<any> {
    return this.api.get('users', `/profile/${userId}`);
  }

  // Crear usuario nuevo
  createUser(data: any): Observable<any> {
    return this.api.post('users', '/user', data);
  }

  // Login de usuario
  login(data: { email: string; password: string }): Observable<any> {
    return this.api.post('users', '/login', data);
  }

  // Actualizar perfil (usa PUT /PROFILE/{userId})
  updateProfile(userId: string, data: any): Observable<any> {
    return this.api.put('users', `/PROFILE/${userId}`, data);
  }

  // Subir avatar (usa POST /profile/{userId}/avatar)
  uploadAvatar(userId: string, avatar: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', avatar);
    return this.api.post('users', `/profile/${userId}/avatar`, formData);
  }
}
