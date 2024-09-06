import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalCourseComponent } from '../modal-course/modal-course.component';
import { HomeService } from '../../../../core/services/home.service';
import { HomeComponent } from '../home.component';
import { UploadService } from '../../../../core/services/upload.service';
import { PlanService } from '../../../../core/services/plan.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-modal-progress',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalCourseComponent],
  templateUrl: './modal-progress.component.html',
  styleUrls: ['./modal-progress.component.css'],
})
export class ModalProgressComponent {
  isOpen: boolean = false;
  @Input() course: any;

  progressValueSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  get progressValue$(): Observable<number> {
    return this.progressValueSubject.asObservable();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private modalService: ModalCourseComponent,
    private homeService: HomeService,
    private homeComponent: HomeComponent,
    private uploadService: UploadService,
    private planService: PlanService
  ) {}

  files: File[] = [];
  planByUser: any;

  openModal(course: any): void {
    this.modalService.closeModal();
    this.getAllPlans((this.course = course));
    this.isOpen = true;
    this.course = course;
    this.progressValueSubject.next(course.progress || 0);
    this.modalService.openModal(course);
  }

  closeModal(): void {
    this.updateProgress();
    this.upload();
    this.isOpen = false;
    this.modalService.openModal(this.course);
  }

  updateProgress(): void {
    this.homeService
      .updateProgress(this.course.id, this.progressValueSubject.value)
      .subscribe(
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

  getAllPlans(course: any) {
    const userId = localStorage.getItem('idUser');
    const courseId = this.course.courseId;
    console.log(userId, courseId);
    this.planService.getPlans().subscribe(
      (data: any[]) => {
        this.planByUser = data.filter(
          (plan) => plan.userId == userId && plan.courseId == courseId
        );
      },
      (error) => {
        console.error('Error al cargar los planes', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.push(selectedFiles[i]);
    }
    console.log(this.files);
  }

  upload() {
    if (this.files.length === 0) return false;

    const fileData = this.files[0];
    const data = new FormData();

    data.append('file', fileData);
    data.append('upload_preset', 'cloudinary-evidences');
    data.append('cloud_name', 'dgh8ptahc');

    this.uploadService.uploadImg(data).subscribe({
      next: (response: any) => {
        this.planService
          .createPlanEvidence(this.planByUser[0].id, response.url)
          .subscribe({
            next: (planResponse: any) => {
              console.log('Plan evidence creado:', planResponse);
            },
            error: (planError: any) => {
              console.log('Error al crear el plan evidence:', planError);
            },
          });
      },
      error: (e: any) => {
        console.log(e);
      },
    });
    return true;
  }
}
