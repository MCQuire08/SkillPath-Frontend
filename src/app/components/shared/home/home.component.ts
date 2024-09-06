import { Component } from '@angular/core';
import { ModalCourseComponent } from './modal-course/modal-course.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../../core/services/home.service';
import { CourseService } from '../../../core/services/course.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalCourseComponent, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  courses:any[] = [];
  coursesLink:any[] = [];

  constructor(
    private courseService: HomeService,
    private courseLinksService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    forkJoin({
      courses: this.courseService.getCourses(),
      links: this.courseLinksService.getCoursesLink()
    }).subscribe(
      ({ courses, links }) => {

        this.courses = courses.map((course: { id: any, courseId:any; }) => {
          const link = links.find((link: { id: any; }) => link.id === course.courseId);
          return {
            ...course,
            link: link ? link.description : ''
          };
        });
        console.log("Data", this.courses);
      },
      (error) => {
        console.error('Error al cargar los cursos', error);
      }
    );
    // this.courseService.getCourses().subscribe(
    //   (data) => {
    //     this.courses = data;
    //     console.log("Data", data);
    //   },
    //   (error) => {
    //     console.error('Error al cargar los cursos', error);
    //   }
    // );
  }
  
}
