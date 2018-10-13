import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AlertController, LoadingController, NavParams, ModalController, IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { ImporterPage} from './Importer.component';
import { ImporterForm } from './Importer.form.component';
import { ImporterService } from '../../../services/participants/Importer/Importer.service';
import { Importer} from '../../../org.acme.shipping.perishable';
import { ParticipantViewPage } from '../../participant-view/participant-view.component';


let ImporterOne = new Importer();
ImporterOne.email = "Importer1"
let ImporterTwo = new Importer();
ImporterTwo.email = "Importer2"
let ImporterThree = new Importer();
ImporterThree.email = "Importer3"

class serviceImporterPageMock{
	getAll(){
		return new Promise((resolve,reject)=>{
			resolve([ImporterOne,ImporterTwo,ImporterThree]);
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

describe('ImporterPage', () => {
	let fixture;
	let component;
	let loadingMock = new LoadingMock();
	let alertMock = new AlertMock();
	let modalMock = new ModalMock();

  	beforeEach(async(() => {

    	TestBed.configureTestingModule({
			declarations: [
				ImporterPage
			],
			imports: [
				IonicModule.forRoot(ImporterPage)
			],
			providers: [
				{ provide: NavParams },
				{ provide: AlertController, useClass: AlertControllerMock },
				{ provide: LoadingController, useClass: LoadingControllerMock },
				{ provide: ModalController, useClass: ModalControllerMock },
				{ provide: ImporterService, useClass:serviceImporterPageMock }
			]
    	})
  	}));

  	beforeEach(() => {
		spyOn(serviceImporterPageMock.prototype,'getAll').and.callThrough();
    	fixture = TestBed.createComponent(ImporterPage);
    	component = fixture.componentInstance;
  	});

  	it('should create ImporterPage component', () => {
		expect(component instanceof ImporterPage).toBe(true);
	});

	it('should have correct title',() => {
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain('Importer');
	});

	it('should return Importer participants', fakeAsync(() => {
		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');

		component.ionViewWillEnter();
		tick();

		expect(component.currentItems.length).toEqual(3);
		expect(component.items.length).toEqual(3);
	}));

	it('Importer participants should be a Importer type', fakeAsync(() => {
		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');

		component.ionViewWillEnter();
		tick();

		expect(component.currentItems[0] instanceof Importer).toBe(true);
		expect(component.currentItems[1] instanceof Importer).toBe(true);
		expect(component.currentItems[2] instanceof Importer).toBe(true);
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

		expect(component.currentItems).toEqual([ImporterOne,ImporterTwo,ImporterThree]);

	}));

	it('should get some items when there is partially matching search text', fakeAsync(() => {
		let ev = {target:{value:"3"}};
		component.getItems(ev);
		tick();

		expect(component.items).toEqual([ImporterThree]);

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

		expect(component.currentItems).toEqual([ImporterOne,ImporterTwo,ImporterThree]);
		expect(component.items).toEqual([ImporterOne,ImporterTwo,ImporterThree]);
		expect(refresher.complete).toHaveBeenCalled();

	}));

	it('should open model to view participant', fakeAsync(() => {
		spyOn(ModalControllerMock.prototype,'create').and.returnValue(modalMock);
		spyOn(ModalMock.prototype,'present');
		let participantIdentifier = 'participantIdentifier';
		component.viewParticipant(participantIdentifier);
		tick();
		expect(ModalControllerMock.prototype.create).toHaveBeenCalledWith(
			ParticipantViewPage, {
				participantId: participantIdentifier, participantType: 'Importer'
			}
		)
		expect(ModalMock.prototype.present).toHaveBeenCalled();
	}));

	it('should show delete participant alert', fakeAsync(() => {
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		let participantIdentifier = 'participantIdentifier'
		component.deleteParticipant(participantIdentifier);
		tick();
		expect(AlertMock.prototype.present).toHaveBeenCalled();
	}));

	it('should open model to add participant', fakeAsync(() => {
		spyOn(ModalControllerMock.prototype,'create').and.returnValue(modalMock);
		spyOn(ModalMock.prototype,'present');
		spyOn(ModalMock.prototype,'onDidDismiss');

		component.addParticipant();

		tick();

		expect(ModalControllerMock.prototype.create).toHaveBeenCalledWith(
			ImporterForm, {
				participantId: 'email',
				participantType: 'Importer',
				properties: [{"name":"email","type":"String","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"address","type":"Address","optional":false,"primitive":false,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"accountBalance","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]}],
				formType: 'Add'
			}
		)
		expect(ModalMock.prototype.present).toHaveBeenCalled();
		expect(ModalMock.prototype.onDidDismiss).toHaveBeenCalled();

	}));

	it('should open model to update participant', fakeAsync(() => {
		spyOn(ModalControllerMock.prototype,'create').and.returnValue(modalMock);
		spyOn(ModalMock.prototype,'present');
		spyOn(ModalMock.prototype,'onDidDismiss');
		let participantIdentifier = 'participantIdentifier';

		component.updateParticipant(participantIdentifier);

		tick();

		expect(ModalControllerMock.prototype.create).toHaveBeenCalledWith(
			ImporterForm, {
				participantId: participantIdentifier,
				participantType: 'Importer',
				properties: [{"name":"email","type":"String","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"address","type":"Address","optional":false,"primitive":false,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"accountBalance","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]}],
				formType: 'Update'
			}
		)
		expect(ModalMock.prototype.present).toHaveBeenCalled();
		expect(ModalMock.prototype.onDidDismiss).toHaveBeenCalled();

	}));

	it('should get all Importer participants after an add Importer form is completed', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.addParticipant();
		tick();

		modal.dismiss({ loading: new LoadingMock(), participantId: 'participantIdAdded' });
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(serviceImporterPageMock.prototype.getAll).toHaveBeenCalled();
		expect(component.currentItems).toEqual([ImporterOne,ImporterTwo,ImporterThree]);
		expect(component.items).toEqual([ImporterOne,ImporterTwo,ImporterThree]);
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).toHaveBeenCalledWith({
			title: 'Added Importer',
			subTitle: 'participantIdAdded has been added',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).toHaveBeenCalled();

	}));

	it('should handle add Importer form dismissal', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.addParticipant();
		tick();

		modal.dismiss({});
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(component.currentItems).not.toEqual([ImporterOne,ImporterTwo,ImporterThree]);
		expect(component.items).not.toEqual([ImporterOne,ImporterTwo,ImporterThree]);
		expect(LoadingMock.prototype.dismiss).not.toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).not.toHaveBeenCalledWith({
			title: 'Added Importer',
			subTitle: 'participantIdAdded has been added',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).not.toHaveBeenCalled();

	}));



	it('should get all Importer participants after an update Importer form is completed', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.updateParticipant('value');
		tick();

		modal.dismiss({ loading: new LoadingMock(), participantId: 'participantIdAdded' });
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(serviceImporterPageMock.prototype.getAll).toHaveBeenCalled();
		expect(component.currentItems).toEqual([ImporterOne,ImporterTwo,ImporterThree]);
		expect(component.items).toEqual([ImporterOne,ImporterTwo,ImporterThree]);
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).toHaveBeenCalledWith({
			title: 'Updated Importer',
			subTitle: 'participantIdAdded has been updated',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).toHaveBeenCalled();

	}));

	it('should handle update Importer form dismissal', fakeAsync(() => {
		const modalCtrl = fixture.debugElement.injector.get(ModalController);
		const modal = (<ModalControllerMock>(<any>modalCtrl)).presentableRef;

		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(AlertControllerMock.prototype,'create').and.returnValue(alertMock);
		spyOn(AlertMock.prototype,'present');
		spyOn(modalCtrl, 'create').and.callThrough();
		spyOn(modal, 'present').and.callThrough();

		component.updateParticipant('value');
		tick();

		modal.dismiss({});
		tick();

		expect(modal.present).toHaveBeenCalled();
		expect(component.currentItems).not.toEqual([ImporterOne,ImporterTwo,ImporterThree]);
		expect(component.items).not.toEqual([ImporterOne,ImporterTwo,ImporterThree]);
		expect(LoadingMock.prototype.dismiss).not.toHaveBeenCalled();
		expect(AlertControllerMock.prototype.create).not.toHaveBeenCalledWith({
			title: 'Updated Importer',
			subTitle: 'participantIdAdded has been updated',
			buttons: ['OK']
		});
		expect(AlertMock.prototype.present).not.toHaveBeenCalled();

	}));

});
