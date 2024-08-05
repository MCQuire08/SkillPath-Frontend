import { Component,Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalProgressComponent } from '../modal-progress/modal-progress.component';

@Component({
  selector: 'app-modal-course',
  standalone: true,
  imports: [CommonModule,ModalProgressComponent],
  templateUrl: './modal-course.component.html',
  styleUrl: './modal-course.component.css'
})
export class ModalCourseComponent {
  @Input() course: any; // Asegúrate de tener la propiedad de entrada para recibir el curso

  isOpen: boolean = false;

  openModal(course: any): void {
    this.course = course;
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
  }
}
