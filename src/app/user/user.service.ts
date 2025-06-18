import { inject, Injectable, signal } from '@angular/core';
import { UserType } from './user.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { RepoType } from './repo.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpClient = inject(HttpClient);
  private user = signal<UserType | undefined>(undefined);
  private repos = signal<RepoType[] | undefined>(undefined);

  readUser = this.user.asReadonly();
  readRepos = this.repos.asReadonly();

  fetchUser(userName: string) {
    return this.httpClient.get<UserType>(('https://api.github.com/users/' + userName), {}).pipe(tap({
      next: (userData) => this.user.set(userData)
    }));
  };

  fetchUserRepos(userName: string) {
    return this.httpClient.get<RepoType[]>(('https://api.github.com/users/' + userName + '/repos'), {}).pipe(tap({
      next: (userRepos) => this.repos.set(userRepos)
    }));
  }


  constructor() {}
}
