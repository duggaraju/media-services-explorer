import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityComponent } from '../entity.component';
import { AccessPolicy } from '../../media/accesspolicy';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { ContextMenuService } from 'ngx-contextmenu';

@Component({
  selector: 'app-locators',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class AccessPoliciesComponent extends EntityComponent<AccessPolicy> {

  columns = [
    {
      prop: 'Name'
    }, {
      prop: 'Permissions'
    }, {
      prop: 'DurationInMinutes',
      name: 'Duration'
    }, {
      prop: 'Created',
    }, {
      prop: 'LastModified',
    }
  ];

  constructor(
    activatedRoute: ActivatedRoute,
    mediaServiceFactory: MediaServiceFactory,
    contextMenuService: ContextMenuService) {
    super(activatedRoute, mediaServiceFactory, contextMenuService, 'AccessPolicies');
  }
}
