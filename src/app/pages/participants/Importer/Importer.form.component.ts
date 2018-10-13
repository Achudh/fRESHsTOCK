import { Component } from '@angular/core';
import { ViewController, LoadingController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ImporterService } from '../../../services/participants/Importer/Importer.service';

@Component({
	selector: 'form-Importer',
	templateUrl: 'Importer.form.component.html'
})

export class ImporterForm {

	participantId: string;
	participantType: string;
	properties: any[];
	formType: string;
	error: string;
	participantIdentifierProperty: string = "email"
	form: FormGroup;

	constructor(
		public serviceImporter: ImporterService,
		public viewCtrl: ViewController,
		public navParams: NavParams,
		private formBuilder: FormBuilder,
		public loadingCtrl: LoadingController
	){
		this.participantId = navParams.get('participantId');
		this.participantType = navParams.get('participantType');
		this.properties = navParams.get('properties');

		this.formType = navParams.get('formType');
		this.form = this.formBuilder.group({
			email:[{disabled: false}, Validators.required],
			address:[{disabled: false}, Validators.required],
			accountBalance:[{disabled: false}, Validators.required]
		});
	}

	ionViewWillEnter(){
		if(this.formType == 'Update'){
			let loading = this.loadingCtrl.create({
				content: 'Fetching '.concat(this.participantId)
			});
			loading.present();
			return this.serviceImporter.get(this.participantId).then((participant) => {
				let retrievedParticipant = participant;
				delete retrievedParticipant['$class'];
				this.form.setValue(participant);
				let disabledIdentifier = this.form.get('email');
				disabledIdentifier.disable();

				loading.dismiss();
			})
		}
		else{
			let enabledIdentifier = this.form.get('email');
			enabledIdentifier.enable();
		}
	}

	submit(){
		if(this.formType == 'Add'){
			this.addParticipant();
		}
		if(this.formType == 'Update'){
			this.updateParticipant()
		}
	}

	addParticipant(){
		let loading = this.loadingCtrl.create({
			content: 'Adding Importer...'
		});
		loading.present();
		let participantIdValue = this.form.value[this.participantId];

		this.serviceImporter.add(this.form.value).then(() =>{

			this.viewCtrl.dismiss({'participantId':participantIdValue,'loading':loading});
		}).catch((error) => {
			//error.toString();
			loading.dismiss();
			let parsedError = JSON.parse(error._body);
			this.error = parsedError.error.message;
		});
	}

	updateParticipant(){
		let loading = this.loadingCtrl.create({
			content: 'Updating Importer...'
		});
		loading.present();

		// We need to enable the identifier field in order to access the value.
		let disabledIdentifier = this.form.get('email');
		disabledIdentifier.enable();

		this.serviceImporter.update(disabledIdentifier.value, this.form.value).then(() =>{
			this.viewCtrl.dismiss({'participantId':disabledIdentifier.value,'loading':loading});
		}).catch((error) => {
			loading.dismiss();
			let parsedError = JSON.parse(error._body);
			this.error = parsedError.error.message;
		})
	}

	dismiss(){
		this.viewCtrl.dismiss();
	}

}
