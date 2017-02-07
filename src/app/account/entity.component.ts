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
import { MediaEntityService } from '../media/media.entity.service';
import { MediaEntity } from '../media/media.entity';
import { ContextMenuService, ContextMenuComponent } from 'angular2-contextmenu';

export abstract class EntityComponent<T extends MediaEntity> implements OnInit {

  protected columns: any[] = [];
  protected query = new MediaQuery();
  offset:number = 0;
  rows: T[] = [];
  count: number = 0;
  pageSize: number = 50;
  private entities: MediaEntityService<T>;
  protected contextMenu: ContextMenuComponent;


  constructor(
      private activatedRoute:ActivatedRoute,
      private mediaServiceFactory: MediaServiceFactory,
      private accountService: AccountService,
      private contextMenuSerivce:ContextMenuService,
      private entityName: string) {
  }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((params: Params) => {
      let account = JSON.parse(params["account"]) as Account;
      let mediaAccount = this.accountService.getMediaAccount(account);
      let mediaService = this.mediaServiceFactory.getMediaService(mediaAccount);
      mediaService.getEntityService(this.entityName).subscribe(entities => {
        this.entities = entities;
        this.refresh();
      })
    });
  }

  private onPage(event): void {
    console.log(`Selected page ${event.offset} ${event.limit}`);
    this.query.skip = event.offset * event.limit;
    this.offset = event.offset;
    this.refresh();
  }

  private refresh(): void {
    this.entities.query(this.query).subscribe(result => {
        this.count = result.count;
        // angular2-data-table always expects the row indices to match those of the full data set.
        // create a sparse array with thos indices.
        let rows = new Array(result.count);
        const start = this.offset * this.pageSize;
        rows.splice(start, this.pageSize, ...result.value);
        this.rows = rows;
    });
  }

  private onContextMenu(contextMenuEvent) {
    console.log(`context menu event ${contextMenuEvent.event.screenX}:${contextMenuEvent.event.screenY} for ${contextMenuEvent.row.Id}`);
    this.contextMenuSerivce.show.next({
      event: contextMenuEvent.event,
      item: contextMenuEvent.row,
      contextMenu: this.contextMenu
    })
    contextMenuEvent.event.preventDefault();
    contextMenuEvent.event.stopPropagation();
  }

  private deleteEntity(item:T) {
    alert(`Are you sure you want to delete ${item.Id}`);
  }
}
