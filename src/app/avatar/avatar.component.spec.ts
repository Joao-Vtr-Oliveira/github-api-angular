import {
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick,
} from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';
import { UserType } from '../user/user.model';

describe('TestComponent', () => {
	let component: AvatarComponent;
	let fixture: ComponentFixture<AvatarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AvatarComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AvatarComponent);
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
			followers: 0,
			following: 0,
		};
		fixture.componentRef.setInput('user', dummy);
		tick();
		fixture.detectChanges();

		const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
		expect(img.src).toContain('https://example.com/avatar.jpg');
	}));
	it('should use default avatar when user is undefined', () => {
		fixture.componentRef.setInput('user', undefined);
		fixture.detectChanges();

		const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
		expect(img.src).toContain(
			'http://localhost/pngegg.png'
		);
	});
});
