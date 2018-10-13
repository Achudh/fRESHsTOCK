import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

  import { GrowerPage } from '../participants/Grower/Grower.component';
  import { ShipperPage } from '../participants/Shipper/Shipper.component';
  import { ImporterPage } from '../participants/Importer/Importer.component';
@Component({
  selector: 'page-participants',
  templateUrl: 'participants.component.html'
})
export class ParticipantsPage {
  participantList: any[] = [{'name':'Grower','component':GrowerPage},{'name':'Shipper','component':ShipperPage},{'name':'Importer','component':ImporterPage}];
  constructor(public navCtrl: NavController){

  }

  participantTapped(event, participant) {
    this.navCtrl.push(participant.component);
  }
}
