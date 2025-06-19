import {
	Component,
	inject,
	model,
	OnInit,
	OnDestroy,
	signal,
} from '@angular/core';
import { UserService } from './user.service';
import { FormsModule } from '@angular/forms';
import { repos, user } from './dummyuser';
import { AvatarComponent } from '../avatar/avatar.component';
import { SearchComponent } from '../search/search.component';
import { RepositoriesComponent } from '../repositories/repositories.component';
import { ExtraDataComponent } from '../extra-data/extra-data.component';
import { NameBioComponent } from '../name-bio/name-bio.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-user',
	imports: [
		FormsModule,
		AvatarComponent,
		SearchComponent,
		RepositoriesComponent,
		ExtraDataComponent,
		NameBioComponent,
	],
	templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, OnDestroy {
	userService = inject(UserService);
	user = this.userService.readUser;
	repos = this.userService.readRepos;

	private route = inject(ActivatedRoute);
	private router = inject(Router);

	private routeSub?: Subscription;

	showRepos = signal(false);

	toggleRepos() {
		this.showRepos.update((value) => !value);
	}
	userName = signal<string>('');

	ngOnInit(): void {
		this.routeSub = this.route.paramMap.subscribe((params) => {
			const username = params.get('username');
			if (username) {
				this.userName.set(username);
				this.fetchUserData();
			}
		});
	}

	ngOnDestroy(): void {
		this.routeSub?.unsubscribe();
	}

	onEvent(username: string) {
		this.userName.set(username);
		this.router.navigate(['/user', username]);
	}

	fetchUserData() {
		this.userService.fetchUser(this.userName()).subscribe({
			next: (user) => {
			},
			error: () => {
				console.log('Meu erro:', this.userService.readError());
			},
		});
		this.userService.fetchUserRepos(this.userName()).subscribe({
			next: (repo) => {
			},
			error: () => {
				console.log('Meu erro repo:', this.userService.readError());
			},
		});
	}
}
