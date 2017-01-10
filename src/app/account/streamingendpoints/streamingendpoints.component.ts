import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { StreamingEndpoint } from "../../media/streamingendpoint";
import { EntityComponent } from '../entity.component';
import { Observable } from 'rxjs/Rx';
import { QueryResult } from '../../media/queryresult';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-streamingendpoints',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class StreamingendpointsComponent extends EntityComponent<StreamingEndpoint> {

  columns = [
    {
      prop: "Name"
    }, {
      prop: "State"
    }, {
      prop: "HostName"
    }, {
      prop: "ScaleUnits"
    }, {
      prop: "CdnEnabled"
    }
  ]
  constructor(activatedRoute: ActivatedRoute, mediaServiceFactory:MediaServiceFactory, accountService: AccountService) {
    super(activatedRoute, mediaServiceFactory, accountService);
   }

  queryEntities(): Observable<QueryResult<StreamingEndpoint>> {
      return this.mediaService.getStreamingEndpoints(this.query);;
  }
}
