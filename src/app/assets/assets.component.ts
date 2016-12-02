import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MediaService } from '../media/media.service';
import { Asset } from '../media/asset';
import { Account } from '../account';
import { Http, Jsonp } from '@angular/http';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

  account: Account;
  assets: Asset[];
  mediaService: MediaService;

  constructor(private activatedRoute:ActivatedRoute, private http: Http, private jsonp:Jsonp) {
  }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((params: Params) => {
      this.account = JSON.parse(params["account"]);
      this.mediaService = new MediaService(this.http, this.jsonp, this.account);
      this.mediaService.getAssets().subscribe(assets => this.assets = assets);
    });
  }
}
