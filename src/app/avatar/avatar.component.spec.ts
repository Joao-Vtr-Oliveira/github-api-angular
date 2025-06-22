import {
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick,
} from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';
import { dummy } from '../../utils/dummyUserTest';

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
