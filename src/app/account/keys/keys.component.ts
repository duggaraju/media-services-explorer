import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityComponent } from '../entity.component';
import { ContentKey } from '../../media/contentkey';
import { QueryResult } from '../../media/queryresult';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { Observable } from 'rxjs';
import { AccountService } from '../../account.service';
import { ContextMenuService } from 'angular2-contextmenu';

@Component({
  selector: 'app-keys',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class KeysComponent extends EntityComponent<ContentKey> {

  columns = [
    {
      prop: "Id"
    }, {
      prop: "ContentKeyType",
      name: "Type"
    }, {
      prop: "LastModified"
    }, {
      prop: "ProtectionKeyType"
    }
  ]
  
  constructor(activatedRoute: ActivatedRoute, mediaServiceFactory: MediaServiceFactory, accountService: AccountService, contextMenuService: ContextMenuService) {
    super(activatedRoute, mediaServiceFactory, accountService, contextMenuService);
   }

   queryEntities(): Observable<QueryResult<ContentKey>> {
     return this.mediaService.getContentKeys(this.query);
   }
}
