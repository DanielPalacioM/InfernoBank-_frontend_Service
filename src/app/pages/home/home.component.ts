import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/userService/userService/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  balance: number | null = null;
  loading = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('❌ No se encontró el userId en localStorage.');
      this.router.navigate(['/login']);
      return;
    }

    this.userService.getProfile(userId).subscribe({
      next: (res) => {
        console.log('✅ Perfil obtenido:', res);
        this.balance = res.balance ?? 0;
        this.loading = false;
      },
      error: (err) => {
        console.error('💥 Error obteniendo perfil:', err);
        this.loading = false;
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
