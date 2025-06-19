import { inject, Injectable, signal } from '@angular/core';
import { UserType } from './user.model';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { RepoType } from './repo.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private httpClient = inject(HttpClient);
	private user = signal<UserType | undefined>(undefined);
	private repos = signal<RepoType[] | undefined>(undefined);
	private loading = signal(false);
	private error = signal<string | null>(null);

	readUser = this.user.asReadonly();
	readRepos = this.repos.asReadonly();
	readLoading = this.loading.asReadonly();
	readError = this.error.asReadonly();

	fetchUser(userName: string) {
		this.loading.set(true);
		this.error.set(null);
		return this.httpClient
			.get<UserType>('https://api.github.com/users/' + userName, {})
			.pipe(
				tap((userData) => {
					this.user.set(userData);
					this.loading.set(false);
				}),
				catchError((error) => {
					const message = this.handleHttpError(error);
					this.error.set(message);
					this.loading.set(false);
					return throwError(() => new Error(message));
				})
			);
	}

	fetchUserRepos(userName: string) {
		return this.httpClient
			.get<RepoType[]>(
				'https://api.github.com/users/' + userName + '/repos',
				{}
			)
			.pipe(
				tap((repoData) => {
					this.repos.set(repoData);
					this.loading.set(false);
				}),
				catchError((error) => {
					const message = this.handleHttpError(error);
					this.error.set(message);
					this.loading.set(false);
					return throwError(() => new Error(message));
				})
			);
	}

	private handleHttpError(error: any): string {
		if (error.status === 404) return 'User not found';
		if (error.status === 403) return 'Max request limit';
		return 'Unkown error. Please, try later.';
	}

	constructor() {}
}
