import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

function matchingPasswords(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmation = control.get('confirmation')?.value;
  return password && confirmation && password !== confirmation ? { passwordsMismatch: true } : null;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="auth-page">
      <section class="auth-card">
        <a routerLink="/login" class="auth-back" aria-label="Volver al login">‹</a>
        <div class="auth-brand"><span class="brand-mark">◆</span><strong>Aula<span>Link</span></strong></div>
        <p class="auth-kicker">Empieza a organizarte</p>
        <h1>Crear cuenta</h1>
        <p class="auth-subtitle">Tu camino de estudio empieza aquí.</p>
        @if (errorMessage()) { <div class="auth-alert" role="alert">{{ errorMessage() }}</div> }
        <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <label>Nombre completo<input formControlName="name" autocomplete="name" placeholder="Ej. María López" />@if (form.controls.name.invalid && form.controls.name.touched) { <small>Escribe tu nombre.</small> }</label>
          <label>Correo electrónico<input type="email" formControlName="email" autocomplete="email" placeholder="tu@correo.com" />@if (form.controls.email.invalid && form.controls.email.touched) { <small>Escribe un correo válido.</small> }</label>
          <label>Contraseña<input type="password" formControlName="password" autocomplete="new-password" placeholder="Mínimo 6 caracteres" />@if (form.controls.password.invalid && form.controls.password.touched) { <small>Usa al menos 6 caracteres.</small> }</label>
          <label>Confirmar contraseña<input type="password" formControlName="confirmation" autocomplete="new-password" placeholder="Repite tu contraseña" />@if (form.controls.confirmation.touched && (form.controls.confirmation.invalid || form.hasError('passwordsMismatch'))) { <small>Las contraseñas deben coincidir.</small> }</label>
          <button class="primary-button auth-submit" type="submit">Crear cuenta</button>
        </form>
        <p class="auth-switch">¿Ya tienes una cuenta? <a routerLink="/login">Iniciar sesión</a></p>
      </section>
    </main>
  `,
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly errorMessage = signal('');
  protected readonly form = this.formBuilder.nonNullable.group({ name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]], confirmation: ['', Validators.required] }, { validators: matchingPasswords });

  protected submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { name, email, password } = this.form.getRawValue();
    if (this.authService.register(name, email, password) === 'duplicate') { this.errorMessage.set('Ya existe una cuenta con ese correo.'); return; }
    this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
  }
}
