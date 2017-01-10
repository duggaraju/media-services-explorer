import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaServiceFactory } from '../../media/media.service.factory';
import { Asset } from '../../media/asset';
import { AssetOptions } from '../../media/asset-options';
import { Observable } from 'rxjs/Rx';
import { QueryResult } from '../../media/queryresult';
import { EntityComponent } from '../entity.component';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-assets',
  templateUrl: '../entity.component.html',
  styleUrls: ['../entity.component.scss']
})
export class AssetsComponent extends EntityComponent<Asset> {

  columns = [
    {
      prop: "Name"
    }, {
      prop: "LastModified"
    }, {
      prop: "Options"
    }];

  constructor(activatedRoute:ActivatedRoute, mediaServiceFactory: MediaServiceFactory, accountService: AccountService) {
    super(activatedRoute, mediaServiceFactory, accountService);
  }

  queryEntities(): Observable<QueryResult<Asset>> {
    return this.mediaService.getAssets(this.query);
  }
}
