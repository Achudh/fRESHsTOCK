import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { TemperatureReadingService } from './TemperatureReading.service';
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

describe('TemperatureReadingService', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				TemperatureReadingService,
				{ provide: DataService, useClass:DataServiceMock }
			]
		});
	});

	it('should set namespace',fakeAsync(inject([TemperatureReadingService], (service: TemperatureReadingService) => {
		expect(service.namespace).toContain('TemperatureReading');
	})));

	it('should get all TemperatureReading transactions',fakeAsync(inject([TemperatureReadingService], (service: TemperatureReadingService) => {
		let spy = spyOn(DataServiceMock.prototype,'getAll');

		service.getAll();
		tick();
		expect(spy.calls.argsFor(0)).toContain('TemperatureReading');
	})));

	it('should get TemperatureReading transaction',fakeAsync(inject([TemperatureReadingService], (service: TemperatureReadingService) => {
		let identifier = "TemperatureReading123";
		let spy = spyOn(DataServiceMock.prototype,'get');

		service.get(identifier);
		tick();
		expect(spy.calls.argsFor(0)).toContain('TemperatureReading');
		expect(spy.calls.argsFor(0)).toContain(identifier);
	})));

	it('should add TemperatureReading transaction',fakeAsync(inject([TemperatureReadingService], (service: TemperatureReadingService) => {
		let spy = spyOn(DataServiceMock.prototype,'add');

		service.add({'id':'idval'});
		tick();
		expect(spy.calls.argsFor(0)).toContain('TemperatureReading');
		expect(spy.calls.argsFor(0)).toContain({'id':'idval'});
	})));
});
