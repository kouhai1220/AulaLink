import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateLabelPipe } from './date-label.pipe';
import { AuthService } from './auth.service';
import { TaskService } from './task.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DateLabelPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page dashboard-page">
      <header class="page-header">
        <div>
          <div class="brand-lockup"><span class="brand-mark">◆</span><strong>Aula<span>Link</span></strong></div>
          <h1>¡Hola, {{ firstName() }}! 👋</h1>
          <p class="muted">¿Qué tienes pendiente hoy?</p>
        </div>
        <a routerLink="/perfil" class="profile-avatar" aria-label="Abrir perfil">{{ initials() }}</a>
      </header>

      <section class="focus-card" aria-label="Resumen de progreso">
        <div>
          <p class="card-kicker">PROGRESO SEMANAL</p>
          <p>{{ taskService.completedTasks().length }} de {{ taskService.tasks().length }} tareas completadas</p>
          <div class="progress-bar"><span [style.width.%]="taskService.progress()"></span></div>
        </div>
        <strong class="focus-percent">{{ taskService.progress() }}%</strong>
      </section>

      <div class="section-heading">
        <div>
          <p class="eyebrow"><span class="section-dot dot-red"></span>Para hoy</p>
          <h2>{{ todayLabel() }}</h2>
        </div>
        <a routerLink="/tasks" class="text-link">Ver todas</a>
      </div>

      <div class="section-heading home-section-title compact-heading"><div><p class="eyebrow"><span class="section-dot dot-yellow"></span>Próximamente</p></div></div>
      <div class="task-list compact-list">
        @for (task of upcomingTasks(); track task.id) {
          <article class="task-card upcoming-card" [class.is-complete]="task.completed">
            <button class="check-button" [class.checked]="task.completed" (click)="taskService.toggleTask(task.id)" [attr.aria-label]="task.completed ? 'Marcar pendiente' : 'Completar tarea'">{{ task.completed ? '✓' : '' }}</button>
            <div class="task-copy"><span class="priority-dot" [class]="'priority-' + task.priority"></span><h3>{{ task.title }}</h3><p>{{ task.course }} · Vence {{ task.date | dateLabel }}</p></div>
            <a [routerLink]="['/edit', task.id]" class="icon-link" aria-label="Editar tarea">›</a>
          </article>
        } @empty { <p class="muted inline-empty">No hay tareas próximas.</p> }
      </div>

      <div class="section-heading home-section-title compact-heading"><div><p class="eyebrow"><span class="section-dot dot-green"></span>También</p></div></div>
      <div class="also-card"><span class="also-icon">▣</span><div><strong>Tu espacio está listo</strong><p>Organiza tus materias y avanza a tu ritmo.</p></div></div>

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
  protected readonly authService = inject(AuthService);
  protected readonly todayTasks = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    return this.taskService.getTasksByDate(today).sort((a, b) => a.time.localeCompare(b.time));
  });
  protected readonly upcomingTasks = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    return this.taskService.tasks().filter((task) => task.date > today).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  });
  protected readonly todayLabel = () => new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
  protected readonly firstName = () => this.authService.currentUser()?.name.split(' ')[0] ?? 'estudiante';
  protected readonly initials = () => this.authService.currentUser()?.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() ?? 'A';
}
