import { Component, Input, OnInit } from '@angular/core';
import { Account } from "../account";
import { Router } from "@angular/router";

@Component({
  selector: 'account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  @Input()
  account: Account;

  constructor(private router:Router) { }

  onClick() {
    this.router.navigate(["account", JSON.stringify(this.account)]);
  }

  ngOnInit() {
  }
}
