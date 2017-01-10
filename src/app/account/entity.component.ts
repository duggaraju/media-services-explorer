import { OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { MediaAccount } from '../media/mediaaccount';
import { MediaService } from '../media/media.service';
import { MediaServiceFactory } from '../media/media.service.factory';
import { MediaQuery } from '../media/mediaquery';
import { QueryResult } from '../media/queryresult';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Angular2DataTableModule } from 'angular2-data-table';

export abstract class EntityComponent<T> implements OnInit {

  protected columns: any[] = [];
  protected mediaService: MediaService
  protected query = new MediaQuery();
  offset:number = 0;
  rows: T[] = [];
  count: number = 0;
  pageSize: number = 50;


  constructor(private activatedRoute:ActivatedRoute, private mediaServiceFactory: MediaServiceFactory, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((params: Params) => {
      let account = JSON.parse(params["account"]) as Account;
      let mediaAccount = this.accountService.getMediaAccount(account);
      this.mediaService = this.mediaServiceFactory.getMediaService(mediaAccount);
      this.refresh();
    });
  }

  private onPage(event): void {
    console.log(`Selected page ${event.offset} ${event.limit}`);
    this.query.skip = event.offset * event.limit;
    this.offset = event.offset;
    this.refresh();
  }

  private refresh(): void {
     this.queryEntities().subscribe(result => {
        this.count = result.count;
        // angular2-data-table always expects the row indices to match those of the full data set.
        // create a sparse array with thos indices.
        let rows = new Array(result.count);
        const start = this.offset * this.pageSize;
        rows.splice(start, this.pageSize, ...result.value);
        this.rows = rows;
      });
  }

  abstract queryEntities(): Observable<QueryResult<T>>;
}
