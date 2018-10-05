import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Account, AcsAccountProperties } from './account';
import { AccountType } from './account.type';
import { MediaAccount } from './media/mediaaccount';


@Injectable()
export class AccountService {

  private accounts: Account[];

  constructor(private http: Http) { }

  public getAccounts(): Account[] {
    if (!this.accounts) {
      this.loadAccounts();
    }
    return this.accounts;
  }

  public deleteAccount(account: Account): void {
    console.log(`Looking to delete account name:${account.name} of type:${AccountType[account.accountType]}`);
    const index = this.accounts.indexOf(account);
    if (index !== -1) {
      console.log(`Deleting account name:${account.name} of type:${AccountType[account.accountType]}`);
      this.accounts.splice(index, 1);
      this.saveAccounts();
    }
  }

  public updateAccount(account: Account): boolean {
    let added = false;
    const actualAccount = this.accounts.find(element => element === account);
    if (actualAccount) {
      console.log(`Updating account:${account.name} type:${AccountType[account.accountType]}`)
    } else {
      console.log(`Adding account:${name} type:${AccountType[account.accountType]}`)
      this.accounts.push(account);
      added = true;
    }
    this.saveAccounts();
    return added;
  }

  public getMediaAccount(account: Account): MediaAccount {
    switch (account.accountType) {
        case AccountType.AcsAccount:
        case AccountType.ArmAccount:
            return null;
        case AccountType.AadAccount:
          throw new Error('Not yet supported!');
    }
  }

  private loadAccounts(): void {
    const accounts = localStorage.getItem('accounts');
    console.log(`found accounts in local storage ${accounts}`);
    if (accounts) {
      try {
        this.accounts = JSON.parse(accounts) as Account[];
      } catch (error) {
        console.log(`Invalid JSON saved so ignoring it. ${error}`);
      }
    } else {
      this.accounts = [];
    }
    console.log(`Total accounts: ${this.accounts.length}`);
  }

  private saveAccounts(): void {
    console.log(`Saving Accounts.... Total: ${this.accounts.length}`);
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }
}
