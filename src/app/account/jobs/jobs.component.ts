import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { Job } from '../../media/job';
import { Account } from '../../account';
import { EntityComponent }  from '../entity.component';
import { AccountService } from '../../account.service';
import { ContextMenuService } from 'ngx-contextmenu';
import { AadService } from 'app/aad/aad.service';

@Component({
  selector: 'app-jobs',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class JobsComponent extends EntityComponent<Job> {

  columns = [
    {
      prop: 'Name'
    }, {
      prop: 'State'
    }, {
      prop: 'LastModified',
    }];

  constructor(
    activatedRoute: ActivatedRoute,
    mediaServiceFactory: MediaServiceFactory,
    aadService: AadService,
    contextMenuService: ContextMenuService) {
    super(activatedRoute, mediaServiceFactory, aadService, contextMenuService, 'Jobs');
   }
}
