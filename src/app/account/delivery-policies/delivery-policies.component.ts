import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityComponent } from '../entity.component';
import { DeliveryPolicy } from '../../media/deliverypolicy';
import { QueryResult } from '../../media/queryresult';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { Observable } from 'rxjs';
import { AccountService } from '../../account.service';
import { ContextMenuService } from 'ngx-contextmenu';
import { AadService } from 'app/aad/aad.service';

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
    aadService: AadService,
    contextMenuService: ContextMenuService) {
    super(activatedRoute, mediaServiceFactory, aadService, contextMenuService, 'AssetDeliveryPolicies');
   }
}
