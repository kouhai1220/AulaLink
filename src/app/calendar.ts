import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TaskService } from './task.service';
import { DateLabelPipe } from './date-label.pipe';

@Component({
  selector: 'app-calendar',
  imports: [DateLabelPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page">
      <header class="page-header simple-header calendar-header"><div><p class="eyebrow">Organiza tu semana</p><h1>Calendario</h1></div></header>
      <section class="month-card" aria-label="Calendario mensual">
        <div class="month-title"><button (click)="changeMonth(-1)" aria-label="Mes anterior">‹</button><strong>{{ monthLabel() }}</strong><button (click)="changeMonth(1)" aria-label="Mes siguiente">›</button></div>
        <div class="weekday-row"><span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span></div>
        <div class="month-grid">@for (day of monthDays(); track day.key) { <button class="day-cell" [class.is-selected]="day.date === selectedDate()" [class.has-task]="day.hasTask" [disabled]="!day.date" (click)="selectDay(day.date)">{{ day.day }}</button> }</div>
      </section>
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
  protected readonly visibleMonth = signal(new Date());
  protected readonly monthLabel = computed(() => new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(this.visibleMonth()));
  protected readonly monthDays = computed(() => {
    const month = this.visibleMonth();
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7;
    const total = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const days: { key: string; day: number | ''; date: string; hasTask: boolean }[] = [];
    for (let index = 0; index < offset; index++) days.push({ key: `empty-${index}`, day: '', date: '', hasTask: false });
    for (let day = 1; day <= total; day++) {
      const date = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push({ key: date, day, date, hasTask: this.taskService.getTasksByDate(date).length > 0 });
    }
    return days;
  });
  protected readonly selectedTasks = computed(() => this.taskService.getTasksByDate(this.selectedDate()).sort((a, b) => a.time.localeCompare(b.time)));

  protected selectDay(date: string): void { if (date) this.selectedDate.set(date); }
  protected changeMonth(offset: number): void { const month = this.visibleMonth(); this.visibleMonth.set(new Date(month.getFullYear(), month.getMonth() + offset, 1)); }
}
