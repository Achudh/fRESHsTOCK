import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AlertController, LoadingController, NavParams, ModalController, IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ShipmentReceivedPage} from './ShipmentReceived.component';
import { ShipmentReceivedForm } from './ShipmentReceived.form.component';
import { ShipmentReceivedService } from '../../../services/transactions/ShipmentReceived/ShipmentReceived.service';
import { ShipmentReceived} from '../../../org.acme.shipping.perishable';
import { TransactionViewPage } from '../../transaction-view/transaction-view.component';


let ShipmentReceivedOne = new ShipmentReceived();
ShipmentReceivedOne.transactionId = "ShipmentReceived1"
let ShipmentReceivedTwo = new ShipmentReceived();
ShipmentReceivedTwo.transactionId = "ShipmentReceived2"
let ShipmentReceivedThree = new ShipmentReceived();
ShipmentReceivedThree.transactionId = "ShipmentReceived3"

class serviceShipmentReceivedPageMock{
	getAll(){
		return new Promise((resolve,reject)=>{
			resolve([ShipmentReceivedOne,ShipmentReceivedTwo,ShipmentReceivedThree]);
		});
	}
}

class LoadingControllerMock{
	create(value){
		return new LoadingMock();
	}
}

class LoadingMock{
	present(){
		return;
	}
	dismiss(){
		return;
	}
}

class AlertControllerMock{
	create(value){
		return new AlertMock();
	}
}

class AlertMock{
	present(){
		return;
	}
	dismiss(){
		return;
	}
}

class ModalControllerMock {
	public presentableRef = {
	  present: () => Promise.resolve(),
	  dismiss: (data?: any) => {
		if (this.dismissCallbackFn) {
		  this.dismissCallbackFn(data);
		}
		return Promise.resolve({});
	  },
	  onDidDismiss: (fn) => {
		this.dismissCallbackFn = fn;
	  }
	};

	public dismissCallbackFn = null;

	public create(options?) {
	  return Object.assign(this.presentableRef, options);
	}
  }

class ModalMock{
	present(){
		return;
	}
	dismiss(){
		return;
	}
	onDidDismiss(){
		return;
	}
}

describe('ShipmentReceivedPage', () => {
	let fixture;
	let component;
	let loadingMock = new LoadingMock();
	let alertMock = new AlertMock();
	let modalMock = new ModalMock();

  	beforeEach(async(() => {

    	TestBed.configureTestingModule({
			declarations: [
				ShipmentReceivedPage
			],
			imports: [
				IonicModule.forRoot(ShipmentReceivedPage)
			],
			providers: [
				{ provide: NavParams },
				{ provide: AlertController, useClass: AlertControllerMock },
				{ provide: LoadingController, useClass: LoadingControllerMock },
				{ provide: ModalController, useClass: ModalControllerMock },
				{ provide: ShipmentReceivedService, useClass:serviceShipmentReceivedPageMock }
			]
    	})
  	}));

  	beforeEach(() => {
		spyOn(serviceShipmentReceivedPageMock.prototype,'getAll').and.callThrough();
    	fixture = TestBed.createComponent(ShipmentReceivedPage);
    	component = fixture.componentInstance;
  	});

  	it('should create ShipmentReceivedPage component', () => {
		expect(component instanceof ShipmentReceivedPage).toBe(true);
	});

	it('should have correct title',() => {
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain('ShipmentReceived');
	});

	it('should return ShipmentReceived transactions', fakeAsync(() => {
		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');

		component.ionViewWillEnter();
		tick();

		expect(component.currentTransactions.length).toEqual(3);
		expect(component.transactions.length).toEqual(3);
	}));

	it('ShipmentReceived transactions should be a ShipmentReceived type', fakeAsync(() => {
		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');

		component.ionViewWillEnter();
		tick();

		expect(component.currentTransactions[0] instanceof ShipmentReceived).toBe(true);
		expect(component.currentTransactions[1] instanceof ShipmentReceived).toBe(true);
		expect(component.currentTransactions[2] instanceof ShipmentReceived).toBe(true);
	  }));

	it('should present and dismiss loading alert', fakeAsync(() => {
		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');

		component.ionViewWillEnter();
		tick();

		expect(LoadingControllerMock.prototype.create).toHaveBeenCalled();
		expect(LoadingMock.prototype.present).toHaveBeenCalled();
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
		expect(component.transactionsLoaded).toEqual(true);
	}));

	it('should get same items when no search text', fakeAsync(() => {
		let ev = {target:{value:""}};
		component.getTransactions(ev);
		tick();

		expect(component.currentTransactions).toEqual([ShipmentReceivedOne,ShipmentReceivedTwo,ShipmentReceivedThree]);

	}));

	it('should get some items when there is partially matching search text', fakeAsync(() => {
		let ev = {target:{value:"3"}};
		component.getTransactions(ev);
		tick();

		expect(component.transactions).toEqual([ShipmentReceivedThree]);

	}));

	it('should get no transactions when there is no matching search text', fakeAsync(() => {
		let ev = {target:{value:"randomstring"}};
		component.getTransactions(ev);
		tick();

		expect(component.transactions).toEqual([]);

	}));

	it('should refresh and fetch latest items', fakeAsync(() => {
		let refresher = {complete:function(){return;}};

		spyOn(refresher,'complete');
		component.refreshTransactions(refresher);
		tick();

		expect(component.currentTransactions).toEqual([ShipmentReceivedOne,ShipmentReceivedTwo,ShipmentReceivedThree]);
		expect(component.transactions).toEqual([ShipmentReceivedOne,ShipmentReceivedTwo,ShipmentReceivedThree]);
		expect(refresher.complete).toHaveBeenCalled();

	}));

	it('should open model to view transaction', fakeAsync(() => {
		spyOn(ModalControllerMock.prototype,'create').and.returnValue(modalMock);
		spyOn(ModalMock.prototype,'present');
		let transactionIdentifier = 'transactionIdentifier';
		component.viewTransaction(transactionIdentifier);
		tick();
		expect(ModalControllerMock.prototype.create).toHaveBeenCalledWith(
			TransactionViewPage, {
				transactionId: transactionIdentifier, transactionType: 'ShipmentReceived'
			}
		)
		expect(ModalMock.prototype.present).toHaveBeenCalled();
	}));

	it('should open model to add ShipmentReceived transaction', fakeAsync(() => {
		spyOn(ModalControllerMock.prototype,'create').and.returnValue(modalMock);
		spyOn(ModalMock.prototype,'present');
		spyOn(ModalMock.prototype,'onDidDismiss');

		component.addTransaction();

		tick();

		expect(ModalControllerMock.prototype.create).toHaveBeenCalledWith(
			ShipmentReceivedForm, {
				transactionType: 'ShipmentReceived',
				properties: [{"name":"shipment","type":"Shipment","optional":false,"primitive":false,"array":false,"enum":false,"enumValues":[]},{"name":"transactionId","type":"String","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"timestamp","type":"DateTime","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]}],
				formType: 'Add'
			}
		)
		expect(ModalMock.prototype.present).toHaveBeenCalled();
		expect(ModalMock.prototype.onDidDismiss).toHaveBeenCalled();

	}));


	it('should get all ShipmentReceived transactions after an add ShipmentReceived form is completed', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.addTransaction();
		tick();

		modal.dismiss({ loading: new LoadingMock(), response: {transactionId:'transactionIdAdded'} });
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(serviceShipmentReceivedPageMock.prototype.getAll).toHaveBeenCalled();
		expect(component.currentTransactions).toEqual([ShipmentReceivedOne,ShipmentReceivedTwo,ShipmentReceivedThree]);
		expect(component.transactions).toEqual([ShipmentReceivedOne,ShipmentReceivedTwo,ShipmentReceivedThree]);
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).toHaveBeenCalledWith({
			title: 'Added ShipmentReceived',
			subTitle: 'The ShipmentReceived transaction has been submitted with the ID: transactionIdAdded',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).toHaveBeenCalled();

	}));

	it('should handle add ShipmentReceived form dismissal', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.addTransaction();
		tick();

		modal.dismiss({});
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(component.currentTransactions).not.toEqual([ShipmentReceivedOne,ShipmentReceivedTwo,ShipmentReceivedThree]);
		expect(component.transactions).not.toEqual([ShipmentReceivedOne,ShipmentReceivedTwo,ShipmentReceivedThree]);
		expect(LoadingMock.prototype.dismiss).not.toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).not.toHaveBeenCalledWith({
			title: 'Added ShipmentReceived',
			subTitle: 'transactionIdAdded has been added',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).not.toHaveBeenCalled();

	}));


});
