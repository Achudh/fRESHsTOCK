import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams, PopoverController } from 'ionic-angular';
import { ShipmentService } from '../../../services/assets/Shipment/Shipment.service';
import { Shipment} from '../../../org.acme.shipping.perishable';
import { ShipmentForm } from './Shipment.form.component';
import { AssetViewPage } from '../../asset-view/asset-view.component';
import { PopoverPage } from '../../popover/popover.component';
@Component({
	selector: 'page-Shipment',
	templateUrl: 'Shipment.component.html'
})

export class ShipmentPage {
	searchQuery: string = '';
	items: Shipment[] = [];
	itemsLoaded: boolean = false; //This is to ensure that 'no assets' message doesn't appear when data is being retrieved
	currentItems: Shipment[] = [];
	properties: any[] = [{"name":"shipmentId","type":"String","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"type","type":"ProductType","optional":false,"primitive":false,"default":null,"validator":null,"array":false,"enum":true,"enumValues":["BANANAS","APPLES","PEARS","PEACHES","COFFEE"]},{"name":"status","type":"ShipmentStatus","optional":false,"primitive":false,"default":null,"validator":null,"array":false,"enum":true,"enumValues":["CREATED","IN_TRANSIT","ARRIVED"]},{"name":"unitCount","type":"Long","optional":false,"primitive":true,"default":null,"validator":null,"array":false,"enum":false,"enumValues":[]},{"name":"temperatureReadings","type":"TemperatureReading","optional":true,"primitive":false,"default":null,"validator":null,"array":true,"enum":false,"enumValues":[]},{"name":"contract","type":"Contract","optional":false,"primitive":false,"array":false,"enum":false,"enumValues":[]}];

	constructor(
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public modalCtrl: ModalController,
		public popoverCtrl: PopoverController,
		public serviceShipment:ShipmentService
	){
		this.serviceShipment.getAll().then((assets) => {
			this.currentItems = assets;
			this.items = assets;
			this.itemsLoaded = true;
		});
	}

	ionViewWillEnter(): any {

		let loading = this.loadingCtrl.create({
			content: 'Fetching all Shipment assets'
		});
		loading.present();
		return this.serviceShipment.getAll().then((assets) => {
			this.currentItems = assets;
			this.items = assets;
			this.itemsLoaded = true;
			loading.dismiss();
		});

	}

	getItems(ev: any): void {
		this.serviceShipment.getAll().then((assets) => {
			this.currentItems = assets;
			this.items = assets;
			// set val to the value of the searchbar
			let val = ev.target.value;

			// if the value is an empty string don't filter the items
			if (val && val.trim() != '') {
				this.items = this.items.filter((item) => {
					return (item['shipmentId'].toLowerCase().indexOf(val.toLowerCase()) > -1);
				});
			}
		});
	}

	refreshItems(refresher): Promise<void>{
		return this.serviceShipment.getAll().then((assets) => {
			this.currentItems = assets;
			this.items = assets;
			refresher.complete();
		});
	}

	viewAsset(assetId){
		let modal = this.modalCtrl.create(AssetViewPage, {
			assetId: assetId, assetType: 'Shipment'
		});
		modal.present();
	}

	addAsset(){
		let modal = this.modalCtrl.create(ShipmentForm, {
			assetType: 'Shipment', properties: this.properties, formType: 'Add'
		});
		modal.present();

		modal.onDidDismiss(data => {
			if(data !== undefined && data.assetId && data.loading){

				let assetIdValue = data.assetId;
				let loading = data.loading;


				this.serviceShipment.getAll().then((assets) => {
					this.currentItems = assets;
					this.items = assets;

					loading.dismiss(); // Dismiss loading animation

					let alert = this.alertCtrl.create({
						title: 'Added Shipment',
						subTitle: assetIdValue.concat(' has been added'),
						buttons: ['OK']
					});

					alert.present(); // Present successful asset deletion message
				});
			}
		})
	}

	updateAsset(assetId){
		let modal = this.modalCtrl.create(ShipmentForm, {
			assetId: assetId, assetType: 'Shipment', properties: this.properties, formType: 'Update'
		});
		modal.present();

		modal.onDidDismiss(data => {
			if(data !== undefined && data.assetId && data.loading){
				let assetIdValue = data.assetId;
				let loading = data.loading;


				this.serviceShipment.getAll().then((assets) => {
					this.currentItems = assets;
					this.items = assets;

					loading.dismiss(); // Dismiss loading animation

					let alert = this.alertCtrl.create({
						title: 'Updated Shipment',
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
			title: 'Delete Shipment?',
			message: message,
			buttons: [{
				text: 'Yes',
				handler: () => {

					let loading = this.loadingCtrl.create({
						content: 'Deleting Shipment...'
					});

					loading.present(); // Show loading animation

					this.serviceShipment.delete(assetId).then(() => {

						// We have deleted the asset, now we need to get all of the assets and update the view
						this.serviceShipment.getAll().then((assets) => {
							this.currentItems = assets;
							this.items = assets;

							loading.dismiss(); // Dismiss loading animation

							let alert = this.alertCtrl.create({
								title: 'Deleted Shipment',
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
