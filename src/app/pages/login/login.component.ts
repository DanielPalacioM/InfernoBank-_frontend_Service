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

  /** 🚀 Iniciar sesión del usuario */
  loginUser(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('✅ Respuesta del backend:', res);

        const token = res?.token;
        const userId = res?.userId;

        if (token) {
          localStorage.setItem('token', token);
          console.log('🔑 Token guardado correctamente.');
        }

        if (userId) {
          localStorage.setItem('userId', userId);
          console.log('🆔 UserID guardado correctamente.');
        }

        // ✅ Redirigir al Home
        this.router.navigate(['/home']);
        this.loading = false;
      },
      error: (err: any) => {
        console.error('💥 Error en login:', err);
        this.loading = false;
      }
    });
  }
}
