import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdalService } from '../aad/adal.service';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.scss']
})
export class OAuthCallbackComponent implements OnInit {

  constructor(private router: Router, private adalService: AdalService) { }

  ngOnInit() {
    const user = this.adalService.getCachedUser();
    console.log(`in callback component with user ${user}`)
  }
}
