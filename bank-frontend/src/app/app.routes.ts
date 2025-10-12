import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { CardsComponent } from './pages/cards/cards.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'cards', component: CardsComponent}
];
