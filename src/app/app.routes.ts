import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
	{ path: 'home', loadComponent: () => import('./dashboard').then((module) => module.DashboardComponent) },
	{ path: 'tasks', loadComponent: () => import('./tasks').then((module) => module.TasksComponent) },
	{ path: 'calendar', loadComponent: () => import('./calendar').then((module) => module.CalendarComponent) },
	{ path: 'progress', loadComponent: () => import('./progress').then((module) => module.ProgressComponent) },
	{ path: 'new', loadComponent: () => import('./task-form').then((module) => module.TaskFormComponent) },
	{ path: 'edit/:id', loadComponent: () => import('./task-form').then((module) => module.TaskFormComponent) },
	{ path: '**', redirectTo: 'home' },
];
