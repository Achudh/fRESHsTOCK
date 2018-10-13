import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { NavController } from 'ionic-angular';

import { AssetsPage } from './assets.component';

	import { ShipmentPage } from '../assets/Shipment/Shipment.component';
	import { ContractPage } from '../assets/Contract/Contract.component';

class NavControllerMock{
	push(event,asset){
		return;
	}
}

describe('AssetsPage', () => {
	let fixture;
	let component;

  	beforeEach(async(() => {

    	TestBed.configureTestingModule({
			declarations: [
				AssetsPage
			],
			imports: [
				IonicModule.forRoot(AssetsPage)
			],
			providers: [
				{ provide : NavController, useClass: NavControllerMock }
			]
    	})
  	}));

  	beforeEach(() => {
    	fixture = TestBed.createComponent(AssetsPage);
    	component = fixture.componentInstance;
  	});

  	it('should create AssetsPage component', () => {
		expect(component instanceof AssetsPage).toBe(true);
  	});

	it('should have correct title',() => {
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain('Assets');
	});

	it('should initialize with all assets',() => {
		expect(component.assetList).toEqual([{'name':'Shipment','component':ShipmentPage},{'name':'Contract','component':ContractPage}]);
	});

	it('should push correct component for navigation',fakeAsync(() => {
		let asset = {'component':{'some':'value'}};
		spyOn(NavControllerMock.prototype,'push');
		component.assetTapped('',asset);
		tick();
		expect(NavControllerMock.prototype.push).toHaveBeenCalledWith({'some':'value'});
  	}));

});
