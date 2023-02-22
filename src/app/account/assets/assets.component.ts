import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { Asset } from '../../media/asset';
import { AssetOptions } from '../../media/asset-options';
import { EntityComponent } from '../entity.component';

@Component({
  selector: 'app-assets',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class AssetsComponent extends EntityComponent<Asset> {

  columns = [
    {
      prop: 'Name'
    }, {
      prop: 'LastModified'
    }, {
      prop: 'Options'
    }];

  constructor(
    activatedRoute: ActivatedRoute,
    mediaServiceFactory: MediaServiceFactory) {
    super(activatedRoute, mediaServiceFactory, 'Assets');
  }
}
