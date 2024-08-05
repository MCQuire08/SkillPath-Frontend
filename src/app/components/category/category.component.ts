import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../core/services/category.service';
import { error } from 'console';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories:any[] = [];

  constructor(private categoryService:CategoryService){}

  ngOnInit():void{
    this.loadCategories();
  }

  loadCategories(){
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.error('Error al cargar las categorias', error);
      }
    )
  }
}
