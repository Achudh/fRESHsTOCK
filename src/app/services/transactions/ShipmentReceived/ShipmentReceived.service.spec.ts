import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { ShipmentReceivedService } from './ShipmentReceived.service';
import { DataService } from '../../../services/data.service';

class DataServiceMock{
	getAll(){
		return;
	}

	get(id){
		return;
	}
	add(transaction){
		return;
	}
}

describe('ShipmentReceivedService', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ShipmentReceivedService,
				{ provide: DataService, useClass:DataServiceMock }
			]
		});
	});

	it('should set namespace',fakeAsync(inject([ShipmentReceivedService], (service: ShipmentReceivedService) => {
		expect(service.namespace).toContain('ShipmentReceived');
	})));

	it('should get all ShipmentReceived transactions',fakeAsync(inject([ShipmentReceivedService], (service: ShipmentReceivedService) => {
		let spy = spyOn(DataServiceMock.prototype,'getAll');

		service.getAll();
		tick();
		expect(spy.calls.argsFor(0)).toContain('ShipmentReceived');
	})));

	it('should get ShipmentReceived transaction',fakeAsync(inject([ShipmentReceivedService], (service: ShipmentReceivedService) => {
		let identifier = "ShipmentReceived123";
		let spy = spyOn(DataServiceMock.prototype,'get');

		service.get(identifier);
		tick();
		expect(spy.calls.argsFor(0)).toContain('ShipmentReceived');
		expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should add ShipmentReceived transaction',fakeAsync(inject([ShipmentReceivedService], (service: ShipmentReceivedService) => {
		let spy = spyOn(DataServiceMock.prototype,'add');

		service.add({'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('ShipmentReceived');
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});
	})));
});
