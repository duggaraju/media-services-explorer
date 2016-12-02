import { Component, OnInit } from '@angular/core';
import { Account } from "../account";
import { MediaEnvironment } from "../mediaenvironment";

@Component({
  selector: 'accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[];
  selectedAccount: Account = new Account();

  constructor() {
    var accounts = localStorage.getItem("accounts");
    if (accounts) {
      this.accounts = JSON.parse(accounts) as Account[];
    }
  }

  onSelect(account:Account):void {
    this.selectedAccount = account;
  }

  onSave(): void {
    localStorage.setItem("accounts", JSON.stringify(this.accounts));
  }

  ngOnInit() {
  }

}
