import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { ImporterService } from './Importer.service';
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

describe('ImporterService', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ImporterService,
				{ provide: DataService, useClass:DataServiceMock }
			]
		});
	});

	it('should set namespace',fakeAsync(inject([ImporterService], (service: ImporterService) => {
		expect(service.namespace).toContain('Importer');
	})));

	it('should get all Importer participants',fakeAsync(inject([ImporterService], (service: ImporterService) => {
		let spy = spyOn(DataServiceMock.prototype,'getAll');

		service.getAll();
		tick();
		expect(spy.calls.argsFor(0)).toContain('Importer');
	})));

	it('should delete Importer participant',fakeAsync(inject([ImporterService], (service: ImporterService) => {
			let identifier = "Importer123";
			let spy = spyOn(DataServiceMock.prototype,'delete');

			service.delete(identifier);
			tick();
			expect(spy.calls.argsFor(0)).toContain('Importer');
			expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should get Importer participant',fakeAsync(inject([ImporterService], (service: ImporterService) => {
		let identifier = "Importer123";
		let spy = spyOn(DataServiceMock.prototype,'get');

		service.get(identifier);
		tick();
		expect(spy.calls.argsFor(0)).toContain('Importer');
		expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should add Importer participant',fakeAsync(inject([ImporterService], (service: ImporterService) => {
		let spy = spyOn(DataServiceMock.prototype,'add');

		service.add({'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('Importer');
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});
	})));

	it('should update Importer participant',fakeAsync(inject([ImporterService], (service: ImporterService) => {
		let identifier = "Importer123";

		let spy = spyOn(DataServiceMock.prototype,'update');

		service.update(identifier,{'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('Importer');
		expect(spy.calls.argsFor(0)).toContain(identifier);
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});

	})));

});
