import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalCourseComponent } from '../modal-course/modal-course.component';
import { HomeService } from '../../../../core/services/home.service';
import { HomeComponent } from '../home.component';
import { BehaviorSubject,Observable } from 'rxjs';

@Component({
  selector: 'app-modal-progress',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalCourseComponent],
  templateUrl: './modal-progress.component.html',
  styleUrls: ['./modal-progress.component.css']
})
export class ModalProgressComponent {
  isOpen: boolean = false;
  @Input() course: any;

  progressValueSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get progressValue$(): Observable<number> {
    return this.progressValueSubject.asObservable();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private modalService: ModalCourseComponent,
    private homeService: HomeService,
    private homeComponent: HomeComponent
  ) {}

  openModal(course: any): void {
    this.modalService.closeModal();
    this.isOpen = true;
    this.course = course;
    this.progressValueSubject.next(course.Progress || 0); 
    this.modalService.openModal(course);
  }

  closeModal(): void {
    this.updateProgress();
    this.isOpen = false;
    this.modalService.openModal(this.course);
  }

  updateProgress(): void {
    this.homeService.updateProgress(this.course.IDCourse, this.progressValueSubject.value).subscribe(
      (response) => {
        this.homeComponent.loadCourses();
      },
      (error) => {
        console.error('Error al actualizar el progreso', error);
      }
    );
  }

  add(): void {
    if (this.progressValueSubject.value < 100) {
      this.progressValueSubject.next(this.progressValueSubject.value + 5);
    }
  }

  subtract(): void {
    if (this.progressValueSubject.value > 0) {
      this.progressValueSubject.next(this.progressValueSubject.value - 5);
    }
  }
}
