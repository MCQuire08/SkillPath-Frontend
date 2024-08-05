// header.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { LoginService } from '../../../auth/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileImageUrl: string = '';
  isProfileMenuOpen = false;

  constructor(private router: Router, private userService: UserService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.loadProfileImage();
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  closeProfileMenu() {
    this.isProfileMenuOpen = false;
  }

  user(): void {
    this.router.navigate(['/user']);
  }

  category(): void {
    this.router.navigate(['/category']);
  }

  course(): void{
    this.router.navigate(['/course']);
  }

  home(): void{
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.loginService.logout();
  }

  loadProfileImage() {
    this.userService.getProfile().subscribe(
      (profile: any) => {
        if (profile && profile.linkImage) {
          this.profileImageUrl = profile.linkImage;
        }
      },
      error => {
        console.error('Error al obtener la imagen del perfil:', error);
      }
    );
  }
}
