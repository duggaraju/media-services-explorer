import { Component, Input } from '@angular/core';
import { Account } from "../account";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  
})
export class AccountComponent {

  account: Account;

  constructor(private activatedRoute:ActivatedRoute) {
  }
}
