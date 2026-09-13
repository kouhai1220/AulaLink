import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { COURSES } from './courses';

@Component({
  selector: 'app-course-detail',
  imports: [RouterLink, UpperCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .course-detail-page { min-height: 100dvh; background: #f7f7f7; animation: rise .35s ease both; }
    .course-detail-banner { position: relative; display: flex; min-height: 190px; flex-direction: column; justify-content: end; overflow: hidden; padding: 28px 22px 22px; isolation: isolate; color: white; }
    .course-detail-banner::before { position: absolute; inset: 0; z-index: -2; background: linear-gradient(110deg, #061865, #087fe4); content: ''; }
    .course-detail-banner.course-cyan::before { background: linear-gradient(110deg, #0648bb, #00a4dd); }.course-detail-banner.course-indigo::before { background: linear-gradient(110deg, #17217d, #1977d2); }.course-detail-banner.course-navy::before { background: linear-gradient(110deg, #09264b, #2178a5); }.course-detail-banner.course-ocean::before { background: linear-gradient(110deg, #0754a4, #00a1b7); }.course-detail-banner.course-violet::before { background: linear-gradient(110deg, #1d3f95, #6248c8); }
    .course-back { position: absolute; top: 17px; left: 18px; z-index: 1; display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: #ffffff2e; color: white; font-size: 1.8rem; line-height: 1; text-decoration: none; }
    .course-detail-period { margin-bottom: 5px; color: #c7efff; font-size: .64rem; font-weight: 800; letter-spacing: .04em; }.course-detail-banner h1 { max-width: 85%; color: white; font: 800 1.65rem/1.05 'Trebuchet MS', sans-serif; text-transform: uppercase; }.course-detail-name { margin-top: 8px; color: #e0f5ff; font-size: .74rem; }
    .course-detail-shape { position: absolute; z-index: -1; width: 100px; height: 145px; border: 14px solid #5bd2ff70; transform: skewX(-17deg) rotate(17deg); }.course-detail-shape-one { right: 40px; top: 16px; }.course-detail-shape-two { right: -24px; top: -12px; border-color: #c4f2ff45; }
    .course-detail-content { padding: 26px 22px 110px; }.course-detail-intro { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }.course-detail-intro h2 { margin-top: 5px; font-size: 1rem; text-transform: uppercase; }.course-detail-search { color: #20252a; font-size: 1.5rem; }
    .course-progress-action, .course-content-row { display: flex; align-items: center; gap: 12px; color: var(--ink); text-decoration: none; }.course-progress-action { padding: 15px 13px; border: 1px solid #dbe8f6; border-radius: 8px; background: white; box-shadow: 0 5px 14px #2066a00b; }.course-progress-action small, .course-content-row small { display: block; margin-top: 4px; color: var(--muted); font-size: .7rem; }.course-progress-action > span:nth-child(2), .course-content-row > span:nth-child(2) { min-width: 0; flex: 1; }.course-content-icon { display: grid; place-items: center; flex: 0 0 28px; width: 28px; height: 28px; color: #1769ed; font-size: 1.15rem; }.course-progress-action strong, .course-content-row strong { font-size: .82rem; }.course-action-arrow { color: #59636b; font-size: 1.45rem; }.course-content-list { display: grid; gap: 10px; margin-top: 18px; }.course-content-row { min-height: 70px; padding: 12px 11px; border: 1px solid #dfdfdf; border-radius: 4px; background: white; }.course-detail-button { width: 100%; margin-top: 22px; background: #1769ed; }
  `],
  template: `
    <section class="course-detail-page">
      <header class="course-detail-banner" [class]="course.accent">
        <a routerLink="/cursos" class="course-back" aria-label="Volver a cursos">‹</a>
        <div class="course-detail-shape course-detail-shape-one"></div>
        <div class="course-detail-shape course-detail-shape-two"></div>
        <p class="course-detail-period">{{ course.code }}</p>
        <h1>{{ course.title }}</h1>
        <p class="course-detail-name">{{ course.title | uppercase }}</p>
      </header>

      <main class="course-detail-content">
        <section class="course-detail-intro">
          <div><p class="eyebrow">Contenido del curso</p><h2>{{ course.title }}</h2></div>
          <span class="course-detail-search" aria-hidden="true">⌕</span>
        </section>

        <a routerLink="/progreso" class="course-progress-action">
          <span class="course-content-icon">▣</span>
          <span><strong>Mi progreso</strong><small>{{ course.progress }}% completado en este curso</small></span>
          <span class="course-action-arrow" aria-hidden="true">›</span>
        </a>

        <div class="course-content-list">
          <a routerLink="/progreso" class="course-content-row"><span class="course-content-icon">▤</span><span><strong>Bienvenida al periodo</strong><small>Revisa la información inicial del curso</small></span><span class="course-action-arrow">›</span></a>
          <a routerLink="/tasks" class="course-content-row"><span class="course-content-icon">↗</span><span><strong>Trabajo final del curso</strong><small>Consulta tus tareas y fechas de entrega</small></span><span class="course-action-arrow">›</span></a>
          <a routerLink="/progreso" class="course-content-row"><span class="course-content-icon">▤</span><span><strong>Material de aprendizaje</strong><small>Continúa con la siguiente actividad</small></span><span class="course-action-arrow">›</span></a>
        </div>

        <a routerLink="/progreso" class="primary-button course-detail-button">Ver progreso del curso</a>
      </main>
    </section>
  `,
})
export class CourseDetailComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly course = COURSES.find((item) => item.code === this.route.snapshot.paramMap.get('code')) ?? COURSES[0];
}