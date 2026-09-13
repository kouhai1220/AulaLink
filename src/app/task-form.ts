import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskPriority, TaskService } from './task.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page form-page">
      <header class="page-header simple-header"><a routerLink="/tasks" class="back-link" aria-label="Volver a tareas">‹</a><div><p class="eyebrow">{{ editing ? 'Actualiza tus planes' : 'Añade un nuevo objetivo' }}</p><h1>{{ editing ? 'Editar tarea' : 'Nueva tarea' }}</h1></div></header>
      <form [formGroup]="form" (ngSubmit)="save()" novalidate>
        <label>Nombre de la tarea<input formControlName="title" placeholder="Ej. Entregar ensayo" />@if (form.controls.title.invalid && form.controls.title.touched) { <small class="form-error">Escribe un nombre.</small> }</label>
        <label>Curso<input formControlName="course" placeholder="Ej. Historia del arte" /></label>
        <div class="form-row"><label>Fecha<input type="date" formControlName="date" /></label><label>Hora<input type="time" formControlName="time" /></label></div>
        <fieldset><legend>Prioridad</legend><div class="priority-options">@for (option of priorities; track option.value) { <label class="priority-option" [class.selected]="form.controls.priority.value === option.value"><input type="radio" formControlName="priority" [value]="option.value" /><span class="priority-dot" [class]="'priority-' + option.value"></span>{{ option.label }}</label> }</div></fieldset>
        <label>Descripción <span class="optional">(opcional)</span><textarea formControlName="description" rows="4" placeholder="Añade algún detalle..."></textarea></label>
        <button class="primary-button save-button" type="submit">{{ editing ? 'GUARDAR CAMBIOS' : 'GUARDAR TAREA' }}</button>
      </form>
    </section>
  `,
})
export class TaskFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly priorities: { value: TaskPriority; label: string }[] = [{ value: 'high', label: 'Alta' }, { value: 'medium', label: 'Media' }, { value: 'low', label: 'Baja' }];
  protected readonly editing = this.route.snapshot.paramMap.has('id');
  private readonly taskId = this.route.snapshot.paramMap.get('id');
  protected readonly form = this.formBuilder.nonNullable.group({ title: ['', Validators.required], course: ['', Validators.required], date: [new Date().toISOString().slice(0, 10), Validators.required], time: ['18:00', Validators.required], priority: ['medium' as TaskPriority, Validators.required], description: [''] });

  constructor() {
    const task = this.taskId ? this.taskService.getTask(this.taskId) : undefined;
    if (task) this.form.patchValue(task);
  }

  protected save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const value = this.form.getRawValue();
    if (this.taskId) this.taskService.updateTask(this.taskId, value);
    else this.taskService.createTask(value);
    this.router.navigate(['/tasks']);
  }
}
