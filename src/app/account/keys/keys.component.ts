import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityComponent } from '../entity.component';
import { ContentKey } from '../../media/contentkey';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { AccountService } from '../../account.service';
import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu';
import { AadService } from 'app/aad/aad.service';

@Component({
  selector: 'app-keys',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class KeysComponent extends EntityComponent<ContentKey> {

  columns = [
    {
      prop: 'Id'
    }, {
      prop: 'ContentKeyType',
      name: 'Type'
    }, {
      prop: 'LastModified'
    }, {
      prop: 'ProtectionKeyType'
    }
  ]

  constructor(
    activatedRoute: ActivatedRoute,
    mediaServiceFactory: MediaServiceFactory,
    aadService: AadService,
    contextMenuService: ContextMenuService) {
    super(activatedRoute, mediaServiceFactory, aadService, contextMenuService, 'ContentKeys');
  }
}
