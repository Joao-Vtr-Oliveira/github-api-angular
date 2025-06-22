import {
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick,
} from '@angular/core/testing';

import { RepositoriesComponent } from './repositories.component';
import { dummyRepos } from '../../utils/dummyUserTest';

describe('TestComponent', () => {
	let component: RepositoriesComponent;
	let fixture: ComponentFixture<RepositoriesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RepositoriesComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(RepositoriesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('li length should be the same as the dummy ', fakeAsync(() => {
		fixture.componentRef.setInput('repos', dummyRepos);
		tick();
		fixture.detectChanges();

		const liDebugItens: HTMLLIElement[] =
			fixture.nativeElement.querySelectorAll(
				'[data-testid="liItem-repositories-component"]'
			);
		expect(liDebugItens.length).toBe(dummyRepos.length);
	}));

	it('li component should have the same name of the dummy repo', fakeAsync(() => {
		fixture.componentRef.setInput('repos', dummyRepos);
		tick();
		fixture.detectChanges();

		const liDebugItens: HTMLLIElement[] =
			fixture.nativeElement.querySelectorAll(
				'[data-testid="liItem-repositories-component"]'
			);
		liDebugItens.forEach((li, index) => {
			const repoNameEl = li.querySelector('[data-testid="repoName"]');
			expect(repoNameEl).not.toBeNull();
			expect(repoNameEl!.textContent).toContain(dummyRepos[index].name);
		});
	}));

	it('li component should have the same number of stars as the dummy', fakeAsync(() => {
		fixture.componentRef.setInput('repos', dummyRepos);
		tick();
		fixture.detectChanges();
		
		const liDebugItens: HTMLLIElement[] =
			fixture.nativeElement.querySelectorAll(
				'[data-testid="liItem-repositories-component"]'
			);
		liDebugItens.forEach((li, index) => {
			const repoStarsEl = li.querySelector('[data-testid="repoStars"]');
			expect(repoStarsEl).not.toBeNull();
			expect(repoStarsEl!.textContent).toContain(String(dummyRepos[index].stargazers_count));
		});
	}));
});
