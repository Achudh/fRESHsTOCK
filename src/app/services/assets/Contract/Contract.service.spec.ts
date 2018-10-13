import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { ContractService } from './Contract.service';
import { DataService } from '../../../services/data.service';

class DataServiceMock{
	getAll(){
		return;
	}
	delete(id){
		return;
	}
	get(id){
		return;
	}
	add(){
		return;
	}
	update(id,asset){
		return;
	}
}

describe('ContractService', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ContractService,
				{ provide: DataService, useClass:DataServiceMock }
			]
		});
	});

	it('should set namespace',fakeAsync(inject([ContractService], (service: ContractService) => {
		expect(service.namespace).toContain('Contract');
	})));

	it('should get all Contract assets',fakeAsync(inject([ContractService], (service: ContractService) => {
		let spy = spyOn(DataServiceMock.prototype,'getAll');

		service.getAll();
		tick();
		expect(spy.calls.argsFor(0)).toContain('Contract');
	})));

	it('should delete Contract asset',fakeAsync(inject([ContractService], (service: ContractService) => {
			let identifier = "Contract123";
			let spy = spyOn(DataServiceMock.prototype,'delete');

			service.delete(identifier);
			tick();
			expect(spy.calls.argsFor(0)).toContain('Contract');
			expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should get Contract asset',fakeAsync(inject([ContractService], (service: ContractService) => {
		let identifier = "Contract123";
		let spy = spyOn(DataServiceMock.prototype,'get');

		service.get(identifier);
		tick();
		expect(spy.calls.argsFor(0)).toContain('Contract');
		expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should add Contract asset',fakeAsync(inject([ContractService], (service: ContractService) => {
		let spy = spyOn(DataServiceMock.prototype,'add');

		service.add({'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('Contract');
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});
	})));

	it('should update Contract asset',fakeAsync(inject([ContractService], (service: ContractService) => {
		let identifier = "Contract123";

		let spy = spyOn(DataServiceMock.prototype,'update');

		service.update(identifier,{'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('Contract');
		expect(spy.calls.argsFor(0)).toContain(identifier);
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});

	})));

});
