import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { ShipperService } from './Shipper.service';
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

describe('ShipperService', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ShipperService,
				{ provide: DataService, useClass:DataServiceMock }
			]
		});
	});

	it('should set namespace',fakeAsync(inject([ShipperService], (service: ShipperService) => {
		expect(service.namespace).toContain('Shipper');
	})));

	it('should get all Shipper participants',fakeAsync(inject([ShipperService], (service: ShipperService) => {
		let spy = spyOn(DataServiceMock.prototype,'getAll');

		service.getAll();
		tick();
		expect(spy.calls.argsFor(0)).toContain('Shipper');
	})));

	it('should delete Shipper participant',fakeAsync(inject([ShipperService], (service: ShipperService) => {
			let identifier = "Shipper123";
			let spy = spyOn(DataServiceMock.prototype,'delete');

			service.delete(identifier);
			tick();
			expect(spy.calls.argsFor(0)).toContain('Shipper');
			expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should get Shipper participant',fakeAsync(inject([ShipperService], (service: ShipperService) => {
		let identifier = "Shipper123";
		let spy = spyOn(DataServiceMock.prototype,'get');

		service.get(identifier);
		tick();
		expect(spy.calls.argsFor(0)).toContain('Shipper');
		expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should add Shipper participant',fakeAsync(inject([ShipperService], (service: ShipperService) => {
		let spy = spyOn(DataServiceMock.prototype,'add');

		service.add({'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('Shipper');
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});
	})));

	it('should update Shipper participant',fakeAsync(inject([ShipperService], (service: ShipperService) => {
		let identifier = "Shipper123";

		let spy = spyOn(DataServiceMock.prototype,'update');

		service.update(identifier,{'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('Shipper');
		expect(spy.calls.argsFor(0)).toContain(identifier);
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});

	})));

});
