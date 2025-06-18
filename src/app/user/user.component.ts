import { Component, inject, model, OnInit, signal } from '@angular/core';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { repos, user } from './dummyuser';

@Component({
  selector: 'app-user',
  imports: [DatePipe, FormsModule],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  private userService = inject(UserService);
  user = this.userService.readUser;
  repos = this.userService.readRepos;

  // user = signal(user);
  // repos = signal(repos);

  showRepos = signal(false);

  toggleRepos() {
    this.showRepos.update((value) => !value);
  }

  userName = model('Peagah-vieira');

  ngOnInit(): void {
    this.fetchUserData();
  }

  onClick() {
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
