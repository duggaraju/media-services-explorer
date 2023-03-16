import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transform } from '@azure/arm-mediaservices';
import { CredentialService } from 'src/app/credential.service';
import { EntityComponent } from '../entity.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './transforms.component.html',
  styleUrls: ['../entity.component.css']
})
export class TransformsComponent extends EntityComponent<Transform> implements OnInit {

  override columns = [
    {
      name: 'Name',
      prop: 'Name'
    }, {
      name: 'State',
      prop: 'State'
    }, {
      name: 'Last Modified',
      prop: 'LastModified',
    }];

  constructor(
    activatedRoute: ActivatedRoute,
    credentialService: CredentialService) {
    super(activatedRoute, credentialService);
   }

   async ngOnInit(): Promise<void> {
    const id = this.id!;
    const client = this.client!;
    const iterator = client.transforms.list(id.resourceGroup, id.name).byPage();
    const result = await iterator?.next();
    this.dataSource.data = result.value;
  }
}
