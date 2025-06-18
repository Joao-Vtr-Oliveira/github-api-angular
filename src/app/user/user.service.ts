import { inject, Injectable, signal } from '@angular/core';
import { UserType } from './user.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private user = signal<UserType | undefined>(undefined);

  readUser = this.user.asReadonly();

  fetchUser(userName: string) {
    return this.httpClient.get<UserType>(('https://api.github.com/users/' + userName), {}).pipe(tap({
      next: (userData) => this.user.set(userData)
    }));
  }


  constructor() {}
}
