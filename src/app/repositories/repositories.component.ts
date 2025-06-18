import { Component, input, signal } from '@angular/core';
import { UserType } from '../user/user.model';
import { RepoType } from '../user/repo.model';

@Component({
  selector: 'app-repositories',
  imports: [],
  templateUrl: './repositories.component.html',
})
export class RepositoriesComponent {
  repos = input<RepoType[] | undefined>();
  showRepos = signal(false);


  toggleRepos() {
    this.showRepos.update((value) => !value);
  }
}
