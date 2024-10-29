import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './components/shared/home/home.component';
import { UserComponent } from './components/user/user.component';
import { CategoryComponent } from './components/category/category.component';
import { CourseComponent } from './components/course/course.component';
import { MainGuard } from './auth/guards/main.guard';
import { NotfoundComponent } from './components/404/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotfoundComponent },
  { path: 'home', component: HomeComponent, canMatch: [MainGuard] },

  {
    path: 'user',
    component: UserComponent,
    canMatch: [MainGuard],
    canActivate: [MainGuard],
    data: { role: 'User' },
  },
  {
    path: 'category',
    component: CategoryComponent,
    canMatch: [MainGuard],
    canActivate: [MainGuard],
    data: { role: 'Admin' },
  },
  {
    path: 'course',
    component: CourseComponent,
    canMatch: [MainGuard],
    canActivate: [MainGuard],
    data: { role: 'Admin' },
  },
  { path: '**', redirectTo: '404' },
];
