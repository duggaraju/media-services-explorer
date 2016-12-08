import { Component, OnInit } from '@angular/core';
import { Account } from "../account";
import { MediaEnvironment } from "../mediaenvironment";

@Component({
  selector: 'accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[] = [];
  selectedAccount: Account = new Account();

  constructor() {
    var accounts = localStorage.getItem("accounts");
    if (accounts) {
      try {
        this.accounts = JSON.parse(accounts) as Account[];
      }
      catch(error) {
        console.log(`Invalid JSON saved so ignoring it. ${error}`);
      }
    }
    console.log(`Total accounts: ${this.accounts.length}`);
  }

  onSelect(account:Account):void {
    this.selectedAccount = account;
  }

  onUpdate(account:Account): void {
    console.log(`Updated account ${account.accountName} for environment:${account.environment}`);
    if (!this.accounts.find(element => account === element)) {
      this.accounts.push(account);
    }
    console.log(`Total accounts: ${this.accounts.length}`);
    localStorage.setItem("accounts", JSON.stringify(this.accounts));
  }

  ngOnInit() {
  }

}
