import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Account } from '../account';
import { AccountType } from '../account.type';
import { MediaEnvironment } from '../mediaenvironment';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {

  // expose enums for use in template.
  public MediaEnvironment = MediaEnvironment;
  public AccountType = AccountType;

  environments: Number[] = Object.keys(MediaEnvironment).filter(x => !isNaN(Number(x))).map((v, i, a) => Number(v));

  @Input()
  account: Account;

  @Input()
  readOnly = true;

  @Input()
  newAccount = false;

  @Output()
  accountUpdated = new EventEmitter();

  @Output()
  accountDeleted = new EventEmitter();

  constructor(private router: Router, private accountService:AccountService) {
  }

  onClick() {
    const json = JSON.stringify(this.account);
    console.log(`JSON for account is ${json}`);
    this.router.navigate(['account', json]);
  }

  onDelete() {
    this.accountDeleted.emit(this.account);
  }

  onUpdate() {
    this.accountUpdated.emit(this.account);
  }

  onChange(event: Event) {
    if (!this.readOnly && !this.account.properties['apiEndpoints']) {
      this.account.properties['apiEndpoints'] = [{}];
    }
  }
}
