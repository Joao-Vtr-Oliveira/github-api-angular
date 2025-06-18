import { Injectable, signal } from '@angular/core';
import { UserType } from './user.modal';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = signal<UserType | undefined>(undefined);

  async getUser(userName: string) {
    const data = await fetch('https://api.github.com/users/' + userName);
    const dataJson = await data.json() as UserType;

    console.log(dataJson);
    this.user.update((oldUser) => dataJson);
  }


  constructor() {}
}
