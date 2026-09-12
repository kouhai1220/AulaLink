import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="auth-page">
      <section class="auth-card">
        <div class="auth-brand"><span class="brand-mark">◆</span><strong>Aula<span>Link</span></strong></div>
        <p class="auth-kicker">Tu espacio de estudio</p>
        <h1>Bienvenido de nuevo</h1>
        <p class="auth-subtitle">Organiza tus tareas, controla tu tiempo.</p>
        @if (errorMessage()) { <div class="auth-alert" role="alert">{{ errorMessage() }}</div> }
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <label>Correo electrónico<input type="email" formControlName="email" autocomplete="email" placeholder="tu@correo.com" />@if (form.controls.email.invalid && form.controls.email.touched) { <small>Escribe un correo válido.</small> }</label>
          <label>Contraseña<input type="password" formControlName="password" autocomplete="current-password" placeholder="Mínimo 6 caracteres" />@if (form.controls.password.invalid && form.controls.password.touched) { <small>La contraseña es obligatoria.</small> }</label>
          <button class="primary-button auth-submit" type="submit">Iniciar sesión</button>
        </form>
        <button class="forgot-link" type="button" (click)="showRecovery()">¿Olvidaste tu contraseña?</button>
        <p class="auth-switch">¿No tienes una cuenta? <a routerLink="/registro">Crear cuenta</a></p>
      </section>
    </main>
  `,
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly errorMessage = signal('');
  protected readonly form = this.formBuilder.nonNullable.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });

  constructor() {
    if (this.route.snapshot.queryParamMap.get('registered') === 'true') this.errorMessage.set('Cuenta creada correctamente. Ya puedes iniciar sesión.');
  }

  protected submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { email, password } = this.form.getRawValue();
    if (this.authService.login(email, password) === 'invalid') { this.errorMessage.set('Correo o contraseña incorrectos.'); return; }
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/inicio';
    this.router.navigateByUrl(returnUrl.startsWith('/') ? returnUrl : '/inicio');
  }

  protected showRecovery(): void { this.errorMessage.set('La recuperación de contraseña estará disponible próximamente.'); }
}
