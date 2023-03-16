import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Resource, AzureMediaServices  } from '@azure/arm-mediaservices';
import { CredentialService } from '../credential.service';


type ResourceId = {
  subscription: string,
  resourceGroup: string,
  name: string
};

type Column = {
  name: string,
  prop: string
}

const regExp = new RegExp("\/subscriptions\/(?<subscription>[^\/]+)\/resourceGroups\/(?<resourceGroup>[^\/]+)\/providers\/Microsoft.Media\/mediaservices\/(?<account>[^\/]+.*)")

@Component({
  template: '',
})
export class EntityComponent<T extends Resource> implements AfterViewInit {

  protected columns: Column[] = [];
  dataSource  = new MatTableDataSource<T>();
  pageSizes = [50, 100];
  protected client?: AzureMediaServices;
  protected id?: ResourceId;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
    
  get columnsToDisplay() {
    return this.columns.map(c => c.prop);
  } 

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator!;
  }

  constructor(
      private activatedRoute: ActivatedRoute,
      credentialService: CredentialService) {
        this.activatedRoute.paramMap.subscribe(params => {
          const id = params.get('id')!;
          const match = id.match(regExp)!;
          this.id = {
            subscription: match[1],
            resourceGroup: match[2],
            name: match[3]
          };
          this.client = new AzureMediaServices(credentialService.credential, this.id.subscription);
        })    
  }

  private onContextMenu(contextMenuEvent: any): void {
    console.log(`context menu event ${contextMenuEvent.event.screenX}:${contextMenuEvent.event.screenY} for ${contextMenuEvent.row.Id}`);
    contextMenuEvent.event.preventDefault();
    contextMenuEvent.event.stopPropagation();
  }
}
