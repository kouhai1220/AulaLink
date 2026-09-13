import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export type Course = {
  code: string;
  title: string;
  teacher: string;
  progress: number;
  accent: string;
  category: string;
};

export const COURSES: Course[] = [
  { code: '202620-PAWD-401-TEC-NRC_6315', title: 'Aplicaciones desarrollo web', teacher: 'Jorge Antonio Luque Chambi', progress: 72, accent: 'course-blue', category: 'Tecnología' },
  { code: '202620-PAWD-403-TEC-NRC_6317', title: 'Aplicaciones para dispositivos móviles', teacher: 'Jorge Antonio Luque Chambi', progress: 48, accent: 'course-cyan', category: 'Tecnología' },
  { code: '202620-PAWD-402-TEC-NRC_6316', title: 'Aplicaciones web progresivas', teacher: 'Jorge Antonio Luque Chambi', progress: 35, accent: 'course-indigo', category: 'Tecnología' },
  { code: '202620-SPSU-866-TEC-NRC_6321', title: 'Desarrollo humano', teacher: 'Jacqueline Coral Gonzales Leon', progress: 84, accent: 'course-navy', category: 'Desarrollo personal' },
  { code: '202620-PAWD-404-TEC-NRC_6318', title: 'Gestor de contenidos', teacher: 'Jorge Antonio Luque Chambi', progress: 61, accent: 'course-ocean', category: 'Tecnología' },
  { code: '202620-CNIIU-108-ACT-NRC_47714', title: 'Revisión y calificación', teacher: 'Giancarlos Barboza Nieto', progress: 27, accent: 'course-violet', category: 'Evaluación' },
];

@Component({
  selector: 'app-courses',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .courses-header { margin-bottom: 20px; }
    .courses-count { flex: 0 0 auto; padding: 7px 10px; border-radius: 9px; background: #eaf4ff; color: #1769ed; font-size: .7rem; font-weight: 800; }
    .course-search { display: flex; align-items: center; gap: 9px; min-height: 46px; padding: 0 13px; border: 1px solid #cbddef; border-radius: 11px; background: white; color: #1769ed; }
    .course-search span { font-size: 1.5rem; line-height: 1; }
    .course-search input { min-width: 0; padding: 0; border: 0; outline: 0; background: transparent; box-shadow: none; font-size: .8rem; }
    .course-filters { display: flex; gap: 8px; margin: 14px 0 20px; overflow-x: auto; scrollbar-width: none; }
    .course-filter { flex: 0 0 auto; padding: 8px 12px; border: 1px solid #d5e3f2; border-radius: 9px; background: white; color: #5f7190; font: 700 .72rem inherit; cursor: pointer; }
    .course-filter.active { border-color: #1769ed; background: #1769ed; color: white; }
    .course-list { display: grid; gap: 16px; }
    .course-card { display: block; color: inherit; text-decoration: none; transition: transform .2s ease, box-shadow .2s ease; }
    .course-card:hover { transform: translateY(-2px); box-shadow: 0 10px 22px #2066a018; }
    .course-card { overflow: hidden; border: 1px solid #d9e7f5; border-radius: 11px; background: white; box-shadow: 0 5px 14px #2066a00b; }
    .course-banner { position: relative; display: flex; min-height: 132px; flex-direction: column; justify-content: center; overflow: hidden; padding: 18px; color: white; isolation: isolate; }
    .course-banner::before { position: absolute; inset: 0; z-index: -2; background: linear-gradient(110deg, #021366, #0072e0); content: ''; }
    .course-banner-label { margin-bottom: 10px; color: #b9e8ff; font-size: .62rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
    .course-banner strong { max-width: 67%; font: 800 1.1rem/1.08 'Trebuchet MS', sans-serif; text-transform: uppercase; }
    .course-shape { position: absolute; z-index: -1; display: block; width: 82px; height: 110px; border: 12px solid #5bd2ff80; transform: skewX(-17deg) rotate(17deg); }
    .course-shape-one { right: 40px; top: 12px; }.course-shape-two { right: -2px; top: 1px; border-color: #c4f2ff4d; }
    .course-cyan::before { background: linear-gradient(110deg, #0648bb, #00a4dd); }.course-indigo::before { background: linear-gradient(110deg, #17217d, #1977d2); }.course-navy::before { background: linear-gradient(110deg, #09264b, #2178a5); }.course-ocean::before { background: linear-gradient(110deg, #0754a4, #00a1b7); }.course-violet::before { background: linear-gradient(110deg, #1d3f95, #6248c8); }
    .course-card-body { padding: 14px 15px 15px; }.course-code { overflow: hidden; color: #66809f; font-size: .65rem; text-overflow: ellipsis; white-space: nowrap; }.course-card h2 { margin: 7px 0 5px; font-size: .88rem; text-transform: uppercase; }.course-teacher { color: #5f7190; font-size: .74rem; }
    .course-progress-row { display: flex; justify-content: space-between; gap: 10px; margin-top: 14px; color: #5f7190; font-size: .68rem; }.course-progress-row span:last-child { color: #1769ed; font-weight: 700; }.course-progress { height: 6px; margin-top: 7px; overflow: hidden; border-radius: 6px; background: #e8f0f8; }.course-progress span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #1769ed, #19b779); }
  `],
  template: `
    <section class="page courses-page">
      <header class="page-header simple-header courses-header">
        <div>
          <p class="eyebrow">Mi aprendizaje</p>
          <h1>Cursos</h1>
          <p class="muted">Explora tus materias y continúa donde lo dejaste.</p>
        </div>
        <span class="courses-count">{{ courses.length }} cursos</span>
      </header>

      <label class="course-search">
        <span aria-hidden="true">⌕</span>
        <input type="search" placeholder="Busca tus cursos" aria-label="Busca tus cursos">
      </label>

      <div class="course-filters" aria-label="Filtros de cursos">
        <button class="course-filter active" type="button">Todos</button>
        <button class="course-filter" type="button">En progreso</button>
        <button class="course-filter" type="button">Completados</button>
      </div>

      <div class="course-list">
        @for (course of courses; track course.code) {
          <a class="course-card" [routerLink]="['/cursos', course.code]" [attr.aria-label]="'Abrir curso ' + course.title">
            <div class="course-banner" [class]="course.accent">
              <span class="course-banner-label">AulaLink</span>
              <strong>{{ course.title }}</strong>
              <span class="course-shape course-shape-one"></span>
              <span class="course-shape course-shape-two"></span>
            </div>
            <div class="course-card-body">
              <p class="course-code">{{ course.code }}</p>
              <h2>{{ course.title }}</h2>
              <p class="course-teacher">{{ course.teacher }}</p>
              <div class="course-progress-row">
                <span>{{ course.progress }}% completado</span>
                <span>{{ course.category }}</span>
              </div>
              <div class="course-progress" aria-hidden="true"><span [style.width.%]="course.progress"></span></div>
            </div>
          </a>
        }
      </div>
    </section>
  `,
})
export class CoursesComponent {
  protected readonly courses = COURSES;
}
