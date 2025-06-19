import { Component, input } from '@angular/core';
import { UserType } from '../user/user.model';

@Component({
	selector: 'app-avatar',
	imports: [],
	templateUrl: './avatar.component.html',
})
export class AvatarComponent {
	user = input<UserType | undefined>();
}
