import { Component, inject, input } from '@angular/core';
import { UserType } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
	selector: 'app-name-bio',
	imports: [],
	templateUrl: './name-bio.component.html',
})
export class NameBioComponent {
	user = input<UserType | undefined>();
  userService = inject(UserService);
}
