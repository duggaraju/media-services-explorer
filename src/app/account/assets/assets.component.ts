import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { Asset } from '../../media/asset';
import { AssetOptions } from '../../media/asset-options';
import { EntityComponent } from '../entity.component';
import { AccountService } from '../../account.service';
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { AadService } from 'app/aad/aad.service';

@Component({
  selector: 'app-assets',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class AssetsComponent extends EntityComponent<Asset> {

  @ViewChild('assetMenu')
  contextMenu?: ContextMenuComponent;

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
    mediaServiceFactory: MediaServiceFactory,
    aadService: AadService,
    contextMenuService: ContextMenuService) {
    super(activatedRoute, mediaServiceFactory, aadService, contextMenuService, 'Assets');
  }
}
