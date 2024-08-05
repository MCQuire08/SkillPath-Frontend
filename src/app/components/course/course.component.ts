import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../core/services/course.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  courses:any[] = [];

  constructor(private courseService:CourseService){}

  ngOnInit():void{
    this.loadCourses();
  }

  loadCourses(){
    this.courseService.getCourses().subscribe(
      (data) => {
        this.courses = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al cargar las cursos', error);
      }
    )
  }

}
