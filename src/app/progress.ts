import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page progress-page">
      <header class="page-header simple-header"><div><p class="eyebrow">Tu avance</p><h1>Progreso</h1></div></header>
      <section class="progress-hero"><div class="big-progress">{{ taskService.progress() }}<span>%</span></div><p>de tus tareas completadas</p><div class="progress-bar"><span [style.width.%]="taskService.progress()"></span></div></section>
      <div class="stats-grid"><div><strong>{{ taskService.tasks().length }}</strong><span>Total</span></div><div><strong>{{ taskService.completedTasks().length }}</strong><span>Completadas</span></div><div><strong>{{ taskService.pendingTasks().length }}</strong><span>Pendientes</span></div></div>
      <section class="completed-section"><div class="section-heading"><div><p class="eyebrow">Historial</p><h2>Completadas</h2></div></div>@for (task of taskService.completedTasks(); track task.id) { <div class="completed-row"><span class="completed-check">✓</span><div><strong>{{ task.title }}</strong><small>{{ task.course }}</small></div></div> } @empty { <div class="empty-state"><span>↗</span><p>Aún no hay tareas completadas.</p></div> }</section>
    </section>
  `,
})
export class ProgressComponent { protected readonly taskService = inject(TaskService); }
