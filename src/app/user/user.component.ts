import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit{
  private userService = inject(UserService);
  user = this.userService.readUser;

  ngOnInit(): void {
    this.userService.fetchUser('joao-vtr-oliveira').subscribe(() => {
      console.log('User:', this.user())
    });
  }
}
