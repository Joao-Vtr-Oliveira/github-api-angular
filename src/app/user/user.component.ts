import { Component, inject, model, OnInit, signal } from '@angular/core';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [DatePipe, FormsModule],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  private userService = inject(UserService);
  user = this.userService.readUser;

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
  }
}
