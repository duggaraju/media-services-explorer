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

  environments: number[] = Object.keys(MediaEnvironment).filter(x => !isNaN(Number(x))).map((v, i, a) => Number(v));

  @Input()
  account: Account = {} as Account;

  @Input()
  readOnly = true;

  @Input()
  newAccount = false;

  @Output()
  accountUpdated = new EventEmitter();

  @Output()
  accountDeleted = new EventEmitter();

  constructor(private router: Router, private accountService: AccountService) {
  }

  onClick(): void {
    const json = JSON.stringify(this.account);
    console.log(`JSON for account is ${json}`);
    this.router.navigate(['account', json]);
  }

  onDelete(): void {
    this.accountDeleted.emit(this.account);
  }

  onUpdate(): void {
    this.accountUpdated.emit(this.account);
  }

  onChange(event: Event): void {
    if (!this.readOnly && !this.account?.properties.apiEndpoints) {
      this.account.properties.apiEndpoints = [{}];
    }
  }
}
