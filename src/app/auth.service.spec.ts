import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => localStorage.clear());

  it('registers a user and prevents duplicate emails', () => {
    const service = new AuthService();
    expect(service.register('María López', 'MARIA@example.com', 'secret1')).toBe('success');
    expect(service.register('Otra María', 'maria@example.com', 'secret2')).toBe('duplicate');
  });

  it('logs in and logs out the registered user', () => {
    const service = new AuthService();
    service.register('Carlos Ruiz', 'carlos@example.com', 'secret1');
    expect(service.login('carlos@example.com', 'secret1')).toBe('success');
    expect(service.currentUser()?.name).toBe('Carlos Ruiz');
    expect(service.hasActiveSession()).toBe(true);
    service.logout();
    expect(service.hasActiveSession()).toBe(false);
  });

  it('rejects invalid credentials', () => {
    const service = new AuthService();
    service.register('Ana Pérez', 'ana@example.com', 'secret1');
    expect(service.login('ana@example.com', 'wrong-password')).toBe('invalid');
    expect(service.hasActiveSession()).toBe(false);
  });
});