import {
	Component,
	inject,
	input,
	output,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-search',
	imports: [FormsModule],
	templateUrl: './search.component.html',
})
export class SearchComponent implements OnChanges {
	userName = input<string | undefined>();
	inputEvent = output<string>();
	private router = inject(Router);

	userNameModel = '';

	ngOnChanges(changes: SimpleChanges) {
		if (changes['userName'] && changes['userName'].currentValue !== undefined) {
			this.userNameModel = changes['userName'].currentValue;
		}
	}

	onEvent() {
		this.inputEvent.emit(this.userNameModel);
	}
}
