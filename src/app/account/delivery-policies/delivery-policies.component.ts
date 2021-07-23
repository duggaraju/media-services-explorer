import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityComponent } from '../entity.component';
import { DeliveryPolicy } from '../../media/deliverypolicy';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { ContextMenuService } from 'ngx-contextmenu';

@Component({
  selector: 'app-locators',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class DeliveryPoliciesComponent extends EntityComponent<DeliveryPolicy> {

  columns = [
    {
      prop: 'Id'
    }, {
      prop: 'Type'
    }
  ];

  constructor(
    activatedRoute: ActivatedRoute,
    mediaServiceFactory: MediaServiceFactory,
    contextMenuService: ContextMenuService) {
    super(activatedRoute, mediaServiceFactory, contextMenuService, 'AssetDeliveryPolicies');
   }
}
