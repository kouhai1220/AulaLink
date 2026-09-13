import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './auth.guard';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'inicio' },
	{ path: 'login', canActivate: [guestGuard], loadComponent: () => import('./login').then((module) => module.LoginComponent) },
	{ path: 'registro', canActivate: [guestGuard], loadComponent: () => import('./register').then((module) => module.RegisterComponent) },
	{ path: 'inicio', canActivate: [authGuard], loadComponent: () => import('./dashboard').then((module) => module.DashboardComponent) },
	{ path: 'cursos', canActivate: [authGuard], loadComponent: () => import('./courses').then((module) => module.CoursesComponent) },
	{ path: 'cursos/:code', canActivate: [authGuard], loadComponent: () => import('./course-detail').then((module) => module.CourseDetailComponent) },
	{ path: 'home', pathMatch: 'full', redirectTo: 'inicio' },
	{ path: 'tasks', canActivate: [authGuard], loadComponent: () => import('./tasks').then((module) => module.TasksComponent) },
	{ path: 'calendar', canActivate: [authGuard], loadComponent: () => import('./calendar').then((module) => module.CalendarComponent) },
	{ path: 'calendario', canActivate: [authGuard], loadComponent: () => import('./calendar').then((module) => module.CalendarComponent) },
	{ path: 'progress', canActivate: [authGuard], loadComponent: () => import('./progress').then((module) => module.ProgressComponent) },
	{ path: 'progreso', canActivate: [authGuard], loadComponent: () => import('./progress').then((module) => module.ProgressComponent) },
	{ path: 'new', canActivate: [authGuard], loadComponent: () => import('./task-form').then((module) => module.TaskFormComponent) },
	{ path: 'nueva-tarea', canActivate: [authGuard], loadComponent: () => import('./task-form').then((module) => module.TaskFormComponent) },
	{ path: 'edit/:id', canActivate: [authGuard], loadComponent: () => import('./task-form').then((module) => module.TaskFormComponent) },
	{ path: 'perfil', canActivate: [authGuard], loadComponent: () => import('./profile').then((module) => module.ProfileComponent) },
	{ path: '**', redirectTo: 'inicio' },
];
