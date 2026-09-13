import { computed, Injectable, signal } from '@angular/core';

export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  course: string;
  date: string;
  time: string;
  priority: TaskPriority;
  description: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly storageKey = 'aulalink-tasks';
  private readonly tasksState = signal<Task[]>(this.loadTasks());

  readonly tasks = this.tasksState.asReadonly();
  readonly completedTasks = computed(() => this.tasks().filter((task) => task.completed));
  readonly pendingTasks = computed(() => this.tasks().filter((task) => !task.completed));
  readonly progress = computed(() => {
    const total = this.tasks().length;
    return total === 0 ? 0 : Math.round((this.completedTasks().length / total) * 100);
  });

  createTask(task: Omit<Task, 'id' | 'completed'>): void {
    this.updateTasks((tasks) => [...tasks, { ...task, id: crypto.randomUUID(), completed: false }]);
  }

  updateTask(id: string, changes: Omit<Task, 'id' | 'completed'>): void {
    this.updateTasks((tasks) => tasks.map((task) => task.id === id ? { ...task, ...changes } : task));
  }

  deleteTask(id: string): void {
    this.updateTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  toggleTask(id: string): void {
    this.updateTasks((tasks) => tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  getTask(id: string): Task | undefined {
    return this.tasks().find((task) => task.id === id);
  }

  getTasksByDate(date: string): Task[] {
    return this.tasks().filter((task) => task.date === date);
  }

  private updateTasks(update: (tasks: Task[]) => Task[]): void {
    const tasks = update(this.tasks());
    this.tasksState.set(tasks);
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  private loadTasks(): Task[] {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        return JSON.parse(stored) as Task[];
      } catch {
        localStorage.removeItem(this.storageKey);
      }
    }

    return [
      {
        id: 'welcome-task',
        title: 'Revisar apuntes de bienvenida',
        course: 'Organización',
        date: new Date().toISOString().slice(0, 10),
        time: '18:00',
        priority: 'medium',
        description: 'Conoce tu espacio de estudio y prepara la semana.',
        completed: false,
      },
    ];
  }
}
