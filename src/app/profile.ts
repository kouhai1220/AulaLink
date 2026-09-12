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
        <section class="profile-card"><div class="profile-avatar profile-avatar-large">{{ initials(user.name) }}</div><h2>{{ user.name }}</h2><p>{{ user.email }}</p></section>
      }
      <button class="logout-button" type="button" (click)="logout()">Cerrar sesión</button>
    </section>
  `,
})
export class ProfileComponent {
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected initials(name: string): string { return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(); }
  protected logout(): void { this.authService.logout(); this.router.navigate(['/login']); }
}
