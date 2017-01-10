import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityComponent } from '../entity.component';
import { AccessPolicy } from '../../media/accesspolicy';
import { QueryResult } from '../../media/queryresult';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { Observable } from 'rxjs';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-locators',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class AccessPoliciesComponent extends EntityComponent<AccessPolicy> {

  columns = [
    {
      prop: "Name"
    }, {
      prop: "Permissions"
    }, {
      prop: "DurationInMinutes",
      name: "Duration"
    }, {
      prop: "Created",
    }, {
      prop: "LastModified",
    }
  ]
  constructor(activatedRoute: ActivatedRoute, mediaServiceFactory: MediaServiceFactory, accountService: AccountService) {
    super(activatedRoute, mediaServiceFactory, accountService);
   }

   queryEntities(): Observable<QueryResult<AccessPolicy>> {
     return this.mediaService.getAccessPolicies(this.query);
   }
}
