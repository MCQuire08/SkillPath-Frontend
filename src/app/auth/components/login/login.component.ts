import { Component } from '@angular/core';
import {LoginService} from '../../service/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: LoginService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (success) => {
        if (success) {
          Swal.fire({
            title: 'Inicio de sesión correcto',
            text: 'Bienvenido',
            icon: 'success'
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
          });
        } else {
          Swal.fire({
            title: 'Inicio de sesión inválido',
            text: 'Contraseña incorrecta',
            icon: 'error'
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}