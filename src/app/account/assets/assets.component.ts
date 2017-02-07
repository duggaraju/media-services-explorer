import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { Asset } from '../../media/asset';
import { AssetOptions } from '../../media/asset-options';
import { EntityComponent } from '../entity.component';
import { AccountService } from '../../account.service';
import { ContextMenuComponent, ContextMenuService } from 'angular2-contextmenu';

@Component({
  selector: 'app-assets',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class AssetsComponent extends EntityComponent<Asset> {

  @ViewChild('assetMenu')
  contextMenu: ContextMenuComponent;

  columns = [
    {
      prop: "Name"
    }, {
      prop: "LastModified"
    }, {
      prop: "Options"
    }];

  constructor(
    activatedRoute:ActivatedRoute,
    mediaServiceFactory: MediaServiceFactory,
    accountService: AccountService,
    contextMenuSerivce: ContextMenuService) {
    super(activatedRoute, mediaServiceFactory, accountService, contextMenuSerivce, "Assets");
  }
}
