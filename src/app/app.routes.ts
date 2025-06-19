import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'user/joao-vtr-oliveira', pathMatch: 'full' },
	{ path: 'user/:username', component: UserComponent },
	{ path: '**', redirectTo: '' },
];
