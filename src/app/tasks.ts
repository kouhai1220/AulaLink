import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from './task.service';
import { DateLabelPipe } from './date-label.pipe';

@Component({
  selector: 'app-tasks',
  imports: [RouterLink, DateLabelPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page">
      <header class="page-header simple-header">
        <div><p class="eyebrow">Organiza tu semana</p><h1>Mis tareas</h1></div>
        <a routerLink="/new" class="round-button" aria-label="Crear tarea">+</a>
      </header>

      <div class="task-summary"><strong>{{ taskService.pendingTasks().length }}</strong><span>pendientes</span><strong>{{ taskService.completedTasks().length }}</strong><span>completadas</span></div>

      <div class="task-list">
        @for (task of taskService.tasks(); track task.id) {
          <article class="task-card task-card-large" [class.is-complete]="task.completed">
            <button class="check-button" [class.checked]="task.completed" (click)="taskService.toggleTask(task.id)" [attr.aria-label]="task.completed ? 'Marcar pendiente' : 'Completar tarea'">{{ task.completed ? '✓' : '' }}</button>
            <div class="task-copy">
              <div class="task-meta"><span class="priority-dot" [class]="'priority-' + task.priority"></span><span>{{ priorityLabel(task.priority) }}</span></div>
              <h2>{{ task.title }}</h2>
              <p>{{ task.course }} · {{ task.date | dateLabel }} · {{ task.time }}</p>
              @if (task.description) { <p class="task-description">{{ task.description }}</p> }
            </div>
            <div class="task-actions">
              <a [routerLink]="['/edit', task.id]" class="secondary-button">Editar</a>
              <button class="delete-button" (click)="remove(task.id)" aria-label="Eliminar tarea">Eliminar</button>
            </div>
          </article>
        } @empty { <div class="empty-state"><span>✓</span><p>No hay tareas todavía.<br>Tu lista empieza aquí.</p></div> }
      </div>
    </section>
  `,
})
export class TasksComponent {
  protected readonly taskService = inject(TaskService);

  protected priorityLabel(priority: string): string {
    return { high: 'Alta', medium: 'Media', low: 'Baja' }[priority] ?? priority;
  }

  protected remove(id: string): void {
    if (window.confirm('¿Eliminar esta tarea?')) this.taskService.deleteTask(id);
  }
}
