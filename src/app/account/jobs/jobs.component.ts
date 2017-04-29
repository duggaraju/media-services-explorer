import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaServiceFactory } from "../../media/media.service.factory";
import { Job } from "../../media/job";
import { Account } from "../../account";
import { EntityComponent }  from "../entity.component";
import { AccountService } from '../../account.service';
import { ContextMenuService } from 'ngx-contextmenu';

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

  constructor(activatedRoute: ActivatedRoute, mediaServiceFactory: MediaServiceFactory, accountService: AccountService, contextMenuService: ContextMenuService) {
    super(activatedRoute, mediaServiceFactory, accountService, contextMenuService, "Jobs");
   }
}
