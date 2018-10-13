import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { Events, ViewController, LoadingController, NavParams, IonicModule } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ContractForm } from './Contract.form.component'
import { ContractService } from '../../../services/assets/Contract/Contract.service';
import { PlatformService } from '../../../services/platform.service';
import { Contract}from '../../../org.acme.shipping.perishable';
import { mockView } from "ionic-angular/util/mock-providers";


let ContractOne = new Contract();
ContractOne.contractId = "Contract1";


class serviceContract{
	get(assetId){
		return new Promise((resolve,reject)=>{
			resolve(ContractOne);
		});
	}
	add(form){
		return new Promise((resolve,reject) => {
			resolve();
		})
	}

	update(identifierValue, form){
		return;
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

class FormBuilderMock{
	group(obj){
		return new FormMock();
	}
}

class FormMock{
	value;

	constructor(){
		this.value = {contractId:'test'}
	}
	get(key){
		return new FormObjectMock();
	}
	setValue(value){
		return;
	}
	_updateTreeValidity(){
		return;
	}
	_registerOnCollectionChange(){
		return;
	}
}

class FormObjectMock{
	enable(){
		return;
	}
	disable(){
		return;
	}
}

class PlatformServiceMock{
	isDevice(){
		return;
	}
	setConnection(type){
		return;
	}
	isConnected(){
		return;
	}

}

class EventsMock{
	subscribe(){
		return;
	}
}

class ChangeDetectorRefMock{
	detectChanges(){
		return;
	}
}



let assetId;
let assetType;
let properties;
let formType;

class NavParamsMock{
	get(value){
		if(value == 'assetId'){
			return assetId;
		}
		else if(value == 'properties'){
			return properties;
		}
		else if(value == 'formType'){
			return formType;
		}
		else{
			return assetType;
		}
	}
}

describe('ContractForm', () => {
	let fixture;
	let component;

	let loadingMock = new LoadingMock();
	let formMock = new FormMock();
	let formObjectMock = new FormObjectMock();
	let ViewControllerMock = mockView();

  	beforeEach(async(() => {

    	TestBed.configureTestingModule({
			declarations: [
				ContractForm
			],
			imports: [
				IonicModule.forRoot(ContractForm)
			],
			providers: [
				{ provide: NavParams, useClass: NavParamsMock },
				{ provide: FormBuilder, useClass: FormBuilderMock },
				{ provide: LoadingController, useClass: LoadingControllerMock },
				{ provide: ViewController, useValue: ViewControllerMock },
				{ provide: ContractService, useClass:serviceContract },
				{ provide: PlatformService, useClass: PlatformServiceMock },
				{ provide: Events, useClass: EventsMock },
				{ provide: ChangeDetectorRef, useClass:ChangeDetectorRefMock}
			]
    	})
  	}));

  	beforeEach(() => {
		assetType = 'Contract';
		spyOn(serviceContract.prototype,'get').and.callThrough();
    	fixture = TestBed.createComponent(ContractForm);
    	component = fixture.componentInstance;
  	});

  	it('should create ContractForm component', () => {
		expect(component instanceof ContractForm).toBe(true);
	});

	it('should have correct asset identifier property', () => {
		expect(component.assetIdentifierProperty).toEqual('contractId');
	})

	it('should have correct title',() => {
		component.formType = 'Add';
		let expectedTitle = 'Add Contract';
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain(expectedTitle);
	});

	it('should detect if update form is opened', fakeAsync(() => {
		component.formType = 'Update';
		component.assetId = 'Contract001'
		fixture.detectChanges();

		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');

		spyOn(FormBuilderMock.prototype,'group').and.returnValue(formMock);
		spyOn(FormMock.prototype,'setValue');
		spyOn(FormMock.prototype,'get').and.returnValue(formObjectMock);
		spyOn(FormObjectMock.prototype,'disable');

		component.ionViewWillEnter();
		tick();

		expect(LoadingControllerMock.prototype.create).toHaveBeenCalledWith({
			content: 'Fetching Contract001'
		});

		expect(LoadingMock.prototype.present).toHaveBeenCalled();

		expect(FormMock.prototype.get).toHaveBeenCalledWith('contractId');
		expect(FormObjectMock.prototype.disable).toHaveBeenCalled();
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
	}));

	it('should detect if add form is opened', fakeAsync(() => {
		component.formType = 'Add';
		fixture.detectChanges();


		spyOn(FormBuilderMock.prototype,'group').and.returnValue(formMock);
		spyOn(FormMock.prototype,'setValue');

		spyOn(FormMock.prototype,'get').and.returnValue(formObjectMock);
		spyOn(FormObjectMock.prototype,'enable');
		component.ionViewWillEnter();
		tick();


		expect(FormMock.prototype.get).toHaveBeenCalledWith('contractId');

		expect(FormObjectMock.prototype.enable).toHaveBeenCalled();
	}));


	it('should submit an add form', fakeAsync(() => {
		component.formType = 'Add';
		fixture.detectChanges();

		spyOn(component,'addAsset');

		component.submit();
		tick();

		expect(component.addAsset).toHaveBeenCalled();

	}));

	it('should submit an update form', fakeAsync(() => {
		component.formType = 'Update';
		fixture.detectChanges();

		spyOn(component,'updateAsset');

		component.submit();
		tick();

		expect(component.updateAsset).toHaveBeenCalled();

	}));

	it('should add an asset', fakeAsync(() => {
		component.formType = 'Add';
		fixture.detectChanges();

		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');
		spyOn(serviceContract.prototype,'add').and.returnValue(new Promise((resolve,reject)=>{resolve()}));
		spyOn(ViewControllerMock,'dismiss');
		component.addAsset();
		tick();

		expect(LoadingControllerMock.prototype.create).toHaveBeenCalledWith({
			content: 'Adding Contract...'
		});

		expect(LoadingMock.prototype.present).toHaveBeenCalled();
		expect(serviceContract.prototype.add).toHaveBeenCalled();
		expect(ViewControllerMock.dismiss).toHaveBeenCalled();
	}));


	it('should throw an error for invalid add asset', fakeAsync(() => {
		component.formType = 'Add';
		fixture.detectChanges();

		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');
		let json = JSON.stringify({error:{message:'Some error'}});
		spyOn(serviceContract.prototype,'add').and.returnValue(new Promise((resolve,reject) => {
			reject({_body:json})
		}));
		spyOn(ViewControllerMock,'dismiss');
		component.addAsset();
		tick();

		expect(LoadingControllerMock.prototype.create).toHaveBeenCalledWith({
			content: 'Adding Contract...'
		});

		expect(LoadingMock.prototype.present).toHaveBeenCalled();
		expect(serviceContract.prototype.add).toHaveBeenCalled();
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
		expect(component.error).toEqual('Some error');
	}));



	it('should update an asset', fakeAsync(() => {
		component.formType = 'Update';
		fixture.detectChanges();

		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');
		spyOn(serviceContract.prototype,'update').and.returnValue(new Promise((resolve,reject)=>{resolve()}));
		spyOn(ViewControllerMock,'dismiss');
		spyOn(FormMock.prototype,'get').and.returnValue(formObjectMock);
		spyOn(FormObjectMock.prototype,'enable');
		component.updateAsset();
		tick();

		expect(LoadingControllerMock.prototype.create).toHaveBeenCalledWith({
			content: 'Updating Contract...'
		});

		expect(LoadingMock.prototype.present).toHaveBeenCalled();
		expect(serviceContract.prototype.update).toHaveBeenCalled();
		expect(ViewControllerMock.dismiss).toHaveBeenCalled();
	}));


	it('should throw an error for invalid update asset', fakeAsync(() => {
		component.formType = 'Update';
		fixture.detectChanges();

		spyOn(LoadingControllerMock.prototype,'create').and.returnValue(loadingMock);
		spyOn(LoadingMock.prototype,'dismiss');
		spyOn(LoadingMock.prototype,'present');
		let json = JSON.stringify({error:{message:'Some error'}});
		spyOn(serviceContract.prototype,'update').and.returnValue(new Promise((resolve,reject) => {
			reject({_body:json})
		}));
		spyOn(ViewControllerMock,'dismiss');
		component.updateAsset();
		tick();

		expect(LoadingControllerMock.prototype.create).toHaveBeenCalledWith({
			content: 'Updating Contract...'
		});

		expect(LoadingMock.prototype.present).toHaveBeenCalled();
		expect(serviceContract.prototype.update).toHaveBeenCalled();
		expect(LoadingMock.prototype.dismiss).toHaveBeenCalled();
		expect(component.error).toEqual('Some error');
	}));

	it('should be able to dismiss form', fakeAsync(() => {
		spyOn(ViewControllerMock,'dismiss');
		component.dismiss();
		tick();
		expect(ViewControllerMock.dismiss).toHaveBeenCalled();
	}));

});
