import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { GrowerService } from './Grower.service';
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
	update(id,participant){
		return;
	}
}

describe('GrowerService', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				GrowerService,
				{ provide: DataService, useClass:DataServiceMock }
			]
		});
	});

	it('should set namespace',fakeAsync(inject([GrowerService], (service: GrowerService) => {
		expect(service.namespace).toContain('Grower');
	})));

	it('should get all Grower participants',fakeAsync(inject([GrowerService], (service: GrowerService) => {
		let spy = spyOn(DataServiceMock.prototype,'getAll');

		service.getAll();
		tick();
		expect(spy.calls.argsFor(0)).toContain('Grower');
	})));

	it('should delete Grower participant',fakeAsync(inject([GrowerService], (service: GrowerService) => {
			let identifier = "Grower123";
			let spy = spyOn(DataServiceMock.prototype,'delete');

			service.delete(identifier);
			tick();
			expect(spy.calls.argsFor(0)).toContain('Grower');
			expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should get Grower participant',fakeAsync(inject([GrowerService], (service: GrowerService) => {
		let identifier = "Grower123";
		let spy = spyOn(DataServiceMock.prototype,'get');

		service.get(identifier);
		tick();
		expect(spy.calls.argsFor(0)).toContain('Grower');
		expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should add Grower participant',fakeAsync(inject([GrowerService], (service: GrowerService) => {
		let spy = spyOn(DataServiceMock.prototype,'add');

		service.add({'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('Grower');
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});
	})));

	it('should update Grower participant',fakeAsync(inject([GrowerService], (service: GrowerService) => {
		let identifier = "Grower123";

		let spy = spyOn(DataServiceMock.prototype,'update');

		service.update(identifier,{'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('Grower');
		expect(spy.calls.argsFor(0)).toContain(identifier);
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});

	})));

});
