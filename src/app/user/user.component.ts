import { Component, inject, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [DatePipe],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit{
  private userService = inject(UserService);
  user = this.userService.readUser;

  ngOnInit(): void {
    this.userService.fetchUser('Peagah-Vieira').subscribe(() => {
      console.log('User:', this.user())
    });
  }
}
