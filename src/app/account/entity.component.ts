import { OnInit } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { MediaAccount } from '../media/mediaaccount';
import { MediaService } from '../media/media.service';
import { MediaServiceFactory } from '../media/media.service.factory';
import { MediaQuery } from '../media/mediaquery';
import { QueryResult } from '../media/queryresult';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MediaEntityService } from '../media/media.entity.service';
import { MediaEntity } from '../media/media.entity';
import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu';
import { AdalService } from 'app/aad/adal.service';

export abstract class EntityComponent<T extends MediaEntity> implements OnInit {

  protected columns: any[] = [];
  protected query = new MediaQuery();
  offset = 0;
  rows: T[] = [];
  count = 0;
  pageSize = 50;
  private entities: MediaEntityService<T>;
  protected contextMenu: ContextMenuComponent;


  constructor(
      private activatedRoute: ActivatedRoute,
      private mediaServiceFactory: MediaServiceFactory,
      private adalService: AdalService,
      private contextMenuSerivce: ContextMenuService,
      private entityName: string) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const mediaAccount = <MediaAccount> {
        accountName: paramMap.get('name'),
        tokenProvider: this.adalService.getTokenProvider('https://rest.media.azure.net'),
        apiUrl: paramMap.get('url')
      }
      const mediaService = this.mediaServiceFactory.getMediaService(mediaAccount);
      mediaService.getEntityService<T>(this.entityName).subscribe(entities => {
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
        // @swimlane/ngx-datatable always expects the row indices to match those of the full data set.
        // create a sparse array with thos indices.
        const rows = new Array(result.count);
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

  private deleteEntity(item: T) {
    alert(`Are you sure you want to delete ${item.Id}`);
  }
}
