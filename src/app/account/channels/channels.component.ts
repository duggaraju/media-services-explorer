import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Channel } from '../../media/channel';
import { MediaAccount } from '../../media/mediaaccount';
import { MediaService } from '../../media/media.service';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { Angular2DataTableModule } from 'angular2-data-table';
import { EntityComponent } from '../entity.component';
import { AccountService } from '../../account.service';
import { ContextMenuService, ContextMenuComponent } from 'angular2-contextmenu';

@Component({
  selector: 'app-channels',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class ChannelsComponent extends EntityComponent<Channel> {

  @ViewChild('channelMenu')
  contextMenu: ContextMenuComponent;

  columns = [
    {
      prop: "Name"
    }, {
      prop: "State"
    }, {
      prop: "EncodingType"
    }, {
      prop: "Input.StreamingProtocol",
      name: "Protocol"
    }];

  constructor(activatedRoute: ActivatedRoute, mediaServiceFactory: MediaServiceFactory, accountService: AccountService, contextMenuService: ContextMenuService) {
    super(activatedRoute, mediaServiceFactory, accountService, contextMenuService, "Channels");
   }

   private isStarted(item: Channel): boolean {
     return item.State === "Running";
   }

   private isStopped(item: Channel): boolean {
     return item.State === "Stopped";
   }   
}
