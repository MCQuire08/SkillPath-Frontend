import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { UserService } from '../../core/services/user.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  users:any[] = [];
  
  constructor(private userService:UserService){}

  ngOnInit(): void{
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al cargar los usuarios', error);
      }
    )
  }
}
