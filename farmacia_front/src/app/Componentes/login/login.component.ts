import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.router.navigate(['/camfarm']);
        },
        error: () => alert('Error de login ❌'),
      });
  }
}
