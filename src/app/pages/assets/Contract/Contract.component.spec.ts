import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AlertController, LoadingController, NavParams, ModalController, IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ContractPage} from './Contract.component';
import { ContractForm } from './Contract.form.component'
import { ContractService } from '../../../services/assets/Contract/Contract.service';
import { Contract} from '../../../org.acme.shipping.perishable';
import { AssetViewPage } from '../../asset-view/asset-view.component';


let ContractOne = new Contract();
ContractOne.contractId = "Contract1"
let ContractTwo = new Contract();
ContractTwo.contractId = "Contract2"
let ContractThree = new Contract();
ContractThree.contractId = "Contract3"

class serviceContractPageMock{
	getAll(){
		return new Promise((resolve,reject)=>{
			resolve([ContractOne,ContractTwo,ContractThree]);
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

// class ModalControllerMock{
// 	create(value){
// 		return new ModalMock();
// 	}
// }

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



describe('ContractPage', () => {
	let fixture;
	let component;
	let loadingMock = new LoadingMock();
	let alertMock = new AlertMock();
	let modalMock = new ModalMock();

  	beforeEach(async(() => {

    	TestBed.configureTestingModule({
			declarations: [
				ContractPage
			],
			imports: [
				IonicModule.forRoot(ContractPage)
			],
			providers: [
				{ provide: NavParams },
				{ provide: AlertController, useClass: AlertControllerMock },
				{ provide: LoadingController, useClass: LoadingControllerMock },
				{ provide: ModalController, useClass: ModalControllerMock },
				{ provide: ContractService, useClass:serviceContractPageMock }
			]
    	})
  	}));

  	beforeEach(() => {
		spyOn(serviceContractPageMock.prototype,'getAll').and.callThrough();
    	fixture = TestBed.createComponent(ContractPage);
    	component = fixture.componentInstance;
  	});

  	it('should create ContractPage component', () => {
		expect(component instanceof ContractPage).toBe(true);
	});

	it('should have correct title',() => {
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain('Contract');
	});

	it('should return Contract assets', fakeAsync(() => {
		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');

		component.ionViewWillEnter();
		tick();

		expect(component.currentItems.length).toEqual(3);
		expect(component.items.length).toEqual(3);
	}));

	it('Contract assets should be a Contract type', fakeAsync(() => {
		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');

		component.ionViewWillEnter();
		tick();

		expect(component.currentItems[0] instanceof Contract).toBe(true);
		expect(component.currentItems[1] instanceof Contract).toBe(true);
		expect(component.currentItems[2] instanceof Contract).toBe(true);
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
		expect(component.itemsLoaded).toEqual(true);
	}));

	it('should get same items when no search text', fakeAsync(() => {
		let ev = {target:{value:""}};
		component.getItems(ev);
		tick();

		expect(component.currentItems).toEqual([ContractOne,ContractTwo,ContractThree]);

	}));

	it('should get some items when there is partially matching search text', fakeAsync(() => {
		let ev = {target:{value:"3"}};
		component.getItems(ev);
		tick();

		expect(component.items).toEqual([ContractThree]);

	}));

	it('should get no items when there is no matching search text', fakeAsync(() => {
		let ev = {target:{value:"randomstring"}};
		component.getItems(ev);
		tick();

		expect(component.items).toEqual([]);

	}));

	it('should refresh and fetch latest items', fakeAsync(() => {
		let refresher = {complete:function(){return;}};

		spyOn(refresher,'complete');
		component.refreshItems(refresher);
		tick();

		expect(component.currentItems).toEqual([ContractOne,ContractTwo,ContractThree]);
		expect(component.items).toEqual([ContractOne,ContractTwo,ContractThree]);
		expect(refresher.complete).toHaveBeenCalled();

	}));

	it('should open model to view asset', fakeAsync(() => {
		spyOn(ModalControllerMock.prototype,'create').and.returnValue(modalMock);
		spyOn(ModalMock.prototype,'present');
		let assetIdentifier = 'assetIdentifier';
		component.viewAsset(assetIdentifier);
		tick();
		expect(ModalControllerMock.prototype.create).toHaveBeenCalledWith(
			AssetViewPage, {
				assetId: assetIdentifier, assetType: 'Contract'
			}
		)
		expect(ModalMock.prototype.present).toHaveBeenCalled();
	}));

	it('should show delete asset alert', fakeAsync(() => {
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		let assetIdentifier = 'assetIdentifier'
		component.deleteAsset(assetIdentifier);
		tick();
		expect(AlertMock.prototype.present).toHaveBeenCalled();
	}));

	it('should open model to add asset', fakeAsync(() => {
		spyOn(ModalControllerMock.prototype,'create').and.returnValue(modalMock);
		spyOn(ModalMock.prototype,'present');
		spyOn(ModalMock.prototype,'onDidDismiss');

		component.addAsset();

		tick();

		expect(ModalControllerMock.prototype.create).toHaveBeenCalledWith(
			ContractForm, {
				assetType: 'Contract',
				properties: [{"name":"contractId","type":"String","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"grower","type":"Grower","optional":false,"primitive":false,"array":false,"enum":false,"enumValues":[]},{"name":"shipper","type":"Shipper","optional":false,"primitive":false,"array":false,"enum":false,"enumValues":[]},{"name":"importer","type":"Importer","optional":false,"primitive":false,"array":false,"enum":false,"enumValues":[]},{"name":"arrivalDateTime","type":"DateTime","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"unitPrice","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"minTemperature","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"maxTemperature","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"minPenaltyFactor","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"maxPenaltyFactor","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]}],
				formType: 'Add'
			}
		)
		expect(ModalMock.prototype.present).toHaveBeenCalled();
		expect(ModalMock.prototype.onDidDismiss).toHaveBeenCalled();

	}));

	it('should open model to update asset', fakeAsync(() => {
		spyOn(ModalControllerMock.prototype,'create').and.returnValue(modalMock);
		spyOn(ModalMock.prototype,'present');
		spyOn(ModalMock.prototype,'onDidDismiss');
		let assetIdentifier = 'assetIdentifier';

		component.updateAsset(assetIdentifier);

		tick();

		expect(ModalControllerMock.prototype.create).toHaveBeenCalledWith(
			ContractForm, {
				assetId: assetIdentifier,
				assetType: 'Contract',
				properties: [{"name":"contractId","type":"String","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"grower","type":"Grower","optional":false,"primitive":false,"array":false,"enum":false,"enumValues":[]},{"name":"shipper","type":"Shipper","optional":false,"primitive":false,"array":false,"enum":false,"enumValues":[]},{"name":"importer","type":"Importer","optional":false,"primitive":false,"array":false,"enum":false,"enumValues":[]},{"name":"arrivalDateTime","type":"DateTime","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"unitPrice","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"minTemperature","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"maxTemperature","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"minPenaltyFactor","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"maxPenaltyFactor","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]}],
				formType: 'Update'
			}
		)
		expect(ModalMock.prototype.present).toHaveBeenCalled();
		expect(ModalMock.prototype.onDidDismiss).toHaveBeenCalled();

	}));


	it('should get all Contract assets after an add Contract form is completed', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.addAsset();
		tick();

		modal.dismiss({ loading: new LoadingMock(), assetId: 'assetIdAdded' });
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(serviceContractPageMock.prototype.getAll).toHaveBeenCalled();
		expect(component.currentItems).toEqual([ContractOne,ContractTwo,ContractThree]);
		expect(component.items).toEqual([ContractOne,ContractTwo,ContractThree]);
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).toHaveBeenCalledWith({
			title: 'Added Contract',
			subTitle: 'assetIdAdded has been added',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).toHaveBeenCalled();

	}));

	it('should handle add Contract form dismissal', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.addAsset();
		tick();

		modal.dismiss({});
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(component.currentItems).not.toEqual([ContractOne,ContractTwo,ContractThree]);
		expect(component.items).not.toEqual([ContractOne,ContractTwo,ContractThree]);
		expect(LoadingMock.prototype.dismiss).not.toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).not.toHaveBeenCalledWith({
			title: 'Added Contract',
			subTitle: 'assetIdAdded has been added',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).not.toHaveBeenCalled();

	}));



	it('should get all Contract assets after an update Contract form is completed', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.updateAsset('value');
		tick();

		modal.dismiss({ loading: new LoadingMock(), assetId: 'assetIdAdded' });
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(serviceContractPageMock.prototype.getAll).toHaveBeenCalled();
		expect(component.currentItems).toEqual([ContractOne,ContractTwo,ContractThree]);
		expect(component.items).toEqual([ContractOne,ContractTwo,ContractThree]);
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).toHaveBeenCalledWith({
			title: 'Updated Contract',
			subTitle: 'assetIdAdded has been updated',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).toHaveBeenCalled();

	}));

	it('should handle update Contract form dismissal', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.updateAsset('value');
		tick();

		modal.dismiss({});
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(component.currentItems).not.toEqual([ContractOne,ContractTwo,ContractThree]);
		expect(component.items).not.toEqual([ContractOne,ContractTwo,ContractThree]);
		expect(LoadingMock.prototype.dismiss).not.toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).not.toHaveBeenCalledWith({
			title: 'Updated Contract',
			subTitle: 'assetIdAdded has been updated',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).not.toHaveBeenCalled();

	}));


});
