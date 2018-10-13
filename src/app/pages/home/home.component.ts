import { Component } from '@angular/core';
import { RegisterPage } from '../../../pages/register/register';
import { NavController } from 'ionic-angular/navigation/nav-controller';

@Component({
	selector: 'page-home',
	templateUrl: 'home.component.html'
})

export class HomePage {

	username: string;
	password: string;

	constructor(public navCtrl: NavController) { }
	toLogin(){
		console.log("UserName"+this.username);

		console.log("Password"+this.password);
	}

	toRegister(){
		this.navCtrl.push(RegisterPage);
	}
}
