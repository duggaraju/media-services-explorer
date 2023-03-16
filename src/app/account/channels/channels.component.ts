import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LiveEvent } from '@azure/arm-mediaservices';
import { CredentialService } from 'src/app/credential.service';
import { EntityComponent } from '../entity.component';

@Component({
  selector: 'app-channels',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.css']
})
export class ChannelsComponent extends EntityComponent<LiveEvent> {

  override columns = [
    {
      name: 'Name',
      prop: 'Name'
    }, {
      name: 'State',
      prop: 'State'
    }, {
      name: 'Type',
      prop: 'EncodingType'
    }, {
      prop: 'Input.StreamingProtocol',
      name: 'Protocol'
    }];

    constructor(
      activatedRoute: ActivatedRoute,
      credentialService: CredentialService) {
      super(activatedRoute, credentialService);
    }

   private isStarted(item: LiveEvent): boolean {
     return item.resourceState === 'Running';
   }

   private isStopped(item: LiveEvent): boolean {
     return item.resourceState === 'Stopped';
   }
}
