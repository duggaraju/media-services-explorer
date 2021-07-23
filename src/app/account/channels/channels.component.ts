import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Channel } from '../../media/channel';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { EntityComponent } from '../entity.component';
import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-channels',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class ChannelsComponent extends EntityComponent<Channel> {

  @ViewChild('channelMenu')
  contextMenu?: ContextMenuComponent;

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
      mediaServiceFactory: MediaServiceFactory,
      contextMenuService: ContextMenuService) {
      super(activatedRoute, mediaServiceFactory, contextMenuService, 'Channels');
    }

   private isStarted(item: Channel): boolean {
     return item.State === 'Running';
   }

   private isStopped(item: Channel): boolean {
     return item.State === 'Stopped';
   }
}
