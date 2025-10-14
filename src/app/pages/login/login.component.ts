import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth-service/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginUser(): void {
  if (this.loginForm.invalid) return;

  this.loading = true;

  this.authService.login(this.loginForm.value).subscribe({
    next: (res: any) => {
      console.log('✅ Respuesta del backend:', res);

      // Aquí Angular ya parsea el JSON automáticamente
      const token = res?.token;

      if (token) {
        localStorage.setItem('token', token);
        alert('Inicio de sesión exitoso ✅');
        console.log('Token recibido:', token);

        this.router.navigate(['/home']);
      } else {
        alert('El servidor no devolvió un token válido ❌');
        console.warn('Token no encontrado en la respuesta:', res);
      }

      this.loading = false;
    },
    error: (err: any) => {
      console.error('💥 Error en login:', err);
      alert('Error al iniciar sesión ❌');
      this.loading = false;
    }
  });
}
}
