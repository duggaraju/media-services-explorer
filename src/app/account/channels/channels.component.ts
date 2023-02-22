import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Channel } from '../../media/channel';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { EntityComponent } from '../entity.component';

@Component({
  selector: 'app-channels',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class ChannelsComponent extends EntityComponent<Channel> {

  columns = [
    {
      prop: 'Name'
    }, {
      prop: 'State'
    }, {
      prop: 'EncodingType'
    }, {
      prop: 'Input.StreamingProtocol',
      name: 'Protocol'
    }];

    constructor(
      activatedRoute: ActivatedRoute,
      mediaServiceFactory: MediaServiceFactory) {
      super(activatedRoute, mediaServiceFactory, 'Channels');
    }

   private isStarted(item: Channel): boolean {
     return item.State === 'Running';
   }

   private isStopped(item: Channel): boolean {
     return item.State === 'Stopped';
   }
}
