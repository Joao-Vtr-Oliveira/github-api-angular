import { Component } from '@angular/core';
import { UserComponent } from './user/user.component';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
})
export class AppComponent {}
