import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule } from '@ionic/storage';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from './pages/home/home.component';
import { AssetsPage } from './pages/assets/assets.component';
import { AssetViewPage } from './pages/asset-view/asset-view.component';
import { ParticipantsPage } from './pages/participants/participants.component';
import { ParticipantViewPage } from './pages/participant-view/participant-view.component';
import { TransactionsPage } from './pages/transactions/transactions.component';
import { TransactionViewPage } from './pages/transaction-view/transaction-view.component';
import { PopoverPage } from './pages/popover/popover.component';
import { SettingsPage } from './pages/settings/settings.component';
import { DataService } from './services/data.service';
import { PlatformService } from './services/platform.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';

// Import types generated from model

import * as ORG_HYPERLEDGER_COMPOSER_SYSTEM from './org.hyperledger.composer.system';
import * as ORG_ACME_SHIPPING_PERISHABLE from './org.acme.shipping.perishable';

// Import asset components generated from model

import { ShipmentPage } from './pages/assets/Shipment/Shipment.component';
import { ShipmentForm } from './pages/assets/Shipment/Shipment.form.component';

import { ContractPage } from './pages/assets/Contract/Contract.component';
import { ContractForm } from './pages/assets/Contract/Contract.form.component';


// Import participant components generated from model

import { GrowerPage } from './pages/participants/Grower/Grower.component';
import { GrowerForm } from './pages/participants/Grower/Grower.form.component';

import { ShipperPage } from './pages/participants/Shipper/Shipper.component';
import { ShipperForm } from './pages/participants/Shipper/Shipper.form.component';

import { ImporterPage } from './pages/participants/Importer/Importer.component';
import { ImporterForm } from './pages/participants/Importer/Importer.form.component';


// Import transaction components generated from model

import { TemperatureReadingPage } from './pages/transactions/TemperatureReading/TemperatureReading.component';
import { TemperatureReadingForm } from './pages/transactions/TemperatureReading/TemperatureReading.form.component';

import { ShipmentReceivedPage } from './pages/transactions/ShipmentReceived/ShipmentReceived.component';
import { ShipmentReceivedForm } from './pages/transactions/ShipmentReceived/ShipmentReceived.form.component';

import { SetupDemoPage } from './pages/transactions/SetupDemo/SetupDemo.component';
import { SetupDemoForm } from './pages/transactions/SetupDemo/SetupDemo.form.component';


// Import asset services generated from model

import { ShipmentService } from './services/assets/Shipment/Shipment.service';
import { ContractService } from './services/assets/Contract/Contract.service';

// Import participant services generated from model

import { GrowerService } from './services/participants/Grower/Grower.service';
import { ShipperService } from './services/participants/Shipper/Shipper.service';
import { ImporterService } from './services/participants/Importer/Importer.service';

// Import transaction services generated from model

import { TemperatureReadingService } from './services/transactions/TemperatureReading/TemperatureReading.service';
import { ShipmentReceivedService } from './services/transactions/ShipmentReceived/ShipmentReceived.service';
import { SetupDemoService } from './services/transactions/SetupDemo/SetupDemo.service';
import { RegisterPage } from '../pages/register/register';

@NgModule({
	declarations: [
		MyApp,
		SettingsPage,
		HomePage,
		RegisterPage,
		AssetsPage,
		AssetViewPage,
		ParticipantsPage,
		ParticipantViewPage,
		TransactionsPage,
		TransactionViewPage,
		PopoverPage,
		
			ShipmentPage,
		
			ContractPage,
		
		
			ShipmentForm,
		
			ContractForm,
		
		
			GrowerPage,
		
			ShipperPage,
		
			ImporterPage,
		
		
			GrowerForm,
		
			ShipperForm,
		
			ImporterForm,
		
		
			TemperatureReadingPage,
		
			ShipmentReceivedPage,
		
			SetupDemoPage,
		
    	TemperatureReadingForm,
		ShipmentReceivedForm,
		
			SetupDemoForm
		
  	],
  	imports: [
    	HttpModule,
    	BrowserModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
  	],
  	bootstrap: [IonicApp],
  	entryComponents: [
		MyApp,
		SettingsPage,
    	HomePage,
		AssetsPage,
		AssetViewPage,
		ParticipantsPage,
		ParticipantViewPage,
		TransactionsPage,
		TransactionViewPage,
		PopoverPage,
    	
			ShipmentPage,
		
			ContractPage,
		
		
			ShipmentForm,
		
			ContractForm,
		
		
			GrowerPage,
		
			ShipperPage,
		
			ImporterPage,
		
		
			GrowerForm,
		
			ShipperForm,
		
			ImporterForm,
		
		
			TemperatureReadingPage,
		
			ShipmentReceivedPage,
		
			SetupDemoPage,
		
    	TemperatureReadingForm,
		ShipmentReceivedForm,
		
			SetupDemoForm
		
  	],
  	providers: [
		Geolocation,
    	StatusBar,
		SplashScreen,
		Network,
		Toast,
		DataService,
		PlatformService,
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		
			ShipmentService,
		
			ContractService,
		
		
			GrowerService,
		
			ShipperService,
		
			ImporterService,
		
		TemperatureReadingService,
		ShipmentReceivedService,
		
		SetupDemoService
		
  	]
})
export class AppModule {}
