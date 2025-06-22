import {
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick,
} from '@angular/core/testing';

import { NameBioComponent } from './name-bio.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserType } from '../user/user.model';
import { UserService } from '../user/user.service';

class fakeUserServiceWithError {
	readError() {
		return 'User not found';
	}
	readLoading() {
		return false; // ou true, conforme o cenário que quiser simular
	}
	getUser() {
		throw new Error('Erro simulado');
	}
}

describe('TestComponent', () => {
	let component: NameBioComponent;
	let fixture: ComponentFixture<NameBioComponent>;
	let service: fakeUserServiceWithError;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [NameBioComponent],
			providers: [
				{ provide: UserService, useClass: fakeUserServiceWithError },
				provideHttpClient(),
				provideHttpClientTesting(),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(NameBioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = TestBed.inject(
			UserService
		) as unknown as fakeUserServiceWithError;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should have dummy login on anchor', fakeAsync(() => {
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

		const anchorLogin: HTMLAnchorElement = fixture.nativeElement.querySelector(
			'[data-testid="anchorLogin-name-bio"]'
		);
		expect(anchorLogin.textContent).toContain(dummy.login);
	}));
	it('should return an error if user is undefined', fakeAsync(() => {
		expect(service.readError()).toEqual('User not found');

		tick();
		fixture.detectChanges();

		const pErrorEl: HTMLParagraphElement = fixture.nativeElement.querySelector(
			'[data-testid="pError-name-bio"]'
		);
		expect(pErrorEl.textContent).toContain(service.readError());
	}));

	it('should return an unkown error', fakeAsync(() => {
		service.readError = () => 'Unkown error. Please, try later.';
		expect(service.readError()).toEqual('Unkown error. Please, try later.');

		tick();
		fixture.detectChanges();

		const pErrorEl: HTMLParagraphElement = fixture.nativeElement.querySelector(
			'[data-testid="pError-name-bio"]'
		);
		expect(pErrorEl.textContent).toContain(service.readError());
	}));

	it('should show loading state', fakeAsync(() => {
		service.readLoading = () => true;
		service.readError = () => '';
		expect(service.readLoading()).toBe(true);

		tick();
		fixture.detectChanges();

		const loadingEl: HTMLParagraphElement = fixture.nativeElement.querySelector(
			'[data-testid="pLoading-name-bio"]'
		);
		expect(loadingEl.textContent).toContain('Loading...');
	}));
});
