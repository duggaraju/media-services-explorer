import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MediaService } from '@azure/arm-mediaservices';

type Link = {
  name: string,
  link: string
};

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  links: Link[] = [
    {
      name: 'Assets',
      link: 'assets'
    },
    {
      name: 'Live Events',
      link: 'channels'
    },
    {
      name: 'Transforms',
      link: 'transforms'
    },
    {
      name: 'Streaming Endpoints',
      link: 'streamingendpoints'
    }
  ];

  selectedIndex = 3;

  @Input()
  account?: MediaService;

  constructor(private activatedRoute: ActivatedRoute) {
  }
}
