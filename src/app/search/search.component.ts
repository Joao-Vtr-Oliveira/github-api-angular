import {
	Component,
	input,
	output,
	effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-search',
	imports: [FormsModule],
	templateUrl: './search.component.html',
})
export class SearchComponent {
	userName = input<string | undefined>();
	inputEvent = output<string>();

	userNameModel = '';

	constructor() {
		effect(() => {
			const value = this.userName();
			this.userNameModel = value ?? '';
		});
	}

	onEvent() {
		this.inputEvent.emit(this.userNameModel);
	}
}
