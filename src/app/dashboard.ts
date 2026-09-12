import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from './task.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page dashboard-page">
      <header class="page-header">
        <div>
          <p class="eyebrow">Tu espacio de estudio</p>
          <h1>Hola, estudiante</h1>
          <p class="muted">Un paso pequeño también cuenta.</p>
        </div>
        <div class="avatar" aria-hidden="true">A</div>
      </header>

      <section class="focus-card" aria-label="Resumen de progreso">
        <div>
          <p class="card-kicker">PROGRESO SEMANAL</p>
          <strong>{{ taskService.progress() }}%</strong>
          <p>{{ taskService.completedTasks().length }} de {{ taskService.tasks().length }} tareas completadas</p>
        </div>
        <div class="progress-ring" [style.--progress]="taskService.progress() + '%'">
          <span>{{ taskService.progress() }}%</span>
        </div>
      </section>

      <div class="section-heading">
        <div>
          <p class="eyebrow">Para hoy</p>
          <h2>{{ todayLabel() }}</h2>
        </div>
        <a routerLink="/tasks" class="text-link">Ver todas</a>
      </div>

      <div class="task-list compact-list">
        @for (task of todayTasks(); track task.id) {
          <article class="task-card" [class.is-complete]="task.completed">
            <button class="check-button" [class.checked]="task.completed" (click)="taskService.toggleTask(task.id)" [attr.aria-label]="task.completed ? 'Marcar pendiente' : 'Completar tarea'">
              {{ task.completed ? '✓' : '' }}
            </button>
            <div class="task-copy">
              <span class="priority-dot" [class]="'priority-' + task.priority"></span>
              <h3>{{ task.title }}</h3>
              <p>{{ task.course }} · {{ task.time }}</p>
            </div>
            <a [routerLink]="['/edit', task.id]" class="icon-link" aria-label="Editar tarea">›</a>
          </article>
        } @empty {
          <div class="empty-state"><span>✦</span><p>Tu día está despejado.<br>Agrega una tarea para empezar.</p></div>
        }
      </div>

      <a routerLink="/new" class="primary-button add-task-button">+ Nueva tarea</a>
    </section>
  `,
})
export class DashboardComponent {
  protected readonly taskService = inject(TaskService);
  protected readonly todayTasks = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    return this.taskService.getTasksByDate(today).sort((a, b) => a.time.localeCompare(b.time));
  });
  protected readonly todayLabel = () => new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
}
