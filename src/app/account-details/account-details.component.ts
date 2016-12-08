import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Account } from "../account";
import { MediaEnvironment } from '../mediaenvironment';
import { Router } from "@angular/router";

@Component({
  selector: 'account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {

  @Input()
  account: Account;

  @Output()
  accountUpdated = new EventEmitter();

  constructor(private router:Router) { }

  onClick() {
    if (this.account.environment != MediaEnvironment.Custom) {
        Account.getSettingsForEnvironment(this.account);
    }
    this.router.navigate(["account", JSON.stringify(this.account)]);
  }

  onUpdate() {
    this.accountUpdated.emit(this.account);
  }
}
