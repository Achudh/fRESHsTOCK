import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { ShipmentService } from './Shipment.service';
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

describe('ShipmentService', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ShipmentService,
				{ provide: DataService, useClass:DataServiceMock }
			]
		});
	});

	it('should set namespace',fakeAsync(inject([ShipmentService], (service: ShipmentService) => {
		expect(service.namespace).toContain('Shipment');
	})));

	it('should get all Shipment assets',fakeAsync(inject([ShipmentService], (service: ShipmentService) => {
		let spy = spyOn(DataServiceMock.prototype,'getAll');

		service.getAll();
		tick();
		expect(spy.calls.argsFor(0)).toContain('Shipment');
	})));

	it('should delete Shipment asset',fakeAsync(inject([ShipmentService], (service: ShipmentService) => {
			let identifier = "Shipment123";
			let spy = spyOn(DataServiceMock.prototype,'delete');

			service.delete(identifier);
			tick();
			expect(spy.calls.argsFor(0)).toContain('Shipment');
			expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should get Shipment asset',fakeAsync(inject([ShipmentService], (service: ShipmentService) => {
		let identifier = "Shipment123";
		let spy = spyOn(DataServiceMock.prototype,'get');

		service.get(identifier);
		tick();
		expect(spy.calls.argsFor(0)).toContain('Shipment');
		expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should add Shipment asset',fakeAsync(inject([ShipmentService], (service: ShipmentService) => {
		let spy = spyOn(DataServiceMock.prototype,'add');

		service.add({'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('Shipment');
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});
	})));

	it('should update Shipment asset',fakeAsync(inject([ShipmentService], (service: ShipmentService) => {
		let identifier = "Shipment123";

		let spy = spyOn(DataServiceMock.prototype,'update');

		service.update(identifier,{'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('Shipment');
		expect(spy.calls.argsFor(0)).toContain(identifier);
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});

	})));

});
