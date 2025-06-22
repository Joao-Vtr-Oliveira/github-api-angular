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
	it('should have dummy login on anchor', fakeAsync(() => {
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
});
