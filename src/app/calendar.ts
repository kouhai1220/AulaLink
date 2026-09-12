import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TaskService } from './task.service';
import { DateLabelPipe } from './date-label.pipe';

@Component({
  selector: 'app-calendar',
  imports: [DateLabelPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page">
      <header class="page-header simple-header"><div><p class="eyebrow">Planifica con intención</p><h1>Calendario</h1></div></header>
      <label class="date-picker">Selecciona una fecha<input type="date" [value]="selectedDate()" (change)="selectedDate.set($any($event.target).value)" /></label>
      <div class="calendar-day-heading"><span>{{ selectedDate() | dateLabel }}</span><strong>{{ selectedTasks().length }} {{ selectedTasks().length === 1 ? 'tarea' : 'tareas' }}</strong></div>
      <div class="task-list">
        @for (task of selectedTasks(); track task.id) {
          <article class="task-card" [class.is-complete]="task.completed"><button class="check-button" [class.checked]="task.completed" (click)="taskService.toggleTask(task.id)" [attr.aria-label]="task.completed ? 'Marcar pendiente' : 'Completar tarea'">{{ task.completed ? '✓' : '' }}</button><div class="task-copy"><div class="task-meta"><span class="priority-dot" [class]="'priority-' + task.priority"></span><span>{{ task.time }}</span></div><h2>{{ task.title }}</h2><p>{{ task.course }}</p></div></article>
        } @empty { <div class="empty-state"><span>○</span><p>No hay tareas para esta fecha.</p></div> }
      </div>
    </section>
  `,
})
export class CalendarComponent {
  protected readonly taskService = inject(TaskService);
  protected readonly selectedDate = signal(new Date().toISOString().slice(0, 10));
  protected readonly selectedTasks = computed(() => this.taskService.getTasksByDate(this.selectedDate()).sort((a, b) => a.time.localeCompare(b.time)));
}
