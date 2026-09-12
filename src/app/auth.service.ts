import { computed, Injectable, signal } from '@angular/core';
import { User } from './user.model';

export type RegisterResult = 'success' | 'duplicate';
export type LoginResult = 'success' | 'invalid';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly usersKey = 'aulalink_users';
  private readonly currentUserKey = 'aulalink_current_user';
  private readonly currentUserState = signal<User | null>(this.loadCurrentUser());

  readonly currentUser = this.currentUserState.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  register(name: string, email: string, password: string): RegisterResult {
    const normalizedEmail = email.trim().toLowerCase();
    const users = this.loadUsers();
    if (users.some((user) => user.email === normalizedEmail)) return 'duplicate';

    const user: User = { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, password };
    localStorage.setItem(this.usersKey, JSON.stringify([...users, user]));
    return 'success';
  }

  login(email: string, password: string): LoginResult {
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.loadUsers().find((candidate) => candidate.email === normalizedEmail && candidate.password === password);
    if (!user) return 'invalid';

    this.currentUserState.set(user);
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    return 'success';
  }

  logout(): void {
    this.currentUserState.set(null);
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  hasActiveSession(): boolean {
    return this.currentUser() !== null;
  }

  private loadUsers(): User[] {
    const stored = localStorage.getItem(this.usersKey);
    if (!stored) return [];
    try {
      return JSON.parse(stored) as User[];
    } catch {
      localStorage.removeItem(this.usersKey);
      return [];
    }
  }

  private loadCurrentUser(): User | null {
    const stored = localStorage.getItem(this.currentUserKey);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as User;
    } catch {
      localStorage.removeItem(this.currentUserKey);
      return null;
    }
  }
}
