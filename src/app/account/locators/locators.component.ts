import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityComponent } from '../entity.component';
import { Locator } from '../../media/locator';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { ContextMenuService } from 'ngx-contextmenu';

@Component({
  selector: 'app-locators',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class LocatorsComponent extends EntityComponent<Locator> {

  columns = [
    {
      prop: 'Id'
    }, {
      prop: 'Type'
    }, {
      prop: 'AccessPolicyId',
      name: 'Access Policy'
    }, {
      prop: 'ExpirationDateTime',
      name: 'Expiration Date'
    }
  ];

  constructor(
    activatedRoute: ActivatedRoute,
    mediaServiceFactory: MediaServiceFactory,
    contextMenuService: ContextMenuService) {
    super(activatedRoute, mediaServiceFactory, contextMenuService, 'Locators');
  }
}
