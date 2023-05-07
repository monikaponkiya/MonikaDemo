import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAdminLoggedIn$: BehaviorSubject<boolean>;
  public userName$: BehaviorSubject<string | null>;

  constructor() {
    const isAdminLoggedIn = localStorage.getItem('adminloggedIn') === 'true';
    this.isAdminLoggedIn$ = new BehaviorSubject(isAdminLoggedIn);
    const userName = localStorage.getItem('userName');
    this.userName$ = new BehaviorSubject(userName);
  }

  login(user: User) {
    if (user.email !== '' && user.password !== '') {
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userId', user.id.toString());
      localStorage.setItem('adminloggedIn', user.type === 'admin' ? 'true' : 'false');
      this.isAdminLoggedIn$.next(user.type === 'admin' ? true : false);
    }
  }
  logout() {
    debugger
    localStorage.setItem('adminloggedIn', 'false');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.isAdminLoggedIn$.next(false);
  }
}
