import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
	let component: SearchComponent;
	let fixture: ComponentFixture<SearchComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SearchComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize userNameModel with input value', async () => {
		await fixture.componentRef.setInput('userName', 'joao-vtr-oliveira');
		fixture.detectChanges();

		await fixture.whenStable();

		const input: HTMLInputElement = fixture.nativeElement.querySelector(
			'[data-testid="inputText-searchComponent"]'
		);

		// aguarda até que o valor seja atualizado
		waitForAsync(() => {
			expect(input.value).toBe('joao-vtr-oliveira');
		});
	});
	it('should initialize userNameModel with input value', async () => {
		await fixture.componentRef.setInput('userName', 'joao-vtr-oliveira');
		fixture.detectChanges();
		await fixture.whenStable();

		const input: HTMLInputElement = fixture.nativeElement.querySelector(
			'[data-testid="inputText-searchComponent"]'
		);
		expect(input.value).toBe('joao-vtr-oliveira');
	});
	it('should emit inputEvent with correct value when button is clicked', async () => {
		const spy = jest.spyOn(component.inputEvent, 'emit');
		component.userNameModel = 'usuario-teste';
		fixture.detectChanges();

		const button: HTMLButtonElement =
			fixture.nativeElement.querySelector('button');
		button.click();

		expect(spy).toHaveBeenCalledWith('usuario-teste');
	});
});
