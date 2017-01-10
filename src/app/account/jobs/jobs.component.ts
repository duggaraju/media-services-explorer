import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaServiceFactory } from "../../media/media.service.factory";
import { Job } from "../../media/job";
import { Account } from "../../account";
import { EntityComponent }  from "../entity.component";
import { Observable } from 'rxjs/Rx';
import { QueryResult } from '../../media/queryresult';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-jobs',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class JobsComponent extends EntityComponent<Job> {

  columns = [
    {
      prop: "Name"
    }, {
      prop: "State"
    }, {
      prop: "LastModified",
    }];

  constructor(activatedRoute: ActivatedRoute, mediaServiceFactory: MediaServiceFactory, accountService: AccountService) {
    super(activatedRoute, mediaServiceFactory, accountService);
   }

  queryEntities(): Observable<QueryResult<Job>> {
    return this.mediaService.getJobs(this.query);
  }
}
