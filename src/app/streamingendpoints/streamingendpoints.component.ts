import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Http, Jsonp } from '@angular/http';
import { MediaService } from "../media/media.service";
import { StreamingEndpoint } from "../media/streamingendpoint";
import { Account } from "../account";

@Component({
  selector: 'app-streamingendpoints',
  templateUrl: './streamingendpoints.component.html',
  styleUrls: ['./streamingendpoints.component.css']
})
export class StreamingendpointsComponent implements OnInit {

  private account: Account;
  private mediaService: MediaService;
  private origins: StreamingEndpoint[];
  
  constructor(private activatedRoute: ActivatedRoute, private http: Http, private jsonp:Jsonp) {
   }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe((params: Params) => {
      this.account = JSON.parse(params["account"]);
      this.mediaService = new MediaService(this.http, this.jsonp, this.account);
      this.mediaService.getStreamingEndpoints().subscribe(origins => this.origins = origins);
    });
    
  }

}
