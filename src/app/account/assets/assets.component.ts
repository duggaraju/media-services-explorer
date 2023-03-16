import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asset } from '@azure/arm-mediaservices';
import { CredentialService } from 'src/app/credential.service';
import { EntityComponent } from '../entity.component';

@Component({
  selector: 'app-assets',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.css']
})
export class AssetsComponent extends EntityComponent<Asset> implements OnInit {

  override columns = [
    {
      name: 'Name',
      prop: 'Name'
    }, {
      name: 'Last Modified',
      prop: 'LastModified'
    }, {
      name: 'Options',
      prop: 'Options'
    }];

  constructor(
    activatedRoute: ActivatedRoute,
    credentialService: CredentialService) {
    super(activatedRoute, credentialService);
  }

  async ngOnInit(): Promise<void> {
    const id = this.id!;
    const client = this.client!;
    const iterator = client.assets.list(id.resourceGroup, id.name).byPage();
    const result = await iterator?.next();
    this.dataSource.data = result.value;
  }
}
