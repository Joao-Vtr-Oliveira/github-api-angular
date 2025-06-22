import {
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick,
} from '@angular/core/testing';

import { ExtraDataComponent } from './extra-data.component';
import { dummy } from '../../utils/dummyUserTest';
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
	it('should have 10 followers', fakeAsync(() => {
		fixture.componentRef.setInput('user', dummy);
		tick();
		fixture.detectChanges();

		const spanFollowers: HTMLSpanElement = fixture.nativeElement.querySelector(
			'[data-testid="spanFollowers-extra-data"]'
		);
		expect(spanFollowers.textContent).toContain('10');
	}));
	it('should have 8 following', fakeAsync(() => {
		fixture.componentRef.setInput('user', dummy);
		tick();
		fixture.detectChanges();

		const spanFollowing: HTMLSpanElement = fixture.nativeElement.querySelector(
			'[data-testid="spanFollowing-extra-data"]'
		);
		expect(spanFollowing.textContent).toContain('8');
	}));

		it('should have company name', fakeAsync(() => {
		const newDummy: UserType = { ...dummy, company: '@google' };
		fixture.componentRef.setInput('user', newDummy);
		tick();
		fixture.detectChanges();

		const anchorCompany: HTMLAnchorElement = fixture.nativeElement.querySelector(
			'[data-testid="anchorCompany-extra-data"]'
		);
		expect(anchorCompany.textContent).toContain(newDummy.company?.replace('@', ''));
	}));
});
