import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page profile-page">
      <header class="page-header simple-header"><div><p class="eyebrow">Tu cuenta</p><h1>Perfil</h1></div></header>
      @if (authService.currentUser(); as user) {
        <section class="profile-card">
          <div class="profile-avatar profile-avatar-large">{{ initials(user.name) }}</div>
          <div class="profile-meta">
            <h2>{{ user.name }}</h2>
            <p>{{ user.email }}</p>
          </div>
        </section>
      }
      <button class="logout-button" type="button" (click)="logout()">
        <svg viewBox="0 0 24 24" aria-hidden="true" class="logout-icon">
          <path d="M10 4.75A1.25 1.25 0 0 0 8.75 6v12A1.25 1.25 0 0 0 10 19.25h7.5A1.25 1.25 0 0 0 18.75 18V6A1.25 1.25 0 0 0 17.5 4.75H10Zm0 1.5h7.5v12H10V6.25Zm-5.5 3.5h5.25v1.5H4.5v-1.5Zm7.25 5.5 3.5-3.5-3.5-3.5v2.5h-3v2h3v2.5Z"/>
        </svg>
        Cerrar sesión
      </button>
    </section>
  `,
})
export class ProfileComponent {
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected initials(name: string): string { return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(); }
  protected logout(): void { this.authService.logout(); this.router.navigate(['/login']); }
}
