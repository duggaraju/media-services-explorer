import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { Job } from '../../media/job';
import { EntityComponent } from '../entity.component';

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
    mediaServiceFactory: MediaServiceFactory) {
    super(activatedRoute, mediaServiceFactory, 'Jobs');
   }
}
