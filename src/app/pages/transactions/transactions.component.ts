import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TemperatureReadingPage } from '../transactions/TemperatureReading/TemperatureReading.component';
import { ShipmentReceivedPage } from '../transactions/ShipmentReceived/ShipmentReceived.component';
import { SetupDemoPage } from '../transactions/SetupDemo/SetupDemo.component';
@Component({
	selector: 'page-transactions',
	templateUrl: 'transactions.component.html'
})
export class TransactionsPage {
	transactionList: any[] = [{'name':'TemperatureReading','component':TemperatureReadingPage},{'name':'ShipmentReceived','component':ShipmentReceivedPage},{'name':'SetupDemo','component':SetupDemoPage}];
	constructor(public navCtrl: NavController){

  }

  transactionTapped(event, transaction) {
    this.navCtrl.push(transaction.component);
  }
}
