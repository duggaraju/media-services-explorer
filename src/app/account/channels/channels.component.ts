import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Channel } from '../../media/channel';
import { MediaAccount } from '../../media/mediaaccount';
import { MediaService } from '../../media/media.service';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EntityComponent } from '../entity.component';
import { AccountService } from '../../account.service';
import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu';
import { AadService } from 'app/aad/aad.service';

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
      aadService: AadService,
      contextMenuService: ContextMenuService) {
      super(activatedRoute, mediaServiceFactory, aadService, contextMenuService, 'Channels');
    }

   private isStarted(item: Channel): boolean {
     return item.State === 'Running';
   }

   private isStopped(item: Channel): boolean {
     return item.State === 'Stopped';
   }
}
