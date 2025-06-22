import {
	Component,
	inject,
	input,
	output,
	OnChanges,
	SimpleChanges,
	effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-search',
	imports: [FormsModule],
	templateUrl: './search.component.html',
})
export class SearchComponent {
	userName = input<string | undefined>();
	inputEvent = output<string>();
	private router = inject(Router);

	userNameModel = '';

	// ngOnChanges(changes: SimpleChanges) {
	// 	if (changes['userName']) {
	// 		this.userNameModel = changes['userName'].currentValue ?? '';
	// 	}
	// }

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
