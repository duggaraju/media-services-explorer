import { Component, Input } from '@angular/core';
import { Account } from '../account';
import { ActivatedRoute, Params } from '@angular/router';
import { MediaAccount } from 'app/media/mediaaccount';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  @Input()
  account?: MediaAccount;

  constructor(private activatedRoute: ActivatedRoute) {
  }
}
