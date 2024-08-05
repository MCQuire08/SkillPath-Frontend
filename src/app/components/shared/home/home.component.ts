import { Component } from '@angular/core';
import { ModalCourseComponent } from './modal-course/modal-course.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../../core/services/home.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalCourseComponent, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  courses:any[] = [];

  constructor(private courseService: HomeService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe(
      (data) => {
        this.courses = data;
        console.log("Data", data);
      },
      (error) => {
        console.error('Error al cargar los cursos', error);
      }
    );
  }
  
}
