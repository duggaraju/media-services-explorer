import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AadService } from '../aad/aad.service';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.scss']
})
export class OAuthCallbackComponent implements OnInit {

  constructor(private router: Router, private aadService: AadService) { }

  ngOnInit(): void {
    const user = this.aadService.getCachedUser();
    console.log(`in callback component with user ${user}`);
  }
}
