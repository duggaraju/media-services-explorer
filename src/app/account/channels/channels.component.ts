import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Channel } from '../../media/channel';
import { MediaAccount } from '../../media/mediaaccount';
import { MediaService } from '../../media/media.service';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { Angular2DataTableModule } from 'angular2-data-table';
import { EntityComponent } from '../entity.component';
import { Observable } from 'rxjs/Rx';
import { QueryResult } from '../../media/queryresult';

@Component({
  selector: 'app-channels',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class ChannelsComponent extends EntityComponent<Channel> {

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

  constructor(activatedRoute:ActivatedRoute, mediaServiceFactory: MediaServiceFactory) {
    super(activatedRoute, mediaServiceFactory);
  }

  queryEntities(): Observable<QueryResult<Channel>> {
    return this.mediaService.getChannels(this.query);
  }
}
