import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600 mb-1">Usuario</label>
          <input 
            [(ngModel)]="username"
            type="text"
            placeholder="Ingrese su usuario"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-600 mb-1">Contraseña</label>
          <input 
            [(ngModel)]="password"
            type="password"
            placeholder="Ingrese su contraseña"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
        </div>

        <button 
          (click)="login()"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
        >
          Ingresar
        </button>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/camfarm']);
      },
      error: () => alert('Error de login ❌')
    });
  }
}
