import { Component, input } from '@angular/core';
import { UserType } from '../user/user.model';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-extra-data',
	imports: [DatePipe],
	templateUrl: './extra-data.component.html',
})
export class ExtraDataComponent {
	user = input<UserType | undefined>();
}
