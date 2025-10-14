import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api/api.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: ApiService) {}

  createUser(data: any): Observable<any> {
    return this.api.post('register', '/user', data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.api.post('users', '/login', data);
  }

  /** ✅ Obtener perfil desde la URL real */
  getProfile(userId: string): Observable<any> {
    // la ruta base ya apunta a dev2/pr0file
    return this.api.get('profile', `/${userId}`);
  }

  updateProfile(userId: string, data: any): Observable<any> {
    return this.api.put('users', `/profile/${userId}`, data);
  }

  uploadAvatar(userId: string, avatar: File): Observable<any> {
    const formData = new FormData();
    formData.append('avatar', avatar);
    return this.api.post('users', `/profile/${userId}/avatar`, formData);
  }
}
