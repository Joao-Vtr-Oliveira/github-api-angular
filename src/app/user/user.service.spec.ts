import { TestBed } from '@angular/core/testing';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { emptyUser } from './dummyuser';
import { dummy, dummyRepos } from '../../utils/dummyUserTest';

describe('UserService', () => {
	let service: UserService;
	let httpMock: HttpTestingController;


	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [UserService],
		});
		service = TestBed.inject(UserService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('deve buscar usuário e atualizar signals', () => {
		service.fetchUser('joao-vtr-oliveira').subscribe();

		const req = httpMock.expectOne(
			'https://api.github.com/users/joao-vtr-oliveira'
		);
		expect(req.request.method).toBe('GET');
		req.flush(dummy);

		expect(service.readUser()).toEqual(dummy);
		expect(service.readLoading()).toBe(false);
		expect(service.readError()).toBe(null);
	});

	it('deve tratar erro ao buscar usuário', () => {
		service.fetchUser('nao-existe').subscribe({
			error: () => {
				expect(service.readError()).toBe('User not found');
				expect(service.readUser()).toEqual(emptyUser);
				expect(service.readLoading()).toBe(false);
			},
		});

		const req = httpMock.expectOne('https://api.github.com/users/nao-existe');
		req.flush({}, { status: 404, statusText: 'Not Found' });
	});

	it('deve buscar repositórios e atualizar signals', () => {
		service.fetchUserRepos('joao-vtr-oliveira').subscribe();

		const req = httpMock.expectOne(
			'https://api.github.com/users/joao-vtr-oliveira/repos'
		);
		expect(req.request.method).toBe('GET');
		req.flush(dummyRepos);

		expect(service.readRepos()).toEqual(dummyRepos);
		expect(service.readLoading()).toBe(false);
		expect(service.readError()).toBeNull();
	});

	it('deve tratar erro ao buscar repositórios', () => {
		service.fetchUserRepos('nao-existe').subscribe({
			error: () => {
				expect(service.readError()).toBe('User not found');
				expect(service.readRepos()).toEqual([]);
				expect(service.readLoading()).toBe(false);
			},
		});

		const req = httpMock.expectOne(
			'https://api.github.com/users/nao-existe/repos'
		);
		req.flush({}, { status: 404, statusText: 'Not Found' });
	});
});
