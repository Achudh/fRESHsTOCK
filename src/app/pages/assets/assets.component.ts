import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

  import { ShipmentPage } from '../assets/Shipment/Shipment.component';
  import { ContractPage } from '../assets/Contract/Contract.component';
@Component({
  selector: 'page-assets',
  templateUrl: 'assets.component.html'
})
export class AssetsPage {
  assetList: any[] = [{'name':'Shipment','component':ShipmentPage},{'name':'Contract','component':ContractPage}];
  constructor(public navCtrl: NavController){

  }

  assetTapped(event, asset) {
    this.navCtrl.push(asset.component);
  }
}
