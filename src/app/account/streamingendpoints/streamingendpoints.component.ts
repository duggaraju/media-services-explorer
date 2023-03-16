import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StreamingEndpoint } from '@azure/arm-mediaservices';
import { CredentialService } from 'src/app/credential.service';
import { EntityComponent } from '../entity.component';

@Component({
  selector: 'app-streamingendpoints',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.css']
})
export class StreamingendpointsComponent extends EntityComponent<StreamingEndpoint> implements OnInit {

  override columns = [
    {
      name: 'Name',
      prop: 'name'
    }, {
      name: 'State',
      prop: 'resourceState'
    }, {
      name: 'Host Name',
      prop: 'hostName'
    }, {
      name: 'Scale Units',
      prop: 'scaleUnits'
    }, {
      name: 'CDN Enabled',
      prop: 'cdnEnabled'
    }
  ];

  constructor(
    activatedRoute: ActivatedRoute,
    credentialService: CredentialService) {
    super(activatedRoute, credentialService);
  }

  async ngOnInit(): Promise<void> {
    const id = this.id!;
    const client = this.client!;
    const iterator = client.streamingEndpoints.list(id.resourceGroup, id.name).byPage();
    const result = await iterator?.next();
    this.dataSource.data = result.value;
  }

   private isStarted(item: StreamingEndpoint): boolean {
     return item.resourceState === 'Running';
   }

   private isStopped(item: StreamingEndpoint): boolean {
     return item.resourceState === 'Stopped';
   }
}
