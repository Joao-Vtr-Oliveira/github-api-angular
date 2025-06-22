import {
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick,
} from '@angular/core/testing';

import { ExtraDataComponent } from './extra-data.component';
import { UserType } from '../user/user.model';

describe('TestComponent', () => {
	let component: ExtraDataComponent;
	let fixture: ComponentFixture<ExtraDataComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ExtraDataComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(ExtraDataComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should use user avatar', fakeAsync(() => {
		const dummy: UserType = {
			name: 'João Vitor',
			login: 'joao-vtr-oliveira',
			avatar_url: 'https://example.com/avatar.jpg',
			created_at: new Date().toISOString(),
			html_url: '',
			repos_url: '',
			company: null,
			location: null,
			email: null,
			hirable: false,
			bio: '',
			followers: 10,
			following: 8,
		};
		fixture.componentRef.setInput('user', dummy);
		tick();
		fixture.detectChanges();

		const spanFollowers: HTMLSpanElement = fixture.nativeElement.querySelector('[data-testid="spanFollowers-extra-data"]');
		expect(spanFollowers.textContent).toContain('10');
	}));
});
