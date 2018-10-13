import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams, PopoverController } from 'ionic-angular';
import { ContractService } from '../../../services/assets/Contract/Contract.service';
import { Contract} from '../../../org.acme.shipping.perishable';
import { ContractForm } from './Contract.form.component';
import { AssetViewPage } from '../../asset-view/asset-view.component';
import { PopoverPage } from '../../popover/popover.component';
@Component({
	selector: 'page-Contract',
	templateUrl: 'Contract.component.html'
})

export class ContractPage {
	searchQuery: string = '';
	items: Contract[] = [];
	itemsLoaded: boolean = false; //This is to ensure that 'no assets' message doesn't appear when data is being retrieved
	currentItems: Contract[] = [];
	properties: any[] = [{"name":"contractId","type":"String","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"grower","type":"Grower","optional":false,"primitive":false,"array":false,"enum":false,"enumValues":[]},{"name":"shipper","type":"Shipper","optional":false,"primitive":false,"array":false,"enum":false,"enumValues":[]},{"name":"importer","type":"Importer","optional":false,"primitive":false,"array":false,"enum":false,"enumValues":[]},{"name":"arrivalDateTime","type":"DateTime","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"unitPrice","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"minTemperature","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"maxTemperature","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"minPenaltyFactor","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"maxPenaltyFactor","type":"Double","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]}];

	constructor(
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public modalCtrl: ModalController,
		public popoverCtrl: PopoverController,
		public serviceContract:ContractService
	){
		this.serviceContract.getAll().then((assets) => {
			this.currentItems = assets;
			this.items = assets;
			this.itemsLoaded = true;
		});
	}

	ionViewWillEnter(): any {

		let loading = this.loadingCtrl.create({
			content: 'Fetching all Contract assets'
		});
		loading.present();
		return this.serviceContract.getAll().then((assets) => {
			this.currentItems = assets;
			this.items = assets;
			this.itemsLoaded = true;
			loading.dismiss();
		});

	}

	getItems(ev: any): void {
		this.serviceContract.getAll().then((assets) => {
			this.currentItems = assets;
			this.items = assets;
			// set val to the value of the searchbar
			let val = ev.target.value;

			// if the value is an empty string don't filter the items
			if (val && val.trim() != '') {
				this.items = this.items.filter((item) => {
					return (item['contractId'].toLowerCase().indexOf(val.toLowerCase()) > -1);
				});
			}
		});
	}

	refreshItems(refresher): Promise<void>{
		return this.serviceContract.getAll().then((assets) => {
			this.currentItems = assets;
			this.items = assets;
			refresher.complete();
		});
	}

	viewAsset(assetId){
		let modal = this.modalCtrl.create(AssetViewPage, {
			assetId: assetId, assetType: 'Contract'
		});
		modal.present();
	}

	addAsset(){
		let modal = this.modalCtrl.create(ContractForm, {
			assetType: 'Contract', properties: this.properties, formType: 'Add'
		});
		modal.present();

		modal.onDidDismiss(data => {
			if(data !== undefined && data.assetId && data.loading){

				let assetIdValue = data.assetId;
				let loading = data.loading;


				this.serviceContract.getAll().then((assets) => {
					this.currentItems = assets;
					this.items = assets;

					loading.dismiss(); // Dismiss loading animation

					let alert = this.alertCtrl.create({
						title: 'Added Contract',
						subTitle: assetIdValue.concat(' has been added'),
						buttons: ['OK']
					});

					alert.present(); // Present successful asset deletion message
				});
			}
		})
	}

	updateAsset(assetId){
		let modal = this.modalCtrl.create(ContractForm, {
			assetId: assetId, assetType: 'Contract', properties: this.properties, formType: 'Update'
		});
		modal.present();

		modal.onDidDismiss(data => {
			if(data !== undefined && data.assetId && data.loading){
				let assetIdValue = data.assetId;
				let loading = data.loading;


				this.serviceContract.getAll().then((assets) => {
					this.currentItems = assets;
					this.items = assets;

					loading.dismiss(); // Dismiss loading animation

					let alert = this.alertCtrl.create({
						title: 'Updated Contract',
						subTitle: assetIdValue.concat(' has been updated'),
						buttons: ['OK']
					});

					alert.present(); // Present successful asset deletion message
				});
			}
		})

	}

	deleteAsset(assetId) {
		let message = "Are you sure you want to delete ".concat(assetId).concat('?');
		let confirm = this.alertCtrl.create({
			title: 'Delete Contract?',
			message: message,
			buttons: [{
				text: 'Yes',
				handler: () => {

					let loading = this.loadingCtrl.create({
						content: 'Deleting Contract...'
					});

					loading.present(); // Show loading animation

					this.serviceContract.delete(assetId).then(() => {

						// We have deleted the asset, now we need to get all of the assets and update the view
						this.serviceContract.getAll().then((assets) => {
							this.currentItems = assets;
							this.items = assets;

							loading.dismiss(); // Dismiss loading animation

							let alert = this.alertCtrl.create({
								title: 'Deleted Contract',
								subTitle: assetId.concat(' has been deleted'),
								buttons: ['OK']
							});

							alert.present(); // Present successful asset deletion message
						});
					})
				}
			},
			{
				text: 'No',
				handler: () => {}
			}]
		});

		confirm.present();
	}

	sortAssets(){
		let tempCurrentItems = [];
		let tempItems = [];
		console.log('pre reverse',this.currentItems,this.items);
		for(let x=this.currentItems.length-1;x>=0;x--){
			tempCurrentItems.push(this.currentItems[x]);
		}
		for(let x=this.items.length-1;x>=0;x--){
			tempItems.push(this.items[x]);
		}
		this.currentItems = tempCurrentItems;
		this.items = tempItems;
		console.log('post reverse',this.currentItems,this.items);
	}

	presentPopover(event) {
		let popover = this.popoverCtrl.create(PopoverPage,);
		popover.present({
			ev: event
		});
		popover.onDidDismiss(data => {
			if(data == 'sort'){
				this.sortAssets();
			}
		})
	}


}
