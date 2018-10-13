import { Component } from '@angular/core';
import { ViewController, LoadingController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ShipmentReceivedService } from '../../../services/transactions/ShipmentReceived/ShipmentReceived.service';

@Component({
	selector: 'form-ShipmentReceived',
	templateUrl: 'ShipmentReceived.form.component.html'
})

export class ShipmentReceivedForm {

	transactionType: string;
	properties: any[];
	formType: string;
	error: string;
	form: FormGroup;

	constructor(
		public serviceShipmentReceived: ShipmentReceivedService,
		public viewCtrl: ViewController,
		public navParams: NavParams,
		private formBuilder: FormBuilder,
		public loadingCtrl: LoadingController
	){
		this.transactionType = navParams.get('transactionType');
		this.properties = navParams.get('properties');

		this.formType = navParams.get('formType');
		this.form = this.formBuilder.group({
				shipment:[{disabled: false}, Validators.required],
				timestamp:[{disabled: false}, Validators.required]
		});
	}

	addTransaction(){
		let loading = this.loadingCtrl.create({
			content: 'Adding ShipmentReceived...'
		});
		loading.present();

		this.serviceShipmentReceived.add(this.form.value).then((response) =>{

			this.viewCtrl.dismiss({'response':response,'loading':loading});
		}).catch((error) => {

			loading.dismiss();
			let parsedError = JSON.parse(error._body);
			this.error = parsedError.error.message;
		});
	}

	getProperties(){
		return this.properties.filter((property) => {
			return property.name != 'transactionId'
		});
	}

	dismiss(){
		this.viewCtrl.dismiss();
	}

}
