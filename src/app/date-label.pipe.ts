import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateLabel', standalone: true })
export class DateLabelPipe implements PipeTransform {
  transform(value: string): string {
    return new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(`${value}T12:00:00`));
  }
}
