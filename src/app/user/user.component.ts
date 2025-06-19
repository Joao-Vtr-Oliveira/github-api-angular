import { Component, inject, model, OnInit, signal } from '@angular/core';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { repos, user } from './dummyuser';
import { AvatarComponent } from "../avatar/avatar.component";
import { SearchComponent } from "../search/search.component";
import { RepositoriesComponent } from "../repositories/repositories.component";
import { ExtraDataComponent } from "../extra-data/extra-data.component";

@Component({
  selector: 'app-user',
  imports: [DatePipe, FormsModule, AvatarComponent, SearchComponent, RepositoriesComponent, ExtraDataComponent],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  private userService = inject(UserService);
  user = this.userService.readUser;
  repos = this.userService.readRepos;

  // user = signal(user);
  // repos = signal(repos);

  userName = signal('joao-vtr-oliveira');

    showRepos = signal(false);


  toggleRepos() {
    this.showRepos.update((value) => !value);
  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  onEvent(username: string) {
    this.userName.set(username)
    this.fetchUserData();
  }

  fetchUserData() {
    this.userService.fetchUser(this.userName()).subscribe(() => {
      console.log('User:', this.user());
    });
    this.userService.fetchUserRepos(this.userName()).subscribe(() => {
      console.log('Repos:', this.repos());
    });
  }
}
