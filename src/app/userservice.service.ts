import { Injectable } from '@angular/core';
import { User } from './models/user';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private readonly localStorageKey = 'users';

  constructor() { }
  getUsers(): User[] {
    const users = localStorage.getItem(this.localStorageKey);
    return users ? JSON.parse(users) : [];
  }

  addUser(user: User): void {
    const users = this.getUsers();
    user.index = users.length > 0 ? Math.max(...users.map(u => u.index)) + 1 : 1;
    users.push(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }
  updateUser(index: number, user: User): void {
    const users = this.getUsers();
    users[index] = { ...users[index], ...user };
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }
  deleteUser(index: number): void {
    const users = this.getUsers();
    users.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }
}
