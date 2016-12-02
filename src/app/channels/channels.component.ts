import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Jsonp } from '@angular/http';
import { MediaService } from "../media/media.service";
import { Channel } from "../media/channel";
import { Account } from "../account";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  private account: Account;
  private mediaService: MediaService;
  private channels: Channel[];
  
  constructor(private activatedRoute: ActivatedRoute, private http: Http, private jsonp:Jsonp) {
   }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe((params: Params) => {
      this.account = JSON.parse(params["account"]);
      this.mediaService = new MediaService(this.http, this.jsonp, this.account);
      this.mediaService.getChannels().subscribe(channels => this.channels = channels);
    });
    
  }

}
