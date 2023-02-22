import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { StreamingEndpoint } from '../../media/streamingendpoint';
import { EntityComponent } from '../entity.component';

@Component({
  selector: 'app-streamingendpoints',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class StreamingendpointsComponent extends EntityComponent<StreamingEndpoint> {

  columns = [
    {
      prop: 'Name'
    }, {
      prop: 'State'
    }, {
      prop: 'HostName'
    }, {
      prop: 'ScaleUnits'
    }, {
      prop: 'CdnEnabled'
    }
  ];

  constructor(
    activatedRoute: ActivatedRoute,
    mediaServiceFactory: MediaServiceFactory) {
    super(activatedRoute, mediaServiceFactory, 'StreamingEndpoints');
  }

   private isStarted(item: StreamingEndpoint): boolean {
     return item.State === 'Running';
   }

   private isStopped(item: StreamingEndpoint): boolean {
     return item.State === 'Stopped';
   }
}
